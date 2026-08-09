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

export const COACH_DISPO = ['DISPONIBLE', 'COMPLET'];

export const REVIEW_STATUSES = ['PENDING', 'APPROVED', 'REJECTED'];

export const REVIEW_STATUS_LABELS = {
  PENDING: 'En attente',
  APPROVED: 'Publié',
  REJECTED: 'Rejeté',
};

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
