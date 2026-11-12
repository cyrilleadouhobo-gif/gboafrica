import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db.js';
import { getCurrentCoach } from '../../../../lib/coachAuth.js';
import { isSameOrigin } from '../../../../lib/security.js';
import { createSeanceSchema, parseOrError } from '../../../../lib/validation.js';

export async function GET() {
  const coach = await getCurrentCoach();
  if (!coach) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const seances = await prisma.seance.findMany({
    where: { coachAccountId: coach.id },
    include: { clientAccount: { include: { lead: { select: { name: true } } } } },
    orderBy: { datePrevue: 'asc' },
  });

  return NextResponse.json({ seances });
}

export async function POST(request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const coach = await getCurrentCoach();
  if (!coach) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = parseOrError(createSeanceSchema, body || {});
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  // RG02 — vérifie que ce client est bien attribué à ce coach avant de lui permettre d'y
  // planifier quoi que ce soit.
  const client = await prisma.clientAccount.findUnique({
    where: { id: parsed.data.clientAccountId },
    include: { lead: { select: { coachId: true } }, abonnements: { where: { statut: 'ACTIF' }, orderBy: { createdAt: 'desc' }, take: 1 } },
  });
  if (!client || client.lead.coachId !== coach.coachId) {
    return NextResponse.json({ error: "Ce client ne vous est pas attribué." }, { status: 403 });
  }

  const abonnement = client.abonnements[0];
  if (!abonnement || abonnement.seancesRestantes <= 0) {
    return NextResponse.json({ error: "Ce client n'a pas d'abonnement actif avec des séances disponibles." }, { status: 409 });
  }

  // RG12 — évite un double rendez-vous au même créneau exact pour ce coach. Vérification et
  // création regroupées dans une transaction pour fermer la fenêtre entre les deux (deux
  // requêtes simultanées sur le même créneau ne doivent pas passer toutes les deux).
  try {
    const seance = await prisma.$transaction(async (tx) => {
      const conflict = await tx.seance.findFirst({
        where: { coachAccountId: coach.id, datePrevue: parsed.data.datePrevue, statut: { not: 'ANNULEE' } },
      });
      if (conflict) {
        throw new Error('CONFLICT');
      }

      const created = await tx.seance.create({
        data: {
          clientAccountId: client.id,
          coachAccountId: coach.id,
          abonnementId: abonnement.id,
          datePrevue: parsed.data.datePrevue,
          lieu: parsed.data.lieu || null,
          contenuPrevu: parsed.data.contenuPrevu || null,
          statut: 'PLANIFIEE',
        },
        include: { clientAccount: { include: { lead: { select: { name: true } } } } },
      });

      // RG07 — chaque séance planifiée laisse une trace dès sa création, pas seulement à
      // ses modifications ultérieures.
      await tx.seanceHistorique.create({
        data: { seanceId: created.id, champ: 'creation', nouvelleValeur: parsed.data.datePrevue.toISOString(), modifiePar: `coach:${coach.id}` },
      });

      return created;
    });

    return NextResponse.json({ seance });
  } catch (err) {
    if (err.message === 'CONFLICT') {
      return NextResponse.json({ error: 'Vous avez déjà une séance prévue à ce créneau.' }, { status: 409 });
    }
    throw err;
  }
}
