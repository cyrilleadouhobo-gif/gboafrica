import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db.js';
import { resetPasswordSchema, parseOrError } from '../../../../../lib/validation.js';
import { getClientIp, isSameOrigin, formRateLimit } from '../../../../../lib/security.js';
import { consumeClientPasswordResetToken } from '../../../../../lib/clientAuth.js';
import { hashPassword, logAudit } from '../../../../../lib/auth.js';

export async function POST(request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const ip = getClientIp(request);
  const { allowed } = await formRateLimit('client-reset-password', ip, { max: 10, windowMs: 10 * 60 * 1000 });
  if (!allowed) return NextResponse.json({ error: 'Trop de tentatives. Réessayez plus tard.' }, { status: 429 });

  const body = await request.json().catch(() => null);
  const parsed = parseOrError(resetPasswordSchema, body || {});
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const client = await consumeClientPasswordResetToken(parsed.data.token);
  if (!client) return NextResponse.json({ error: 'Ce lien est invalide ou a expiré. Refaites une demande.' }, { status: 400 });

  const passwordHash = await hashPassword(parsed.data.newPassword);
  // mustChangePassword à false : ce nouveau mot de passe est déjà celui que le client a
  // choisi lui-même, pas un mot de passe temporaire à remplacer.
  await prisma.clientAccount.update({ where: { id: client.id }, data: { passwordHash, mustChangePassword: false } });

  // Révoque toute session active sur ce compte, voir app/api/client/change-password/route.js.
  await prisma.clientSession.deleteMany({ where: { clientAccountId: client.id } });

  await logAudit({ adminUserId: null, action: 'client_password_reset_completed', targetType: 'ClientAccount', targetId: client.id });

  return NextResponse.json({ ok: true });
}
