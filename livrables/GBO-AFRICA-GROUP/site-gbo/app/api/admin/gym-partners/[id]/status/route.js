import { NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/db.js';
import { getCurrentStaffAdmin, logAudit } from '../../../../../../lib/auth.js';
import { isSameOrigin } from '../../../../../../lib/security.js';
import { gymPartnerStatusSchema, parseOrError } from '../../../../../../lib/validation.js';
import { GYM_PARTNER_STATUSES } from '../../../../../../lib/constants.js';

export async function PATCH(request, { params }) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const admin = await getCurrentStaffAdmin();
  if (!admin) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) return NextResponse.json({ error: 'Identifiant invalide.' }, { status: 400 });

  const body = await request.json().catch(() => null);
  const parsed = parseOrError(gymPartnerStatusSchema, body || {});
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const gymPartner = await prisma.gymPartner.findUnique({ where: { id } });
  if (!gymPartner) return NextResponse.json({ error: 'Salle partenaire introuvable.' }, { status: 404 });

  const currentIndex = GYM_PARTNER_STATUSES.indexOf(gymPartner.status);
  const nextIndex = Math.max(0, Math.min(GYM_PARTNER_STATUSES.length - 1, currentIndex + parsed.data.direction));
  const nextStatus = GYM_PARTNER_STATUSES[nextIndex];

  const updated = await prisma.gymPartner.update({ where: { id }, data: { status: nextStatus } });
  await logAudit({ adminUserId: admin.id, action: 'gym_partner_status_change', targetType: 'GymPartner', targetId: id, detail: { from: gymPartner.status, to: nextStatus } });

  return NextResponse.json({ gymPartner: updated });
}
