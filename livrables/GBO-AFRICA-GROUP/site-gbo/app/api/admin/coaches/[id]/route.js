import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db.js';
import { getCurrentStaffAdmin, logAudit } from '../../../../../lib/auth.js';
import { isSameOrigin } from '../../../../../lib/security.js';
import { coachContactSchema, parseOrError } from '../../../../../lib/validation.js';

// RG06 — téléphone et photo affichés au client quand ce coach lui est attribué suite à
// l'annulation d'un autre coach (lib/seanceAnnulation.js).
export async function PATCH(request, { params }) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const admin = await getCurrentStaffAdmin();
  if (!admin) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) return NextResponse.json({ error: 'Identifiant invalide.' }, { status: 400 });

  const body = await request.json().catch(() => null);
  const parsed = parseOrError(coachContactSchema, body || {});
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const coach = await prisma.coach.findUnique({ where: { id } });
  if (!coach) return NextResponse.json({ error: 'Coach introuvable.' }, { status: 404 });

  const updated = await prisma.coach.update({
    where: { id },
    data: { phone: parsed.data.phone || null, photoUrl: parsed.data.photoUrl || null },
  });

  await logAudit({ adminUserId: admin.id, action: 'coach_contact_modifie', targetType: 'Coach', targetId: id, detail: { phone: !!parsed.data.phone, photoUrl: !!parsed.data.photoUrl } });

  return NextResponse.json({ coach: updated });
}
