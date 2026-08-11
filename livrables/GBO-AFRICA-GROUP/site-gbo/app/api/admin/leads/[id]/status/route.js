import { NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/db.js';
import { getCurrentStaffAdmin, logAudit } from '../../../../../../lib/auth.js';
import { isSameOrigin } from '../../../../../../lib/security.js';
import { statusUpdateSchema, parseOrError } from '../../../../../../lib/validation.js';
import { LEAD_STATUSES } from '../../../../../../lib/constants.js';

export async function PATCH(request, { params }) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const admin = await getCurrentStaffAdmin();
  if (!admin) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) return NextResponse.json({ error: 'Identifiant invalide.' }, { status: 400 });

  const body = await request.json().catch(() => null);
  const parsed = parseOrError(statusUpdateSchema, body || {});
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) return NextResponse.json({ error: 'Prospect introuvable.' }, { status: 404 });

  const currentIndex = LEAD_STATUSES.indexOf(lead.status);
  const nextIndex = Math.max(0, Math.min(LEAD_STATUSES.length - 1, currentIndex + parsed.data.direction));
  const nextStatus = LEAD_STATUSES[nextIndex];

  const updated = await prisma.lead.update({ where: { id }, data: { status: nextStatus } });
  await logAudit({ adminUserId: admin.id, action: 'lead_status_change', targetType: 'Lead', targetId: id, detail: { from: lead.status, to: nextStatus } });

  return NextResponse.json({ lead: updated });
}
