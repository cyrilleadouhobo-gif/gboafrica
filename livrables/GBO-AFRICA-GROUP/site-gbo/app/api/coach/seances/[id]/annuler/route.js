import { NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/db.js';
import { getCurrentCoach } from '../../../../../../lib/coachAuth.js';
import { isSameOrigin } from '../../../../../../lib/security.js';
import { logAudit } from '../../../../../../lib/auth.js';
import { annulerSeanceSchema, parseOrError } from '../../../../../../lib/validation.js';
import { annulerParCoach } from '../../../../../../lib/seanceAnnulation.js';

export async function POST(request, { params }) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const coach = await getCurrentCoach();
  if (!coach) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) return NextResponse.json({ error: 'Identifiant invalide.' }, { status: 400 });

  const body = await request.json().catch(() => null);
  const parsed = parseOrError(annulerSeanceSchema, body || {});
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const seance = await prisma.seance.findUnique({ where: { id } });
  if (!seance || seance.coachAccountId !== coach.id) {
    return NextResponse.json({ error: 'Séance introuvable.' }, { status: 404 });
  }
  if (seance.statut !== 'PLANIFIEE') {
    return NextResponse.json({ error: 'Cette séance ne peut plus être annulée.' }, { status: 409 });
  }

  await prisma.$transaction((tx) => annulerParCoach(tx, seance, { motif: parsed.data.motif, modifiePar: `coach:${coach.id}` }));

  await logAudit({ adminUserId: null, action: 'seance_annulee', targetType: 'Seance', targetId: id, detail: { par: 'COACH' } });

  return NextResponse.json({ ok: true });
}
