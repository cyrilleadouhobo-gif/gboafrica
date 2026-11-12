import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db.js';
import { clientLoginSchema, parseOrError } from '../../../../../lib/validation.js';
import { getClientIp, isSameOrigin, formRateLimit, GLOBAL_LOGIN_LIMIT, isAccountLocked, recordFailedLogin } from '../../../../../lib/security.js';
import { verifyPassword, DUMMY_PASSWORD_HASH, hashIp, logAudit } from '../../../../../lib/auth.js';
import { createClientSession, clientSessionCookieOptions, CLIENT_SESSION_COOKIE } from '../../../../../lib/clientAuth.js';

export async function POST(request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const ip = getClientIp(request);
  const { allowed } = await formRateLimit('client-login', ip, { max: 8, windowMs: 15 * 60 * 1000 }, GLOBAL_LOGIN_LIMIT);
  if (!allowed) {
    return NextResponse.json({ error: 'Trop de tentatives. Réessayez plus tard.' }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 });

  const parsed = parseOrError(clientLoginSchema, body);
  if (!parsed.ok) return NextResponse.json({ error: 'Identifiants incorrects.' }, { status: 401 });
  const { email, password } = parsed.data;

  if (await isAccountLocked(email)) {
    return NextResponse.json({ error: 'Trop de tentatives. Réessayez plus tard.' }, { status: 429 });
  }

  const client = await prisma.clientAccount.findUnique({ where: { email } });
  const valid = await verifyPassword(password, client ? client.passwordHash : DUMMY_PASSWORD_HASH);

  if (!client || !valid || !client.actif) {
    await recordFailedLogin(email);
    await logAudit({ adminUserId: null, action: 'client_login_failed', targetType: 'ClientAccount', targetId: email, detail: { ipHash: hashIp(ip) } });
    return NextResponse.json({ error: 'Email ou mot de passe incorrect.' }, { status: 401 });
  }

  const { cookieValue, expiresAt } = await createClientSession(client.id, { userAgent: request.headers.get('user-agent'), ip });
  await prisma.clientAccount.update({ where: { id: client.id }, data: { lastLoginAt: new Date() } });
  await logAudit({ adminUserId: null, action: 'client_login_success', targetType: 'ClientAccount', targetId: client.id, detail: { ipHash: hashIp(ip) } });

  const response = NextResponse.json({ ok: true, mustChangePassword: client.mustChangePassword });
  response.cookies.set(CLIENT_SESSION_COOKIE, cookieValue, clientSessionCookieOptions(expiresAt));
  return response;
}
