import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db.js';
import { clientChangePasswordSchema, parseOrError } from '../../../../lib/validation.js';
import { getClientIp, isSameOrigin } from '../../../../lib/security.js';
import { verifyPassword, hashPassword, logAudit } from '../../../../lib/auth.js';
import { getCurrentClient, createClientSession, clientSessionCookieOptions, CLIENT_SESSION_COOKIE } from '../../../../lib/clientAuth.js';

export async function POST(request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = parseOrError(clientChangePasswordSchema, body || {});
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const valid = await verifyPassword(parsed.data.currentPassword, client.passwordHash);
  if (!valid) return NextResponse.json({ error: 'Mot de passe actuel incorrect.' }, { status: 401 });

  const passwordHash = await hashPassword(parsed.data.newPassword);
  await prisma.clientAccount.update({ where: { id: client.id }, data: { passwordHash, mustChangePassword: false } });

  // Révoque toute autre session active sur ce compte (ex. appareil volé/partagé) — sans ça,
  // un changement de mot de passe ne protégeait pas contre une session déjà ouverte ailleurs,
  // qui restait valable jusqu'à son expiration naturelle (7 jours). On réémet immédiatement
  // une session pour cet appareil-ci afin que l'utilisateur ne soit pas déconnecté lui-même.
  await prisma.clientSession.deleteMany({ where: { clientAccountId: client.id } });
  const { cookieValue, expiresAt } = await createClientSession(client.id, { userAgent: request.headers.get('user-agent'), ip: getClientIp(request) });

  await logAudit({ adminUserId: null, action: 'client_password_changed', targetType: 'ClientAccount', targetId: client.id });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(CLIENT_SESSION_COOKIE, cookieValue, clientSessionCookieOptions(expiresAt));
  return response;
}
