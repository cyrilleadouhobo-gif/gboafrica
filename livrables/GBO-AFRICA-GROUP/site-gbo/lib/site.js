// Central place for the canonical production URL. Falls back to localhost in dev so
// sitemap.xml / robots.txt / JSON-LD keep working without a .env entry before a real
// domain is chosen. Set SITE_URL in production — see .env.example.
export const SITE_URL = (process.env.SITE_URL || 'http://localhost:5300').replace(/\/$/, '');

export const SITE_NAME = 'GBÔ AFRICA GROUP';
