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
// Formulaire Particulier (/deux-seances-gratuites) ET Entreprise
// (/corporate, lien "Solutions Entreprises" présent sur la page Fitness).
export const FITNESS_EMAIL = process.env.FITNESS_EMAIL || 'fitness@gboafricagroup.com';

// Construit un objet metadata Next.js complet et cohérent (title, description, canonical,
// openGraph, twitter) à partir du strict minimum — évite que chaque page ne définisse que
// title/description et laisse og:title / og:url hériter (en silence) de la home (audit du
// 27/10 : toutes les pages partageaient les mêmes balises og:, pointant vers /).
// `images`, optionnel, remplace l'image sociale par défaut (app/opengraph-image.js) par une
// vraie photo déjà disponible pour cette page (article de blog, actu, pôle...). On fixe
// explicitement l'image par défaut ici plutôt que de compter sur l'héritage automatique du
// fichier opengraph-image.js : dès qu'une page définit son propre `openGraph` (même sans
// `images`), Next.js ne va plus chercher l'image du segment parent.
const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph-image`;

export function pageMetadata({ title, description, path, images }) {
  const url = `${SITE_URL}${path}`;
  const resolvedImages = images || [DEFAULT_OG_IMAGE];
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'fr_FR',
      type: 'website',
      images: resolvedImages,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: resolvedImages,
    },
  };
}
