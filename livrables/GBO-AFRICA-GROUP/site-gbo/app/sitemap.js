import { SITE_URL } from '../lib/site.js';
import { POLE_DETAIL } from '../data/poles.js';
import { LEGAL } from '../data/legal.js';

const STATIC_ROUTES = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/avis', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/blog', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/careers', priority: 0.5, changeFrequency: 'weekly' },
  { path: '/coachs', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/corporate', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/devenir-coach', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/fitness', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/fitness/tunnel', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/news', priority: 0.5, changeFrequency: 'weekly' },
  { path: '/partners', priority: 0.5, changeFrequency: 'monthly' },
];

export default function sitemap() {
  const now = new Date();

  const staticEntries = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const poleEntries = Object.keys(POLE_DETAIL).map((slug) => ({
    url: `${SITE_URL}/poles/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const legalEntries = Object.keys(LEGAL).map((slug) => ({
    url: `${SITE_URL}/legal/${slug}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.3,
  }));

  return [...staticEntries, ...poleEntries, ...legalEntries];
}
