import { NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/db.js';
import { getCurrentStaffAdmin, logAudit } from '../../../../../../lib/auth.js';
import { isSameOrigin } from '../../../../../../lib/security.js';
import { reviewStatusSchema, parseOrError } from '../../../../../../lib/validation.js';

export async function PATCH(request, { params }) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const admin = await getCurrentStaffAdmin();
  if (!admin) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) return NextResponse.json({ error: 'Identifiant invalide.' }, { status: 400 });

  const body = await request.json().catch(() => null);
  const parsed = parseOrError(reviewStatusSchema, body || {});
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const review = await prisma.review.findUnique({ where: { id } });
  if (!review) return NextResponse.json({ error: 'Avis introuvable.' }, { status: 404 });

  const updated = await prisma.review.update({ where: { id }, data: { status: parsed.data.status } });
  await logAudit({ adminUserId: admin.id, action: 'review_status_change', targetType: 'Review', targetId: id, detail: { from: review.status, to: parsed.data.status } });

  return NextResponse.json({ review: updated });
}
