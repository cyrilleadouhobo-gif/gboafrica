import { NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/db.js';
import { getCurrentStaffAdmin } from '../../../../../../lib/auth.js';
import { candidatsDisponibles, propositionActive } from '../../../../../../lib/seanceReattribution.js';

export async function GET(request, { params }) {
  const admin = await getCurrentStaffAdmin();
  if (!admin) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) return NextResponse.json({ error: 'Identifiant invalide.' }, { status: 400 });

  const seance = await prisma.seance.findUnique({ where: { id } });
  if (!seance) return NextResponse.json({ error: 'Séance introuvable.' }, { status: 404 });

  const [candidats, enCours] = await Promise.all([
    seance.statut === 'EN_REATTRIBUTION' ? candidatsDisponibles(prisma, seance) : Promise.resolve([]),
    propositionActive(prisma, id),
  ]);

  let propositionEnCours = null;
  if (enCours) {
    const coachAccount = await prisma.coachAccount.findUnique({ where: { id: enCours.coachAccountId }, include: { coach: true } });
    propositionEnCours = { id: enCours.id, statut: enCours.statut, coachNom: coachAccount.coach.name };
  }

  return NextResponse.json({
    coachs: candidats.map((c) => ({ id: c.id, nom: c.coach.name, spec: c.coach.spec })),
    propositionEnCours,
  });
}
