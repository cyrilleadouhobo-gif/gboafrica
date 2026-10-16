import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { prisma } from './db.js';
import { hashIp } from './auth.js';

export const MEMBER_SESSION_COOKIE = 'gbo_member_session';
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30j — espace membre public, pas un back-office

export async function hashPassword(plain) {
  return bcrypt.hash(plain, 12);
}

// Même principe que DUMMY_PASSWORD_HASH dans lib/auth.js : un hash bcrypt valide d'un
// secret jetable, pour que verifyPassword() fasse le même travail que l'adresse existe ou non.
export const MEMBER_DUMMY_PASSWORD_HASH = '$2b$12$GOHkRoblWQAdvChheaQJzOqo1/A98vNv6jReBArfVILTNKe9nq2wy';

export async function verifyPassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

export async function createMemberSession(memberId, { userAgent, ip } = {}) {
  const id = crypto.randomUUID();
  const rawToken = crypto.randomBytes(32).toString('base64url');
  const tokenHash = sha256(rawToken);
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  await prisma.memberSession.create({
    data: { id, tokenHash, memberId, userAgent: userAgent?.slice(0, 255) || null, ipHash: hashIp(ip), expiresAt },
  });

  return { cookieValue: `${id}.${rawToken}`, expiresAt };
}

export async function verifyMemberSessionCookie(cookieValue) {
  if (!cookieValue || !cookieValue.includes('.')) return null;
  const [id, rawToken] = cookieValue.split('.');
  if (!id || !rawToken) return null;

  const session = await prisma.memberSession.findUnique({ where: { id }, include: { member: true } });
  if (!session) return null;

  if (session.expiresAt < new Date()) {
    await prisma.memberSession.delete({ where: { id } }).catch(() => {});
    return null;
  }

  const expectedHash = Buffer.from(session.tokenHash, 'hex');
  const actualHash = Buffer.from(sha256(rawToken), 'hex');
  if (expectedHash.length !== actualHash.length || !crypto.timingSafeEqual(expectedHash, actualHash)) {
    return null;
  }

  if (session.member.status !== 'ACTIVE') return null;

  return session.member;
}

export async function destroyMemberSessionCookie(cookieValue) {
  if (!cookieValue || !cookieValue.includes('.')) return;
  const [id] = cookieValue.split('.');
  await prisma.memberSession.delete({ where: { id } }).catch(() => {});
}

export function memberSessionCookieOptions(expiresAt) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    expires: expiresAt,
  };
}

/**
 * Authoritative member check — doit être appelé depuis toute route /api/me ou page
 * d'espace membre protégée. Le proxy (middleware) ne fait qu'un contrôle rapide de
 * présence du cookie, jamais la vérification cryptographique.
 */
export async function getCurrentMember() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(MEMBER_SESSION_COOKIE)?.value;
  if (!raw) return null;
  return verifyMemberSessionCookie(raw);
}
