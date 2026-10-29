import { NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/db.js';
import { getCurrentStaffAdmin, logAudit } from '../../../../../../lib/auth.js';
import { isSameOrigin } from '../../../../../../lib/security.js';

// Pose le point de départ du délai de conservation "3 ans après la fin de la relation"
// (data/legal.js) pour un client. Sans cette date, lib/retention.js ne peut jamais purger
// ses données — un client reste donc actif indéfiniment jusqu'à cette action explicite.
export async function POST(request, { params }) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const admin = await getCurrentStaffAdmin();
  if (!admin) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) return NextResponse.json({ error: 'Identifiant invalide.' }, { status: 400 });

  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) return NextResponse.json({ error: 'Prospect introuvable.' }, { status: 404 });
  if (lead.status !== 'CLIENT') return NextResponse.json({ error: "Ce prospect n'est pas (encore) client." }, { status: 400 });
  if (lead.relationEndedAt) return NextResponse.json({ error: 'Fin de relation déjà enregistrée.' }, { status: 409 });

  const updated = await prisma.lead.update({ where: { id }, data: { relationEndedAt: new Date() } });
  await logAudit({ adminUserId: admin.id, action: 'lead_relation_ended', targetType: 'Lead', targetId: id });

  return NextResponse.json({ lead: updated });
}
