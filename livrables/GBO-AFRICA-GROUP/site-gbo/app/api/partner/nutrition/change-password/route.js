import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db.js';
import { clientChangePasswordSchema as changePasswordSchema, parseOrError } from '../../../../../lib/validation.js';
import { getClientIp, isSameOrigin } from '../../../../../lib/security.js';
import { verifyPassword, hashPassword, createSession, sessionCookieOptions, SESSION_COOKIE, logAudit, getCurrentNutritionPartner } from '../../../../../lib/auth.js';

// Le partenaire nutrition est seul à connaître son mot de passe (décision de Cyrille du
// 23/11/2026) : GBÔ ne peut pas se connecter à son espace. Même logique de révocation des
// autres sessions que app/api/client/change-password/route.js.
export async function POST(request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const partner = await getCurrentNutritionPartner();
  if (!partner) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = parseOrError(changePasswordSchema, body || {});
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const valid = await verifyPassword(parsed.data.currentPassword, partner.passwordHash);
  if (!valid) return NextResponse.json({ error: 'Mot de passe actuel incorrect.' }, { status: 401 });

  const passwordHash = await hashPassword(parsed.data.newPassword);
  await prisma.adminUser.update({ where: { id: partner.id }, data: { passwordHash } });

  await prisma.session.deleteMany({ where: { adminUserId: partner.id } });
  const { cookieValue, expiresAt } = await createSession(partner.id, { userAgent: request.headers.get('user-agent'), ip: getClientIp(request) });

  await logAudit({ adminUserId: partner.id, action: 'partner_password_changed', targetType: 'AdminUser', targetId: partner.id });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, cookieValue, sessionCookieOptions(expiresAt));
  return response;
}
