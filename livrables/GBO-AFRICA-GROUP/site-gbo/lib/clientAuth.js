import crypto from 'node:crypto';
import { cookies } from 'next/headers';
import { prisma } from './db.js';
import { sha256, hashIp, sessionCookieOptions } from './auth.js';

// Authentification de l'espace client (GBÔ Fitness Digital) — même mécanisme que l'admin
// (token aléatoire, seul le hash stocké, cookie httpOnly/secure/strict) mais sur des tables
// dédiées (ClientSession), séparées d'AdminUser. Voir la proposition d'architecture, décision 3.
export const CLIENT_SESSION_COOKIE = 'gbo_client_session';
const CLIENT_SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 jours — espace client grand public, pas un back-office

export async function createClientSession(clientAccountId, { userAgent, ip } = {}) {
  const id = crypto.randomUUID();
  const rawToken = crypto.randomBytes(32).toString('base64url');
  const tokenHash = sha256(rawToken);
  const expiresAt = new Date(Date.now() + CLIENT_SESSION_TTL_MS);

  await prisma.clientSession.create({
    data: { id, tokenHash, clientAccountId, userAgent: userAgent?.slice(0, 255) || null, ipHash: hashIp(ip), expiresAt },
  });

  return { cookieValue: `${id}.${rawToken}`, expiresAt };
}

export async function verifyClientSessionCookie(cookieValue) {
  if (!cookieValue || !cookieValue.includes('.')) return null;
  const [id, rawToken] = cookieValue.split('.');
  if (!id || !rawToken) return null;

  const session = await prisma.clientSession.findUnique({ where: { id }, include: { clientAccount: true } });
  if (!session) return null;

  if (session.expiresAt < new Date()) {
    await prisma.clientSession.delete({ where: { id } }).catch(() => {});
    return null;
  }

  const expectedHash = Buffer.from(session.tokenHash, 'hex');
  const actualHash = Buffer.from(sha256(rawToken), 'hex');
  if (expectedHash.length !== actualHash.length || !crypto.timingSafeEqual(expectedHash, actualHash)) {
    return null;
  }

  if (!session.clientAccount.actif) return null;

  return session.clientAccount;
}

export async function destroyClientSessionCookie(cookieValue) {
  if (!cookieValue || !cookieValue.includes('.')) return;
  const [id] = cookieValue.split('.');
  await prisma.clientSession.delete({ where: { id } }).catch(() => {});
}

/**
 * Le contrôle qui fait foi. proxy.js ne vérifie que la présence du cookie (Edge, pas
 * d'accès base de données) — c'est ici que la session est vérifiée contre la base, à
 * appeler depuis chaque route /api/client/* et depuis le layout protégé de l'espace client.
 */
export async function getCurrentClient() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(CLIENT_SESSION_COOKIE)?.value;
  if (!raw) return null;
  return verifyClientSessionCookie(raw);
}

export function clientSessionCookieOptions(expiresAt) {
  return sessionCookieOptions(expiresAt);
}
