import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db.js';
import { coachLoginSchema, parseOrError } from '../../../../../lib/validation.js';
import { getClientIp, isSameOrigin, formRateLimit, GLOBAL_LOGIN_LIMIT, isAccountLocked, recordFailedLogin } from '../../../../../lib/security.js';
import { verifyPassword, DUMMY_PASSWORD_HASH, hashIp, logAudit } from '../../../../../lib/auth.js';
import { createCoachSession, coachSessionCookieOptions, COACH_SESSION_COOKIE } from '../../../../../lib/coachAuth.js';

export async function POST(request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const ip = getClientIp(request);
  const { allowed } = await formRateLimit('coach-login', ip, { max: 8, windowMs: 15 * 60 * 1000 }, GLOBAL_LOGIN_LIMIT);
  if (!allowed) {
    return NextResponse.json({ error: 'Trop de tentatives. Réessayez plus tard.' }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 });

  const parsed = parseOrError(coachLoginSchema, body);
  if (!parsed.ok) return NextResponse.json({ error: 'Identifiants incorrects.' }, { status: 401 });
  const { email, password } = parsed.data;

  if (await isAccountLocked(email)) {
    return NextResponse.json({ error: 'Trop de tentatives. Réessayez plus tard.' }, { status: 429 });
  }

  const coach = await prisma.coachAccount.findUnique({ where: { email } });
  const valid = await verifyPassword(password, coach ? coach.passwordHash : DUMMY_PASSWORD_HASH);

  if (!coach || !valid || !coach.actif) {
    await recordFailedLogin(email);
    await logAudit({ adminUserId: null, action: 'coach_login_failed', targetType: 'CoachAccount', targetId: email, detail: { ipHash: hashIp(ip) } });
    return NextResponse.json({ error: 'Email ou mot de passe incorrect.' }, { status: 401 });
  }

  const { cookieValue, expiresAt } = await createCoachSession(coach.id, { userAgent: request.headers.get('user-agent'), ip });
  await prisma.coachAccount.update({ where: { id: coach.id }, data: { lastLoginAt: new Date() } });
  await logAudit({ adminUserId: null, action: 'coach_login_success', targetType: 'CoachAccount', targetId: coach.id, detail: { ipHash: hashIp(ip) } });

  const response = NextResponse.json({ ok: true, mustChangePassword: coach.mustChangePassword });
  response.cookies.set(COACH_SESSION_COOKIE, cookieValue, coachSessionCookieOptions(expiresAt));
  return response;
}
