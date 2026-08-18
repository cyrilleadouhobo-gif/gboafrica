export const LEAD_TYPES = ['PARTICULIER', 'ENTREPRISE', 'WAITLIST'];

export const LEAD_TYPE_LABELS = {
  PARTICULIER: 'Particulier',
  ENTREPRISE: 'Entreprise',
  WAITLIST: "Liste d'attente",
};

export const LEAD_STATUSES = ['NOUVEAU', 'A_CONTACTER', 'QUALIFIE', 'COACH_ATTRIBUE', 'CLIENT', 'PERDU'];

export const LEAD_STATUS_LABELS = {
  NOUVEAU: 'Nouveau',
  A_CONTACTER: 'À contacter',
  QUALIFIE: 'Qualifié',
  COACH_ATTRIBUE: 'Coach attribué',
  CLIENT: 'Client',
  PERDU: 'Perdu / En pause',
};

export const PRACTICE_LOCATION_LABELS = {
  domicile: 'À domicile',
  salle_partenaire: 'Salle partenaire',
  exterieur: 'En extérieur',
};

export const COACH_DISPO = ['DISPONIBLE', 'COMPLET'];

export const REVIEW_STATUSES = ['PENDING', 'APPROVED', 'REJECTED'];

export const REVIEW_STATUS_LABELS = {
  PENDING: 'En attente',
  APPROVED: 'Publié',
  REJECTED: 'Rejeté',
};

export const NUTRITION_FOLLOWUP_STATUSES = ['NOUVEAU', 'EN_SUIVI', 'A_RELANCER', 'TERMINE'];

export const NUTRITION_FOLLOWUP_STATUS_LABELS = {
  NOUVEAU: 'Nouveau',
  EN_SUIVI: 'En suivi',
  A_RELANCER: 'À relancer',
  TERMINE: 'Terminé',
};

export const GYM_PARTNER_STATUSES = ['NOUVEAU', 'A_CONTACTER', 'QUALIFIE', 'PARTENAIRE_ACTIF', 'PERDU'];

export const GYM_PARTNER_STATUS_LABELS = {
  NOUVEAU: 'Nouveau',
  A_CONTACTER: 'À contacter',
  QUALIFIE: 'Qualifié',
  PARTENAIRE_ACTIF: 'Partenaire actif',
  PERDU: 'Perdu / Refusé',
};

export const GYM_PARTNER_REASONS = [
  'Digitaliser ma salle',
  'Recevoir de nouveaux clients',
  'Gagner en visibilité',
  'Participer aux événements GBÔ',
  'Plusieurs de ces avantages',
];

export function gymPartnerCode(seq) {
  return `GP-${seq}`;
}

export const ABIDJAN_COMMUNES = [
  'Abobo',
  'Adjamé',
  'Attécoubé',
  'Cocody',
  'Koumassi',
  'Marcory',
  'Plateau',
  'Port-Bouët',
  'Treichville',
  'Yopougon',
  'Bingerville',
  'Anyama',
  'Songon',
];

export function leadCode(type, seq) {
  const prefix = type === 'ENTREPRISE' ? 'C' : type === 'WAITLIST' ? 'W' : 'L';
  return `${prefix}-${seq}`;
}
