import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db.js';
import { clientChangePasswordSchema, parseOrError } from '../../../../lib/validation.js';
import { isSameOrigin } from '../../../../lib/security.js';
import { verifyPassword, hashPassword, logAudit } from '../../../../lib/auth.js';
import { getCurrentClient } from '../../../../lib/clientAuth.js';

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
  await logAudit({ adminUserId: null, action: 'client_password_changed', targetType: 'ClientAccount', targetId: client.id });

  return NextResponse.json({ ok: true });
}
