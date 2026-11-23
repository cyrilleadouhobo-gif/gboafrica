import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db.js';
import { resetPasswordSchema, parseOrError } from '../../../../lib/validation.js';
import { getClientIp, isSameOrigin, formRateLimit } from '../../../../lib/security.js';
import { consumePasswordResetToken, hashPassword, logAudit } from '../../../../lib/auth.js';

export async function POST(request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const ip = getClientIp(request);
  const { allowed } = await formRateLimit('reset-password', ip, { max: 10, windowMs: 10 * 60 * 1000 });
  if (!allowed) return NextResponse.json({ error: 'Trop de tentatives. Réessayez plus tard.' }, { status: 429 });

  const body = await request.json().catch(() => null);
  const parsed = parseOrError(resetPasswordSchema, body || {});
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const admin = await consumePasswordResetToken(parsed.data.token);
  if (!admin) return NextResponse.json({ error: 'Ce lien est invalide ou a expiré. Refaites une demande.' }, { status: 400 });

  const passwordHash = await hashPassword(parsed.data.newPassword);
  await prisma.adminUser.update({ where: { id: admin.id }, data: { passwordHash } });

  // Révoque toute session active sur ce compte, voir app/api/client/change-password/route.js
  // pour le même raisonnement — ici personne n'est connecté pour en réémettre une tout de
  // suite, l'utilisateur se reconnecte normalement avec son nouveau mot de passe.
  await prisma.session.deleteMany({ where: { adminUserId: admin.id } });

  await logAudit({ adminUserId: admin.id, action: 'password_reset_completed', targetType: 'AdminUser', targetId: admin.id });

  return NextResponse.json({ ok: true });
}
