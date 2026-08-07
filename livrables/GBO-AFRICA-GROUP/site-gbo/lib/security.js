import { prisma } from './db.js';

export function getClientIp(request) {
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
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

/** A hidden field real users never fill; bots that auto-fill every field trip it. */
export function honeypotTripped(formValue) {
  return typeof formValue === 'string' && formValue.trim().length > 0;
}
