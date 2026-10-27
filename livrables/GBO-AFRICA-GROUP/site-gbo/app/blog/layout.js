import { pageMetadata } from '../../lib/site.js';

export const metadata = pageMetadata({
  title: 'Blog — GBÔ AFRICA GROUP',
  description: 'Conseils fitness, nutrition et bien-être par GBÔ AFRICA GROUP, pour faire avancer le sport en Afrique.',
  path: '/blog',
});

export default function BlogLayout({ children }) {
  return children;
}
