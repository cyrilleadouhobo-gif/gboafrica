import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { prisma } from './db.js';

export const SESSION_COOKIE = 'gbo_session';
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12h — short-lived on purpose for an admin back-office

export async function hashPassword(plain) {
  return bcrypt.hash(plain, 12);
}

export async function verifyPassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function hashIp(ip) {
  if (!ip) return null;
  // Never store raw IPs — a salted hash still lets us rate-limit/audit without keeping PII we don't need.
  return crypto.createHash('sha256').update(ip + (process.env.SESSION_SECRET || 'dev-only-secret')).digest('hex');
}

export async function createSession(adminUserId, { userAgent, ip } = {}) {
  const id = crypto.randomUUID();
  const rawToken = crypto.randomBytes(32).toString('base64url');
  const tokenHash = sha256(rawToken);
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  await prisma.session.create({
    data: { id, tokenHash, adminUserId, userAgent: userAgent?.slice(0, 255) || null, ipHash: hashIp(ip), expiresAt },
  });

  return { cookieValue: `${id}.${rawToken}`, expiresAt };
}

export async function verifySessionCookie(cookieValue) {
  if (!cookieValue || !cookieValue.includes('.')) return null;
  const [id, rawToken] = cookieValue.split('.');
  if (!id || !rawToken) return null;

  const session = await prisma.session.findUnique({ where: { id }, include: { adminUser: true } });
  if (!session) return null;

  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { id } }).catch(() => {});
    return null;
  }

  const expectedHash = Buffer.from(session.tokenHash, 'hex');
  const actualHash = Buffer.from(sha256(rawToken), 'hex');
  if (expectedHash.length !== actualHash.length || !crypto.timingSafeEqual(expectedHash, actualHash)) {
    return null;
  }

  return session.adminUser;
}

export async function destroySessionCookie(cookieValue) {
  if (!cookieValue || !cookieValue.includes('.')) return;
  const [id] = cookieValue.split('.');
  await prisma.session.delete({ where: { id } }).catch(() => {});
}

export function sessionCookieOptions(expiresAt) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    expires: expiresAt,
  };
}

/**
 * The authoritative admin check. Middleware only does a cheap "cookie present?" gate —
 * this is what actually verifies the session against the database and must be called
 * from every /api/admin/* route handler and from the protected admin layout.
 */
export async function getCurrentAdmin() {
  const cookieStore = cookies();
  const raw = cookieStore.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  return verifySessionCookie(raw);
}

export async function logAudit({ adminUserId, action, targetType, targetId, detail }) {
  await prisma.auditLog.create({
    data: { adminUserId: adminUserId ?? null, action, targetType, targetId: String(targetId), detail: detail ? JSON.stringify(detail) : null },
  });
}
