import { pageMetadata } from '../../lib/site.js';

export const metadata = pageMetadata({
  title: 'Actualités — GBÔ AFRICA GROUP',
  description: 'Les dernières actualités et annonces de GBÔ AFRICA GROUP.',
  path: '/news',
});

export default function NewsLayout({ children }) {
  return children;
}
