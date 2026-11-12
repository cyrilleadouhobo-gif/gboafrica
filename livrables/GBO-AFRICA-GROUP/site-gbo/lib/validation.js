import { z } from 'zod';

const honeypot = z.string().max(0, 'Requête rejetée.').optional().or(z.literal(''));
const email = z.string().trim().min(1, 'E-mail requis').email('E-mail invalide').max(255);
const phone = z
  .string()
  .trim()
  .min(6, 'Numéro invalide')
  .max(30)
  .regex(/^[0-9+()\s.-]+$/, 'Numéro invalide');
const shortText = (label, max = 120) => z.string().trim().min(1, `${label} requis`).max(max);
const optionalText = (max = 2000) => z.string().trim().max(max).optional().or(z.literal(''));

export const particulierLeadSchema = z.object({
  profile: z.enum(['adulte', 'femme', 'enceinte', 'maman', 'senior']),
  objective: shortText('Objectif', 200),
  // 'plus_infos' = "Je souhaite en savoir plus" (page /deux-seances-gratuites) — traité comme
  // un intérêt (donc suivi nutrition déclenché) mais distingué d'un "oui" ferme dans le CRM,
  // voir le mapping vers nutritionObjective dans app/api/leads/route.js.
  nutrition: z.enum(['oui', 'non', 'plus_infos']),
  // /deux-seances-gratuites sends this as JS `null` (its initial React state) whenever
  // nutrition is 'non' — optionalText() alone only tolerates `undefined`/'' , not `null`.
  nutritionObj: optionalText(200).nullable(),
  practiceLocation: z.enum(['domicile', 'salle_partenaire', 'exterieur']).optional().or(z.literal('')).nullable(),
  prenom: shortText('Prénom'),
  nom: shortText('Nom'),
  tel: phone,
  email,
  commune: optionalText(120),
  availability: optionalText(300),
  comment: optionalText(1000),
  consent: z.literal(true, { errorMap: () => ({ message: 'Le consentement est requis.' }) }),
  website: honeypot,
});

// Formulaire /corporate ("Demander une proposition commerciale") — refonte du 01/11/2026
// suite au brief entreprise validé avec le CEO (voir GBO_Proposition_complete_page_Entreprises.docx).
// effectif est désormais une tranche fixe (plus simple à exploiter côté back-office), lieu
// est devenu un champ texte libre (commune/site/adresse) au lieu d'un choix fixe.
export const companyLeadSchema = z.object({
  entreprise: shortText('Entreprise'),
  contact: shortText('Nom et fonction du contact'),
  tel: phone,
  email,
  effectifConcerne: z.enum(['1 à 10', '11 à 20', '21 à 30', 'Plus de 30'], { errorMap: () => ({ message: 'Merci de préciser l’effectif concerné.' }) }),
  lieu: shortText('Lieu d’intervention', 160),
  frequence: z.enum(['À définir', '1 séance par semaine', '2 séances par semaine', '3 séances par semaine']).optional().or(z.literal('')),
  message: optionalText(1000),
  consent: z.literal(true, { errorMap: () => ({ message: 'Le consentement est requis.' }) }),
  website: honeypot,
});

export const waitlistSchema = z.object({
  email,
  pole: shortText('Pôle', 60),
  website: honeypot,
});

export const contactSchema = z.object({
  nom: shortText('Nom'),
  tel: phone,
  email,
  msg: shortText('Message', 2000),
  website: honeypot,
});

// CV joint au format base64 (encodé côté client) — voir components/CoachApplicationForm.js.
// 4 Mo de base64 ≈ 3 Mo de fichier réel, plafonné pour rester sous la limite de taille de
// requête de Vercel (~4.5 Mo) une fois le reste du formulaire ajouté.
// Signatures d'en-tête réelles des formats autorisés : le type déclaré par le navigateur
// peut être falsifié, le contenu, lui, doit commencer par la bonne signature.
const CV_SIGNATURES = {
  'application/pdf': [0x25, 0x50, 0x44, 0x46], // %PDF
  'application/msword': [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1], // OLE2 (.doc)
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [0x50, 0x4b, 0x03, 0x04], // ZIP (.docx)
};

const cvFile = z
  .object({
    filename: z.string().trim().min(1).max(150),
    contentType: z.enum(['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
    base64: z.string().min(1).max(4_000_000, 'Le fichier est trop volumineux (3 Mo maximum).'),
  })
  .refine((cv) => {
    const head = Buffer.from(cv.base64.slice(0, 16), 'base64');
    return CV_SIGNATURES[cv.contentType].every((byte, i) => head[i] === byte);
  }, 'Le fichier ne correspond pas à son format (PDF, DOC ou DOCX attendu).')
  .optional()
  .nullable();

export const careerSchema = z.object({
  nom: shortText('Nom'),
  tel: phone,
  email,
  spec: optionalText(200),
  msg: optionalText(2000),
  cv: cvFile,
  website: honeypot,
});

export const partnerSchema = z.object({
  org: shortText('Organisation'),
  email,
  msg: optionalText(2000),
  website: honeypot,
});

export const gymPartnerSchema = z.object({
  gymName: shortText('Nom de la salle', 150),
  managerName: shortText('Nom du responsable', 150),
  phone,
  whatsapp: z
    .string()
    .trim()
    .max(30)
    .regex(/^[0-9+()\s.-]*$/, 'Numéro invalide')
    .optional()
    .or(z.literal('')),
  email,
  commune: shortText('Commune', 120),
  address: shortText('Adresse', 300),
  memberCount: optionalText(40),
  hasSoftware: z.enum(['oui', 'non']),
  reasons: z.array(z.string().max(120)).max(10).optional().default([]),
  website: honeypot,
});

export const gymPartnerStatusSchema = z.object({
  direction: z.union([z.literal(1), z.literal(-1)]),
});

export const newsletterSchema = z.object({
  email,
  website: honeypot,
});

export const reviewSchema = z.object({
  authorName: shortText('Nom', 80),
  context: optionalText(80),
  rating: z.number().int().min(1, 'Note invalide').max(5, 'Note invalide'),
  comment: shortText('Avis', 1000),
  website: honeypot,
});

export const reviewStatusSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED']),
});

export const nutritionStatusSchema = z.object({
  status: z.enum(['NOUVEAU', 'EN_SUIVI', 'A_RELANCER', 'TERMINE']),
  notes: optionalText(2000),
});

export const loginSchema = z.object({
  email,
  password: z.string().min(8, 'Mot de passe invalide').max(200),
});

export const statusUpdateSchema = z.object({
  direction: z.union([z.literal(1), z.literal(-1)]),
});

export const assignCoachSchema = z.object({
  coachId: z.number().int().positive(),
});

// --- GBÔ Fitness Digital — espace client ---------------------------------------------
export const clientLoginSchema = z.object({
  email,
  password: z.string().min(8, 'Mot de passe invalide').max(200),
});

const strongPassword = z
  .string()
  .min(10, 'Le mot de passe doit contenir au moins 10 caractères')
  .max(200)
  .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
  .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
  .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre');

export const clientChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Mot de passe actuel requis').max(200),
    newPassword: strongPassword,
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'Le nouveau mot de passe doit être différent de l’actuel.',
    path: ['newPassword'],
  });

export const createClientAccountSchema = z.object({
  leadId: z.number().int().positive(),
  email,
});

// --- GBÔ Fitness Digital — espace coach ----------------------------------------------
export const coachLoginSchema = clientLoginSchema;
export const coachChangePasswordSchema = clientChangePasswordSchema;

export const createCoachAccountSchema = z.object({
  coachId: z.number().int().positive(),
  email,
});

// --- GBÔ Fitness Digital — formules & abonnements ------------------------------------
export const formuleSchema = z.object({
  nom: shortText('Nom de la formule', 80),
  nbSeances: z.number().int().min(1, 'Au moins 1 séance').max(500),
  dureeJours: z.number().int().min(1, 'Au moins 1 jour').max(3650),
  prix: z.number().int().min(0, 'Le tarif ne peut pas être négatif').max(100_000_000),
});

export const formuleStatusSchema = z.object({
  actif: z.boolean(),
});

export const createAbonnementSchema = z.object({
  formuleId: z.number().int().positive(),
});

export const paiementSchema = z.object({
  montant: z.number().int().min(1, 'Le montant doit être positif').max(100_000_000),
  methode: z.enum(['Espèces', 'Mobile Money', 'Virement', 'Chèque', 'Autre']),
});

// --- GBÔ Fitness Digital — planning & séances ------------------------------------------
export const compteRenduSchema = z.object({
  contenu: z.string().trim().min(1, 'Le contenu est requis').max(4000),
});

export const createSeanceSchema = z.object({
  clientAccountId: z.number().int().positive(),
  datePrevue: z.coerce.date().refine((d) => d.getTime() > Date.now(), { message: 'La date doit être dans le futur.' }),
  lieu: optionalText(160),
  contenuPrevu: optionalText(2000),
});

export function parseOrError(schema, data) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const firstIssue = result.error.issues[0];
    return { ok: false, error: firstIssue?.message || 'Données invalides.' };
  }
  return { ok: true, data: result.data };
}
