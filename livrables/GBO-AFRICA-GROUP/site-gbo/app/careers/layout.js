import { pageMetadata } from '../../lib/site.js';

export const metadata = pageMetadata({
  title: 'Carrières & Recrutement — GBÔ AFRICA GROUP',
  description: 'Des talents pour faire avancer le sport en Afrique. Découvrez nos offres et rejoignez le réseau de coachs GBÔ.',
  path: '/careers',
});

export default function CareersLayout({ children }) {
  return children;
}
