import { NextResponse, after } from 'next/server';
import { prisma } from '../../../../../lib/db.js';
import { forgotPasswordSchema, parseOrError } from '../../../../../lib/validation.js';
import { getClientIp, isSameOrigin, formRateLimit } from '../../../../../lib/security.js';
import { createCoachPasswordResetToken } from '../../../../../lib/coachAuth.js';
import { logAudit } from '../../../../../lib/auth.js';
import { sendEmail, escapeHtml } from '../../../../../lib/email.js';
import { SITE_URL, SITE_NAME } from '../../../../../lib/site.js';

// Toujours la même réponse générique, que l'adresse corresponde à un compte ou non —
// voir app/api/auth/forgot-password/route.js pour le même raisonnement côté admin.
export async function POST(request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const ip = getClientIp(request);
  const { allowed } = await formRateLimit('coach-forgot-password', ip, { max: 5, windowMs: 10 * 60 * 1000 });
  if (!allowed) return NextResponse.json({ error: 'Trop de tentatives. Réessayez plus tard.' }, { status: 429 });

  const body = await request.json().catch(() => null);
  const parsed = parseOrError(forgotPasswordSchema, body || {});
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const coach = await prisma.coachAccount.findUnique({ where: { email: parsed.data.email } });

  if (coach && coach.actif) {
    const tokenValue = await createCoachPasswordResetToken(coach.id);
    const resetUrl = `${SITE_URL}/coach/reinitialiser-mot-de-passe?token=${encodeURIComponent(tokenValue)}`;

    after(async () => {
      await sendEmail({
        to: coach.email,
        subject: `Réinitialisation de votre mot de passe — ${SITE_NAME}`,
        html: `<p>Une demande de réinitialisation de mot de passe a été faite pour votre espace coach ${escapeHtml(SITE_NAME)}.</p><p><a href="${resetUrl}">Choisir un nouveau mot de passe</a></p><p>Ce lien expire dans 1 heure. Si vous n'êtes pas à l'origine de cette demande, ignorez cet e-mail.</p>`,
      });
    });

    await logAudit({ adminUserId: null, action: 'coach_password_reset_requested', targetType: 'CoachAccount', targetId: coach.id });
  } else {
    // Camoufle le temps de réponse d'une adresse inconnue/inactive par le même travail de
    // base de données que la branche ci-dessus — voir app/api/auth/forgot-password/route.js.
    await createCoachPasswordResetToken(-1).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
