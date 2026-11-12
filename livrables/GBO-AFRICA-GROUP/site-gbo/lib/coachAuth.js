import crypto from 'node:crypto';
import { cookies } from 'next/headers';
import { prisma } from './db.js';
import { sha256, hashIp, sessionCookieOptions } from './auth.js';

// Authentification de l'espace coach (GBÔ Fitness Digital) — même mécanisme que l'espace
// client (lib/clientAuth.js) et l'admin (lib/auth.js), sur des tables dédiées (CoachSession).
export const COACH_SESSION_COOKIE = 'gbo_coach_session';
const COACH_SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 jours — même durée que l'espace client

export async function createCoachSession(coachAccountId, { userAgent, ip } = {}) {
  const id = crypto.randomUUID();
  const rawToken = crypto.randomBytes(32).toString('base64url');
  const tokenHash = sha256(rawToken);
  const expiresAt = new Date(Date.now() + COACH_SESSION_TTL_MS);

  await prisma.coachSession.create({
    data: { id, tokenHash, coachAccountId, userAgent: userAgent?.slice(0, 255) || null, ipHash: hashIp(ip), expiresAt },
  });

  return { cookieValue: `${id}.${rawToken}`, expiresAt };
}

export async function verifyCoachSessionCookie(cookieValue) {
  if (!cookieValue || !cookieValue.includes('.')) return null;
  const [id, rawToken] = cookieValue.split('.');
  if (!id || !rawToken) return null;

  const session = await prisma.coachSession.findUnique({ where: { id }, include: { coachAccount: true } });
  if (!session) return null;

  if (session.expiresAt < new Date()) {
    await prisma.coachSession.delete({ where: { id } }).catch(() => {});
    return null;
  }

  const expectedHash = Buffer.from(session.tokenHash, 'hex');
  const actualHash = Buffer.from(sha256(rawToken), 'hex');
  if (expectedHash.length !== actualHash.length || !crypto.timingSafeEqual(expectedHash, actualHash)) {
    return null;
  }

  if (!session.coachAccount.actif) return null;

  return session.coachAccount;
}

export async function destroyCoachSessionCookie(cookieValue) {
  if (!cookieValue || !cookieValue.includes('.')) return;
  const [id] = cookieValue.split('.');
  await prisma.coachSession.delete({ where: { id } }).catch(() => {});
}

export async function getCurrentCoach() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(COACH_SESSION_COOKIE)?.value;
  if (!raw) return null;
  return verifyCoachSessionCookie(raw);
}

export function coachSessionCookieOptions(expiresAt) {
  return sessionCookieOptions(expiresAt);
}
