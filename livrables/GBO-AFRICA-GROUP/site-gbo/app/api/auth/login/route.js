import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db.js';
import { loginSchema, parseOrError } from '../../../../lib/validation.js';
import { getClientIp, isSameOrigin, formRateLimit, GLOBAL_LOGIN_LIMIT } from '../../../../lib/security.js';
import { verifyPassword, createSession, sessionCookieOptions, logAudit, SESSION_COOKIE, DUMMY_PASSWORD_HASH } from '../../../../lib/auth.js';

export async function POST(request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const ip = getClientIp(request);
  // Deliberately strict: this is the door to visitor data. 8 attempts / 15 min / IP.
  const { allowed } = await formRateLimit('login', ip, { max: 8, windowMs: 15 * 60 * 1000 }, GLOBAL_LOGIN_LIMIT);
  if (!allowed) {
    return NextResponse.json({ error: 'Trop de tentatives. Réessayez plus tard.' }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 });

  const parsed = parseOrError(loginSchema, body);
  if (!parsed.ok) return NextResponse.json({ error: 'Identifiants incorrects.' }, { status: 401 });
  const { email, password } = parsed.data;

  const admin = await prisma.adminUser.findUnique({ where: { email } });
  const valid = await verifyPassword(password, admin ? admin.passwordHash : DUMMY_PASSWORD_HASH);

  if (!admin || !valid) {
    await logAudit({ adminUserId: null, action: 'login_failed', targetType: 'AdminUser', targetId: email, detail: { ip } });
    // Same generic message whether the account exists or not — don't leak which part was wrong.
    return NextResponse.json({ error: 'Identifiants incorrects.' }, { status: 401 });
  }

  const { cookieValue, expiresAt } = await createSession(admin.id, { userAgent: request.headers.get('user-agent'), ip });
  await prisma.adminUser.update({ where: { id: admin.id }, data: { lastLoginAt: new Date() } });
  await logAudit({ adminUserId: admin.id, action: 'login_success', targetType: 'AdminUser', targetId: admin.id, detail: { ip } });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, cookieValue, sessionCookieOptions(expiresAt));
  return response;
}
