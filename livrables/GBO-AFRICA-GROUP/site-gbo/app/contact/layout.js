import { pageMetadata } from '../../lib/site.js';

// page.js est un composant client (formulaire avec état) et ne peut donc pas exporter
// `metadata` — ce layout, lui, reste un composant serveur et porte le titre de l'onglet.
// Page jusqu'ici sans aucune metadata (audit du 27/10).
export const metadata = pageMetadata({
  title: 'Contact — GBÔ AFRICA GROUP',
  description: 'Une question, un projet ? Écrivez-nous ou contactez-nous sur WhatsApp, un conseiller GBÔ vous répond rapidement.',
  path: '/contact',
});

export default function ContactLayout({ children }) {
  return children;
}
