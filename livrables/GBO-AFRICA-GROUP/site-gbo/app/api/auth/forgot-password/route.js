import { NextResponse, after } from 'next/server';
import { prisma } from '../../../../lib/db.js';
import { forgotPasswordSchema, parseOrError } from '../../../../lib/validation.js';
import { getClientIp, isSameOrigin, formRateLimit } from '../../../../lib/security.js';
import { createPasswordResetToken, logAudit } from '../../../../lib/auth.js';
import { sendEmail, escapeHtml } from '../../../../lib/email.js';
import { SITE_URL, SITE_NAME } from '../../../../lib/site.js';

// Couvre admin ET nutrition_partner (même table AdminUser, voir lib/auth.js).
// Toujours la même réponse générique, que l'adresse corresponde à un compte ou non — ne
// jamais révéler si une adresse existe (même raisonnement que le login, voir lib/auth.js
// DUMMY_PASSWORD_HASH).
export async function POST(request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const ip = getClientIp(request);
  const { allowed } = await formRateLimit('forgot-password', ip, { max: 5, windowMs: 10 * 60 * 1000 });
  if (!allowed) return NextResponse.json({ error: 'Trop de tentatives. Réessayez plus tard.' }, { status: 429 });

  const body = await request.json().catch(() => null);
  const parsed = parseOrError(forgotPasswordSchema, body || {});
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const admin = await prisma.adminUser.findUnique({ where: { email: parsed.data.email } });

  if (admin) {
    const tokenValue = await createPasswordResetToken(admin.id);
    const resetUrl = `${SITE_URL}/admin/reinitialiser-mot-de-passe?token=${encodeURIComponent(tokenValue)}`;

    // Détaché de la réponse (comme les e-mails de confirmation de lead, voir
    // app/api/leads/route.js) : le visiteur n'attend pas l'appel réseau à Resend, et ça
    // garde le temps de réponse identique que le compte existe ou non.
    after(async () => {
      await sendEmail({
        to: admin.email,
        subject: `Réinitialisation de votre mot de passe — ${SITE_NAME}`,
        html: `<p>Une demande de réinitialisation de mot de passe a été faite pour votre compte ${escapeHtml(SITE_NAME)}.</p><p><a href="${resetUrl}">Choisir un nouveau mot de passe</a></p><p>Ce lien expire dans 1 heure. Si vous n'êtes pas à l'origine de cette demande, ignorez cet e-mail.</p>`,
      });
    });

    await logAudit({ adminUserId: admin.id, action: 'password_reset_requested', targetType: 'AdminUser', targetId: admin.id });
  }

  return NextResponse.json({ ok: true });
}
