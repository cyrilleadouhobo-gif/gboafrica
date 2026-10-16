import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db.js';
import { memberRegisterSchema, parseOrError } from '../../../../../lib/validation.js';
import { getClientIp, isSameOrigin, formRateLimit, honeypotTripped, GLOBAL_LOGIN_LIMIT } from '../../../../../lib/security.js';
import { hashPassword, createMemberSession, memberSessionCookieOptions, MEMBER_SESSION_COOKIE } from '../../../../../lib/memberAuth.js';
import { logAudit, hashIp } from '../../../../../lib/auth.js';

export async function POST(request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const ip = getClientIp(request);
  const { allowed } = await formRateLimit('member_register', ip, { max: 5, windowMs: 60 * 60 * 1000 }, GLOBAL_LOGIN_LIMIT);
  if (!allowed) return NextResponse.json({ error: 'Trop de tentatives. Réessayez plus tard.' }, { status: 429 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 });
  if (honeypotTripped(body.website)) return NextResponse.json({ ok: true });

  const parsed = parseOrError(memberRegisterSchema, body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const d = parsed.data;

  const existing = await prisma.member.findUnique({ where: { email: d.email } });
  if (existing) return NextResponse.json({ error: 'Un compte existe déjà avec cet e-mail.' }, { status: 409 });

  const passwordHash = await hashPassword(d.password);
  const member = await prisma.member.create({
    data: {
      email: d.email,
      passwordHash,
      firstName: d.prenom,
      lastName: d.nom,
      phone: d.tel || null,
      consentAt: new Date(),
      subscription: { create: { plan: 'GRATUIT', status: 'ACTIVE' } },
    },
  });

  const { cookieValue, expiresAt } = await createMemberSession(member.id, { userAgent: request.headers.get('user-agent'), ip });
  await logAudit({ adminUserId: null, action: 'member_register', targetType: 'Member', targetId: member.id, detail: { ipHash: hashIp(ip) } });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(MEMBER_SESSION_COOKIE, cookieValue, memberSessionCookieOptions(expiresAt));
  return response;
}
