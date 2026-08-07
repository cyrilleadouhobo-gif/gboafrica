import { NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/db.js';
import { getCurrentAdmin, logAudit } from '../../../../../../lib/auth.js';
import { isSameOrigin } from '../../../../../../lib/security.js';
import { assignCoachSchema, parseOrError } from '../../../../../../lib/validation.js';

export async function PATCH(request, { params }) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const id = Number(params.id);
  if (!Number.isInteger(id)) return NextResponse.json({ error: 'Identifiant invalide.' }, { status: 400 });

  const body = await request.json().catch(() => null);
  const parsed = parseOrError(assignCoachSchema, body || {});
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const [lead, coach] = await Promise.all([
    prisma.lead.findUnique({ where: { id } }),
    prisma.coach.findUnique({ where: { id: parsed.data.coachId } }),
  ]);
  if (!lead) return NextResponse.json({ error: 'Prospect introuvable.' }, { status: 404 });
  if (!coach) return NextResponse.json({ error: 'Coach introuvable.' }, { status: 404 });

  const bumpStatus = ['NOUVEAU', 'A_CONTACTER', 'QUALIFIE'].includes(lead.status) ? 'COACH_ATTRIBUE' : lead.status;

  const updated = await prisma.lead.update({
    where: { id },
    data: { coachId: coach.id, status: bumpStatus },
    include: { coach: { select: { name: true } } },
  });
  await logAudit({ adminUserId: admin.id, action: 'lead_coach_assigned', targetType: 'Lead', targetId: id, detail: { coach: coach.name } });

  return NextResponse.json({ lead: updated });
}
