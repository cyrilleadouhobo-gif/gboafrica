// RG06 — règles d'annulation/report. Décisions prises avec Cyrille :
//  (13/11/2026) annulation client ≥24h avant : gratuite. <24h avant : décomptée du forfait.
//  (13/11/2026) report (client uniquement) ≥24h avant : gratuit. <24h avant : interdit.
//  (13/11/2026) un report reste gratuit seulement les 2 premières fois.
//  (13/11/2026, révisé) le COACH ne peut plus reporter une séance, seulement l'annuler. Son
//  annulation n'est JAMAIS décomptée du forfait (ce n'est pas le client qui est en faute).
//  (13/11/2026, révisé une 2e fois) l'annulation par le coach ne réattribue plus personne
//  automatiquement : elle place la séance en attente (EN_REATTRIBUTION) et c'est l'admin qui
//  choisit manuellement un nouveau coach parmi les disponibles — voir lib/seanceReattribution.js
//  pour la suite du processus (proposition → acceptation/refus du coach → du client).
export const DELAI_ANNULATION_MS = 24 * 60 * 60 * 1000;

// Un report ne reste gratuit que les 2 premières fois : au-delà, le client doit contacter
// son coach directement plutôt que de repousser indéfiniment la séance.
export const REPORTS_MAX = 2;

export function estDansLeDelai(datePrevue) {
  return new Date(datePrevue).getTime() - Date.now() >= DELAI_ANNULATION_MS;
}

// Notifications destinées au client/coach — canal 'whatsapp' car conçues pour partir par
// WhatsApp Business une fois son activation faite ; en attendant, elles s'affichent dans
// l'espace concerné et passent à 'LUE' dès qu'elles y sont vues, pour ne pas être renvoyées
// en double une fois WhatsApp actif. Exportées pour être réutilisées par
// lib/seanceReattribution.js.
export async function notifierClient(tx, clientAccountId, { type, detail }) {
  await tx.notification.create({ data: { clientAccountId, canal: 'whatsapp', type, detail: JSON.stringify(detail) } });
}

export async function notifierCoach(tx, coachAccountId, { type, detail }) {
  await tx.notification.create({ data: { coachAccountId, canal: 'whatsapp', type, detail: JSON.stringify(detail) } });
}

// Notification admin — aucune colonne dédiée sur Notification, donc clientAccountId et
// coachAccountId restent tous les deux null ; canal:'admin' sert uniquement de marqueur
// pour que GET /api/admin/notifications sache les reconnaître.
export async function notifierAdmin(tx, { type, detail }) {
  await tx.notification.create({ data: { canal: 'admin', type, detail: JSON.stringify(detail) } });
}

export async function annulerParClient(tx, seance, { motif, modifiePar }) {
  const dansLeDelai = estDansLeDelai(seance.datePrevue);

  await tx.seance.update({
    where: { id: seance.id },
    data: { statut: 'ANNULEE', motifAnnulation: motif, annulePar: 'CLIENT', decompteeMalgreAnnulation: !dansLeDelai },
  });

  await tx.seanceHistorique.create({
    data: { seanceId: seance.id, champ: 'statut', ancienneValeur: seance.statut, nouvelleValeur: 'ANNULEE', modifiePar },
  });

  if (!dansLeDelai) {
    const abonnement = await tx.abonnement.update({
      where: { id: seance.abonnementId },
      data: { seancesRestantes: { decrement: 1 } },
    });
    if (abonnement.seancesRestantes <= 0) {
      await tx.abonnement.update({ where: { id: abonnement.id }, data: { statut: 'EPUISE' } });
    }
  }

  await notifierCoach(tx, seance.coachAccountId, {
    type: 'SEANCE_ANNULEE',
    detail: { seanceId: seance.id, datePrevue: seance.datePrevue.toISOString(), motif, decomptee: !dansLeDelai },
  });

  return { dansLeDelai };
}

export async function annulerParCoach(tx, seance, { motif, modifiePar }) {
  // Jamais décomptée : l'initiative vient du coach, pas du client. Plus de réattribution
  // automatique (décision révisée du 13/11/2026) : la séance passe en attente, l'admin
  // choisira lui-même un nouveau coach via le flux de lib/seanceReattribution.js.
  const ancienCoachAccount = await tx.coachAccount.findUnique({ where: { id: seance.coachAccountId }, include: { coach: true } });

  await tx.seance.update({
    where: { id: seance.id },
    data: { statut: 'EN_REATTRIBUTION', motifAnnulation: motif, annulePar: 'COACH', decompteeMalgreAnnulation: false },
  });
  await tx.seanceHistorique.create({
    data: { seanceId: seance.id, champ: 'statut', ancienneValeur: seance.statut, nouvelleValeur: 'EN_REATTRIBUTION', modifiePar },
  });
  await tx.seanceHistorique.create({
    data: { seanceId: seance.id, champ: 'motifAnnulationCoach', nouvelleValeur: motif, modifiePar },
  });

  await notifierClient(tx, seance.clientAccountId, {
    type: 'SEANCE_ANNULEE_PAR_COACH',
    detail: { seanceId: seance.id, datePrevue: seance.datePrevue.toISOString(), motif },
  });

  await notifierAdmin(tx, {
    type: 'SEANCE_ANNULEE_PAR_COACH',
    detail: {
      seanceId: seance.id,
      datePrevue: seance.datePrevue.toISOString(),
      motif,
      ancienCoach: { id: ancienCoachAccount.id, nom: ancienCoachAccount.coach.name },
    },
  });
}

// Report — réservé au client depuis la décision du 13/11/2026 (le coach n'annule plus que,
// il ne reporte plus).
export async function reporterSeance(tx, seance, { motif, nouvelleDatePrevue, modifiePar }) {
  const nombreDeReports = await tx.seanceHistorique.count({ where: { seanceId: seance.id, champ: 'datePrevue' } });
  if (nombreDeReports >= REPORTS_MAX) throw new Error('TROP_DE_REPORTS');

  // Même contrôle anti-double-réservation que la planification initiale (RG12).
  const conflict = await tx.seance.findFirst({
    where: {
      coachAccountId: seance.coachAccountId,
      datePrevue: nouvelleDatePrevue,
      statut: { notIn: ['ANNULEE', 'EN_REATTRIBUTION'] },
      id: { not: seance.id },
    },
  });
  if (conflict) throw new Error('CONFLICT');

  await tx.seance.update({ where: { id: seance.id }, data: { datePrevue: nouvelleDatePrevue } });

  await tx.seanceHistorique.create({
    data: {
      seanceId: seance.id,
      champ: 'datePrevue',
      ancienneValeur: seance.datePrevue.toISOString(),
      nouvelleValeur: nouvelleDatePrevue.toISOString(),
      modifiePar,
    },
  });
  await tx.seanceHistorique.create({
    data: { seanceId: seance.id, champ: 'motifReport', nouvelleValeur: motif, modifiePar },
  });

  await notifierCoach(tx, seance.coachAccountId, {
    type: 'SEANCE_REPORTEE',
    detail: { seanceId: seance.id, ancienneDatePrevue: seance.datePrevue.toISOString(), nouvelleDatePrevue: nouvelleDatePrevue.toISOString(), motif },
  });
}
