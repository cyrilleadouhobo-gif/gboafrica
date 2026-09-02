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
  // The tunnel sends this as JS `null` (its initial React state) whenever nutrition
  // is 'non' — optionalText() alone only tolerates `undefined`/'' , not `null`.
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

export const companyLeadSchema = z.object({
  entreprise: shortText('Entreprise'),
  contact: shortText('Nom du contact'),
  tel: phone,
  email,
  effectif: optionalText(40),
  besoin: optionalText(200),
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

export const careerSchema = z.object({
  nom: shortText('Nom'),
  tel: phone,
  email,
  spec: optionalText(200),
  msg: optionalText(2000),
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

export function parseOrError(schema, data) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const firstIssue = result.error.issues[0];
    return { ok: false, error: firstIssue?.message || 'Données invalides.' };
  }
  return { ok: true, data: result.data };
}
