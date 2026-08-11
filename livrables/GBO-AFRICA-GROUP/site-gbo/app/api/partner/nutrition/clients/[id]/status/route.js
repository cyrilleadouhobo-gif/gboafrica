import { NextResponse } from 'next/server';
import { prisma } from '../../../../../../../lib/db.js';
import { getCurrentNutritionPartner, logAudit } from '../../../../../../../lib/auth.js';
import { isSameOrigin } from '../../../../../../../lib/security.js';
import { nutritionStatusSchema, parseOrError } from '../../../../../../../lib/validation.js';

export async function PATCH(request, { params }) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const partner = await getCurrentNutritionPartner();
  if (!partner) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) return NextResponse.json({ error: 'Identifiant invalide.' }, { status: 400 });

  const body = await request.json().catch(() => null);
  const parsed = parseOrError(nutritionStatusSchema, body || {});
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const followUp = await prisma.nutritionFollowUp.findUnique({ where: { id } });
  if (!followUp) return NextResponse.json({ error: 'Client introuvable.' }, { status: 404 });

  const updated = await prisma.nutritionFollowUp.update({
    where: { id },
    data: { status: parsed.data.status, notes: parsed.data.notes || null },
  });
  await logAudit({
    adminUserId: partner.id,
    action: 'nutrition_status_change',
    targetType: 'NutritionFollowUp',
    targetId: id,
    detail: { from: followUp.status, to: parsed.data.status },
  });

  return NextResponse.json({ followUp: updated });
}
