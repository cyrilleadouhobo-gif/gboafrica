import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db.js';
import { partnerChangeEmailSchema, parseOrError } from '../../../../../lib/validation.js';
import { isSameOrigin } from '../../../../../lib/security.js';
import { verifyPassword, getCurrentNutritionPartner, logAudit } from '../../../../../lib/auth.js';

// Le partenaire nutrition est seul à connaître et pouvoir changer son identifiant de
// connexion (décision de Cyrille du 23/11/2026) — voir change-password/route.js pour le
// même raisonnement. L'e-mail de connexion ne change pas la session en cours (liée à
// l'id du compte, pas à son e-mail), donc pas de révocation de session ici.
export async function POST(request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const partner = await getCurrentNutritionPartner();
  if (!partner) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = parseOrError(partnerChangeEmailSchema, body || {});
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const valid = await verifyPassword(parsed.data.currentPassword, partner.passwordHash);
  if (!valid) return NextResponse.json({ error: 'Mot de passe actuel incorrect.' }, { status: 401 });

  if (parsed.data.newEmail === partner.email) {
    return NextResponse.json({ error: 'Cette adresse est déjà votre identifiant actuel.' }, { status: 400 });
  }

  const existing = await prisma.adminUser.findUnique({ where: { email: parsed.data.newEmail } });
  if (existing) return NextResponse.json({ error: 'Cette adresse est déjà utilisée.' }, { status: 409 });

  await prisma.adminUser.update({ where: { id: partner.id }, data: { email: parsed.data.newEmail } });
  await logAudit({ adminUserId: partner.id, action: 'partner_email_changed', targetType: 'AdminUser', targetId: partner.id });

  return NextResponse.json({ ok: true, email: parsed.data.newEmail });
}
