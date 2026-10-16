import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db.js';
import { memberLoginSchema, parseOrError } from '../../../../../lib/validation.js';
import { getClientIp, isSameOrigin, formRateLimit, GLOBAL_LOGIN_LIMIT } from '../../../../../lib/security.js';
import {
  verifyPassword,
  createMemberSession,
  memberSessionCookieOptions,
  MEMBER_SESSION_COOKIE,
  MEMBER_DUMMY_PASSWORD_HASH,
} from '../../../../../lib/memberAuth.js';
import { logAudit, hashIp } from '../../../../../lib/auth.js';

export async function POST(request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const ip = getClientIp(request);
  const { allowed } = await formRateLimit('member_login', ip, { max: 8, windowMs: 15 * 60 * 1000 }, GLOBAL_LOGIN_LIMIT);
  if (!allowed) return NextResponse.json({ error: 'Trop de tentatives. Réessayez plus tard.' }, { status: 429 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 });

  const parsed = parseOrError(memberLoginSchema, body);
  if (!parsed.ok) return NextResponse.json({ error: 'Identifiants incorrects.' }, { status: 401 });
  const { email, password } = parsed.data;

  const member = await prisma.member.findUnique({ where: { email } });
  const valid = await verifyPassword(password, member ? member.passwordHash : MEMBER_DUMMY_PASSWORD_HASH);

  if (!member || !valid || member.status !== 'ACTIVE') {
    await logAudit({ adminUserId: null, action: 'member_login_failed', targetType: 'Member', targetId: email, detail: { ipHash: hashIp(ip) } });
    return NextResponse.json({ error: 'Identifiants incorrects.' }, { status: 401 });
  }

  const { cookieValue, expiresAt } = await createMemberSession(member.id, { userAgent: request.headers.get('user-agent'), ip });
  await prisma.member.update({ where: { id: member.id }, data: { lastLoginAt: new Date() } });
  await logAudit({ adminUserId: null, action: 'member_login_success', targetType: 'Member', targetId: member.id, detail: { ipHash: hashIp(ip) } });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(MEMBER_SESSION_COOKIE, cookieValue, memberSessionCookieOptions(expiresAt));
  return response;
}
