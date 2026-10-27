import { pageMetadata } from '../../lib/site.js';

export const metadata = pageMetadata({
  title: 'GBÔ Entreprise — Sport & bien-être en entreprise',
  description: 'Une solution sportive collective, simple à mettre en place et adaptée à votre environnement de travail.',
  path: '/corporate',
});

export default function CorporateLayout({ children }) {
  return children;
}
