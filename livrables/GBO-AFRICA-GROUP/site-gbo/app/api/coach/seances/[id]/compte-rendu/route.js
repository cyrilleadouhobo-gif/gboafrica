import { NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/db.js';
import { getCurrentCoach } from '../../../../../../lib/coachAuth.js';
import { isSameOrigin } from '../../../../../../lib/security.js';
import { logAudit } from '../../../../../../lib/auth.js';
import { compteRenduSchema, parseOrError } from '../../../../../../lib/validation.js';

// RG05 — un compte rendu est validé dès sa soumission par le coach (pas d'étape de
// validation séparée, décision prise le 12/11/2026) : c'est cette soumission elle-même
// qui décompte la séance de l'abonnement. Il n'existe qu'un seul compte rendu par séance
// (contrainte @unique sur CompteRendu.seanceId) — une fois soumis, il n'est plus modifiable
// depuis cette route.
export async function POST(request, { params }) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const coach = await getCurrentCoach();
  if (!coach) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) return NextResponse.json({ error: 'Identifiant invalide.' }, { status: 400 });

  const body = await request.json().catch(() => null);
  const parsed = parseOrError(compteRenduSchema, body || {});
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const seance = await prisma.seance.findUnique({ where: { id }, include: { compteRendu: true } });
  if (!seance || seance.coachAccountId !== coach.id) {
    return NextResponse.json({ error: 'Séance introuvable.' }, { status: 404 });
  }
  if (seance.statut === 'ANNULEE') {
    return NextResponse.json({ error: 'Cette séance a été annulée.' }, { status: 409 });
  }
  if (seance.compteRendu) {
    return NextResponse.json({ error: 'Un compte rendu existe déjà pour cette séance.' }, { status: 409 });
  }
  if (new Date(seance.datePrevue) > new Date()) {
    return NextResponse.json({ error: "Impossible de documenter une séance qui n'a pas encore eu lieu." }, { status: 409 });
  }

  const now = new Date();

  const compteRendu = await prisma.$transaction(async (tx) => {
    const created = await tx.compteRendu.create({
      data: { seanceId: id, contenu: parsed.data.contenu, valide: true, valideLe: now },
    });

    await tx.seance.update({ where: { id }, data: { statut: 'REALISEE' } });

    const abonnement = await tx.abonnement.update({
      where: { id: seance.abonnementId },
      data: { seancesRestantes: { decrement: 1 } },
    });
    if (abonnement.seancesRestantes <= 0) {
      await tx.abonnement.update({ where: { id: abonnement.id }, data: { statut: 'EPUISE' } });
    }

    await tx.seanceHistorique.create({
      data: { seanceId: id, champ: 'statut', ancienneValeur: 'PLANIFIEE', nouvelleValeur: 'REALISEE', modifiePar: `coach:${coach.id}` },
    });

    return created;
  });

  await logAudit({ adminUserId: null, action: 'compte_rendu_valide', targetType: 'CompteRendu', targetId: compteRendu.id, detail: { seanceId: id, coachAccountId: coach.id } });

  return NextResponse.json({ compteRendu });
}
