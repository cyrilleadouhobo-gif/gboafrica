import { prisma } from './db.js';

export function getClientIp(request) {
  const fwd = request.headers.get('x-forwarded-for');
  // The leftmost entry is whatever the client sent and is trivially spoofable — a visitor
  // can set their own X-Forwarded-For to a fresh value on every request to dodge
  // rate limiting. The rightmost entry is the one appended by our own trusted reverse
  // proxy right before reaching this app, so that's the one to trust.
  if (fwd) return fwd.split(',').pop().trim();
  return request.headers.get('x-real-ip') || '0.0.0.0';
}

/**
 * Lightweight same-origin check for state-changing requests on routes that rely on
 * cookie auth. There is no separate frontend domain here, so comparing Origin/Referer
 * against the request's own host is a solid, low-friction CSRF mitigation.
 */
export function isSameOrigin(request) {
  const origin = request.headers.get('origin');
  if (!origin) return true; // same-site form posts / curl / server-to-server: no Origin header is normal
  try {
    const originHost = new URL(origin).host;
    return originHost === request.headers.get('host');
  } catch {
    return false;
  }
}

/**
 * DB-backed sliding-window rate limiter. Persists across restarts (unlike an in-memory
 * map) and is intentionally simple — fine for a single-instance deployment. If this app
 * ever runs across multiple serverless instances, swap this for Redis (see PRD §9.2).
 */
export async function rateLimit(bucketKey, { max, windowMs }) {
  const windowStart = new Date(Date.now() - windowMs);

  const count = await prisma.rateLimitHit.count({
    where: { bucketKey, createdAt: { gte: windowStart } },
  });

  if (count >= max) {
    return { allowed: false, retryAfterMs: windowMs };
  }

  await prisma.rateLimitHit.create({ data: { bucketKey } });

  // Opportunistic cleanup so the table doesn't grow forever.
  if (Math.random() < 0.02) {
    prisma.rateLimitHit.deleteMany({ where: { createdAt: { lt: new Date(Date.now() - windowMs * 20) } } }).catch(() => {});
  }

  return { allowed: true };
}

// Plafond global par formulaire, tous IP confondues : la limite par IP seule ne suffit pas
// contre un bot qui change d'adresse à chaque requête. Assez haut pour ne jamais gêner des
// visiteurs réels, mais bloque une vague de spam venue de partout.
export const GLOBAL_FORM_LIMIT = { max: 100, windowMs: 60 * 60 * 1000 };
export const GLOBAL_LOGIN_LIMIT = { max: 30, windowMs: 15 * 60 * 1000 };

export async function formRateLimit(formKey, ip, perIp, globalLimit = GLOBAL_FORM_LIMIT) {
  const byIp = await rateLimit(`${formKey}:${ip}`, perIp);
  if (!byIp.allowed) return byIp;
  return rateLimit(`global:${formKey}`, globalLimit);
}

/** A hidden field real users never fill; bots that auto-fill every field trip it. */
export function honeypotTripped(formValue) {
  return typeof formValue === 'string' && formValue.trim().length > 0;
}
