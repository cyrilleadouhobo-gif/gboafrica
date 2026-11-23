import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db.js';
import { coachChangePasswordSchema, parseOrError } from '../../../../lib/validation.js';
import { getClientIp, isSameOrigin } from '../../../../lib/security.js';
import { verifyPassword, hashPassword, logAudit } from '../../../../lib/auth.js';
import { getCurrentCoach, createCoachSession, coachSessionCookieOptions, COACH_SESSION_COOKIE } from '../../../../lib/coachAuth.js';

export async function POST(request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const coach = await getCurrentCoach();
  if (!coach) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = parseOrError(coachChangePasswordSchema, body || {});
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const valid = await verifyPassword(parsed.data.currentPassword, coach.passwordHash);
  if (!valid) return NextResponse.json({ error: 'Mot de passe actuel incorrect.' }, { status: 401 });

  const passwordHash = await hashPassword(parsed.data.newPassword);
  await prisma.coachAccount.update({ where: { id: coach.id }, data: { passwordHash, mustChangePassword: false } });

  // Révoque toute autre session active sur ce compte, voir app/api/client/change-password/route.js.
  await prisma.coachSession.deleteMany({ where: { coachAccountId: coach.id } });
  const { cookieValue, expiresAt } = await createCoachSession(coach.id, { userAgent: request.headers.get('user-agent'), ip: getClientIp(request) });

  await logAudit({ adminUserId: null, action: 'coach_password_changed', targetType: 'CoachAccount', targetId: coach.id });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COACH_SESSION_COOKIE, cookieValue, coachSessionCookieOptions(expiresAt));
  return response;
}
