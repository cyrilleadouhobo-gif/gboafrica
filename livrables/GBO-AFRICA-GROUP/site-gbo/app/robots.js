import { SITE_URL } from '../lib/site.js';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api', '/partenaires'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
