// Central place for the canonical production URL. Falls back to localhost in dev so
// sitemap.xml / robots.txt / JSON-LD keep working without a .env entry before a real
// domain is chosen. Set SITE_URL in production — see .env.example.
export const SITE_URL = (process.env.SITE_URL || 'http://localhost:5300').replace(/\/$/, '');

export const SITE_NAME = 'GBÔ AFRICA GROUP';

// Destination des notifications de formulaire, une boîte Hostinger dédiée par usage
// (décidé avec Cyrille le 08/09 plutôt qu'une seule boîte pour tout) — voir .env.example.
// CONTACT_EMAIL reste la valeur par défaut pour tout ce qui n'a pas sa propre boîte
// (ex. Salles partenaires, pas mentionné explicitement).
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'contact@gboafricagroup.com';
export const CAREERS_EMAIL = process.env.CAREERS_EMAIL || 'recrutement@gboafricagroup.com';
export const PARTNERS_EMAIL = process.env.PARTNERS_EMAIL || 'partenariats@gboafricagroup.com';
// Formulaire Particulier (/fitness/tunnel, /deux-seances-gratuites) ET Entreprise
// (/corporate, lien "Solutions Entreprises" présent sur la page Fitness).
export const FITNESS_EMAIL = process.env.FITNESS_EMAIL || 'fitness@gboafricagroup.com';
