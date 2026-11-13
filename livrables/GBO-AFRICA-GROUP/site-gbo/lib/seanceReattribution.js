// RG06 — réattribution manuelle d'un coach, décision du 13/11/2026. Après l'annulation
// d'une séance par son coach habituel (lib/seanceAnnulation.js, statut='EN_REATTRIBUTION') :
//   1. l'admin choisit un coach libre sur le créneau et le lui propose,
//   2. ce coach accepte ou refuse ; s'il refuse, il est exclu, l'admin en propose un autre,
//   3. s'il accepte, le CLIENT reçoit la proposition (nom, spécialité, mail, téléphone du
//      nouveau coach) et accepte ou refuse à son tour,
//   4. le client accepte -> la séance est finalisée sous ce coach (statut='PLANIFIEE').
//      le client refuse (avec motif) -> ce coach est exclu lui aussi, l'admin et le coach
//      refusé sont notifiés, l'admin doit en proposer un autre.
// À tout instant, un seul coach "candidat" peut être en cours de décision pour une même
// séance (statut PROPOSEE_AU_COACH ou ACCEPTEE_PAR_COACH) — voir proposerCoach.
import { notifierClient, notifierCoach, notifierAdmin } from './seanceAnnulation.js';

// Coachs potentiellement assignables à cette séance : actifs, disponibles, libres sur le
// créneau, jamais déjà proposés+refusés (par eux-mêmes ou par le client) pour CETTE séance.
export async function candidatsDisponibles(tx, seance) {
  const dejaExclus = await tx.propositionCoach.findMany({
    where: { seanceId: seance.id, statut: { in: ['REFUSEE_PAR_COACH', 'REFUSEE_PAR_CLIENT'] } },
    select: { coachAccountId: true },
  });
  const excludedIds = [seance.coachAccountId, ...dejaExclus.map((p) => p.coachAccountId)];

  return tx.coachAccount.findMany({
    where: {
      actif: true,
      id: { notIn: excludedIds },
      seances: { none: { datePrevue: seance.datePrevue, statut: { notIn: ['ANNULEE', 'EN_REATTRIBUTION'] } } },
      coach: { dispo: 'DISPONIBLE' },
    },
    include: { coach: true },
    orderBy: { id: 'asc' },
  });
}

export async function propositionActive(tx, seanceId) {
  return tx.propositionCoach.findFirst({
    where: { seanceId, statut: { in: ['PROPOSEE_AU_COACH', 'ACCEPTEE_PAR_COACH'] } },
  });
}

// Le dossier client est lu AVANT la transaction (voir buildClientDossier) : multiplier les
// aller-retours Turso à l'intérieur d'une transaction interactive risque de dépasser son
// délai de 5s, qui fait alors échouer toute l'opération (vécu en test — transaction expirée).
export async function buildClientDossier(prisma, clientAccountId) {
  const clientAccount = await prisma.clientAccount.findUnique({
    where: { id: clientAccountId },
    include: { lead: true, abonnements: { where: { statut: 'ACTIF' }, orderBy: { createdAt: 'desc' }, take: 1, include: { formule: true } } },
  });
  const abonnement = clientAccount.abonnements[0] || null;

  return {
    nom: clientAccount.lead.name,
    objectif: clientAccount.lead.objective,
    profil: clientAccount.lead.profile,
    commune: clientAccount.lead.commune,
    lieuPratique: clientAccount.lead.practiceLocation,
    disponibilites: clientAccount.lead.availability,
    commentaire: clientAccount.lead.comment,
    formule: abonnement ? abonnement.formule.nom : null,
    seancesRestantes: abonnement ? abonnement.seancesRestantes : null,
  };
}

export async function proposerCoach(tx, seance, coachAccountId, { modifiePar, clientDossier }) {
  // Relecture dans la transaction : `seance` peut avoir été chargé avant son ouverture, et
  // une requête concurrente (autre admin, ou coach qui vient de répondre) peut avoir changé
  // le statut entre-temps. Ferme la fenêtre plutôt que de se fier à l'instantané reçu.
  const seanceActuelle = await tx.seance.findUnique({ where: { id: seance.id } });
  if (!seanceActuelle || seanceActuelle.statut !== 'EN_REATTRIBUTION') throw new Error('PAS_EN_REATTRIBUTION');
  seance = seanceActuelle;

  const enCours = await propositionActive(tx, seance.id);
  if (enCours) throw new Error('PROPOSITION_EN_COURS');

  const coachAccount = await tx.coachAccount.findUnique({ where: { id: coachAccountId }, include: { coach: true } });
  if (!coachAccount) throw new Error('COACH_INTROUVABLE');

  const candidats = await candidatsDisponibles(tx, seance);
  if (!candidats.some((c) => c.id === coachAccountId)) throw new Error('COACH_NON_CANDIDAT');

  const proposition = await tx.propositionCoach.create({
    data: { seanceId: seance.id, coachAccountId, statut: 'PROPOSEE_AU_COACH' },
  });

  await tx.seanceHistorique.create({
    data: { seanceId: seance.id, champ: 'propositionCoach', nouvelleValeur: `proposée à ${coachAccount.coach.name}`, modifiePar },
  });

  // Le coach doit voir le dossier du client avant de décider d'accepter ou de refuser —
  // pas seulement l'horaire (décision du 13/11/2026).
  await notifierCoach(tx, coachAccountId, {
    type: 'PROPOSITION_CLIENT',
    detail: {
      propositionId: proposition.id,
      seanceId: seance.id,
      datePrevue: seance.datePrevue.toISOString(),
      lieu: seance.lieu,
      contenuPrevu: seance.contenuPrevu,
      clientDossier,
    },
  });

  return proposition;
}

export async function coachRepondProposition(tx, proposition, seance, { reponse, modifiePar }) {
  if (proposition.statut !== 'PROPOSEE_AU_COACH') throw new Error('DEJA_TRAITEE');

  if (reponse === 'ACCEPTER') {
    await tx.propositionCoach.update({ where: { id: proposition.id }, data: { statut: 'ACCEPTEE_PAR_COACH' } });

    const coachAccount = await tx.coachAccount.findUnique({ where: { id: proposition.coachAccountId }, include: { coach: true } });
    await notifierClient(tx, seance.clientAccountId, {
      type: 'SEANCE_COACH_PROPOSE',
      detail: {
        propositionId: proposition.id,
        seanceId: seance.id,
        datePrevue: seance.datePrevue.toISOString(),
        nouveauCoach: { nom: coachAccount.coach.name, spec: coachAccount.coach.spec, email: coachAccount.email, phone: coachAccount.coach.phone, photoUrl: coachAccount.coach.photoUrl },
      },
    });
  } else {
    await tx.propositionCoach.update({ where: { id: proposition.id }, data: { statut: 'REFUSEE_PAR_COACH' } });

    const coachAccount = await tx.coachAccount.findUnique({ where: { id: proposition.coachAccountId }, include: { coach: true } });
    await notifierAdmin(tx, {
      type: 'COACH_A_REFUSE',
      detail: { seanceId: seance.id, datePrevue: seance.datePrevue.toISOString(), coachNom: coachAccount.coach.name },
    });
  }

  await tx.seanceHistorique.create({
    data: { seanceId: seance.id, champ: 'propositionCoach', nouvelleValeur: reponse === 'ACCEPTER' ? 'acceptée par le coach' : 'refusée par le coach', modifiePar },
  });
}

export async function clientRepondProposition(tx, proposition, seance, { reponse, motif, modifiePar }) {
  if (proposition.statut !== 'ACCEPTEE_PAR_COACH') throw new Error('DEJA_TRAITEE');

  if (reponse === 'ACCEPTER') {
    await tx.propositionCoach.update({ where: { id: proposition.id }, data: { statut: 'ACCEPTEE_PAR_CLIENT' } });

    await tx.seance.update({ where: { id: seance.id }, data: { coachAccountId: proposition.coachAccountId, statut: 'PLANIFIEE' } });
    await tx.seanceHistorique.create({
      data: { seanceId: seance.id, champ: 'coachAccountId', ancienneValeur: String(seance.coachAccountId), nouvelleValeur: String(proposition.coachAccountId), modifiePar },
    });
  } else {
    await tx.propositionCoach.update({ where: { id: proposition.id }, data: { statut: 'REFUSEE_PAR_CLIENT', motifRefusClient: motif } });

    const coachAccount = await tx.coachAccount.findUnique({ where: { id: proposition.coachAccountId }, include: { coach: true } });
    await notifierAdmin(tx, {
      type: 'CLIENT_A_REFUSE',
      detail: { seanceId: seance.id, datePrevue: seance.datePrevue.toISOString(), coachNom: coachAccount.coach.name, motif },
    });
    await notifierCoach(tx, proposition.coachAccountId, {
      type: 'CLIENT_A_REFUSE_VOUS',
      detail: { seanceId: seance.id, datePrevue: seance.datePrevue.toISOString(), motif },
    });
  }

  await tx.seanceHistorique.create({
    data: { seanceId: seance.id, champ: 'propositionCoach', nouvelleValeur: reponse === 'ACCEPTER' ? 'acceptée par le client' : 'refusée par le client', modifiePar },
  });
}
