import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db.js';
import { resetPasswordSchema, parseOrError } from '../../../../../lib/validation.js';
import { getClientIp, isSameOrigin, formRateLimit } from '../../../../../lib/security.js';
import { consumeCoachPasswordResetToken } from '../../../../../lib/coachAuth.js';
import { hashPassword, logAudit } from '../../../../../lib/auth.js';

export async function POST(request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const ip = getClientIp(request);
  const { allowed } = await formRateLimit('coach-reset-password', ip, { max: 10, windowMs: 10 * 60 * 1000 });
  if (!allowed) return NextResponse.json({ error: 'Trop de tentatives. Réessayez plus tard.' }, { status: 429 });

  const body = await request.json().catch(() => null);
  const parsed = parseOrError(resetPasswordSchema, body || {});
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const coach = await consumeCoachPasswordResetToken(parsed.data.token);
  if (!coach) return NextResponse.json({ error: 'Ce lien est invalide ou a expiré. Refaites une demande.' }, { status: 400 });

  const passwordHash = await hashPassword(parsed.data.newPassword);
  await prisma.coachAccount.update({ where: { id: coach.id }, data: { passwordHash, mustChangePassword: false } });

  // Révoque toute session active sur ce compte, voir app/api/client/change-password/route.js.
  await prisma.coachSession.deleteMany({ where: { coachAccountId: coach.id } });

  await logAudit({ adminUserId: null, action: 'coach_password_reset_completed', targetType: 'CoachAccount', targetId: coach.id });

  return NextResponse.json({ ok: true });
}
