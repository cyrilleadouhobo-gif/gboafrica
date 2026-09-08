/**
 * Transactional email — pluggable, not simulated.
 *
 * Without RESEND_API_KEY set, this deliberately does NOT pretend to send an email.
 * It logs what would have been sent and returns { sent: false }. Once you create a
 * free account at https://resend.com and add RESEND_API_KEY (+ EMAIL_FROM, a verified
 * sender) to your environment, real e-mails start going out with no code changes.
 */
// `attachments`: [{ filename, content, contentType }] — `content` is a base64 string (no
// data: URI prefix). Passed straight through to Resend; see app/api/careers/route.js for
// the CV-upload use case. Resend's own cap is 40 Mo/e-mail after encodage Base64, mais la
// vraie limite pratique est le corps de requête Vercel (~4.5 Mo) — voir careerSchema.
export async function sendEmail({ to, subject, html, attachments }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    console.warn(`[email] Non configuré — e-mail simulé pour ${to}: "${subject}". Ajoute RESEND_API_KEY et EMAIL_FROM pour activer l'envoi réel.`);
    return { sent: false, reason: 'not_configured' };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        html,
        ...(attachments?.length
          ? { attachments: attachments.map((a) => ({ filename: a.filename, content: a.content, content_type: a.contentType })) }
          : {}),
      }),
    });
    if (!res.ok) {
      console.error('[email] Échec envoi', res.status, await res.text().catch(() => ''));
      return { sent: false, reason: 'provider_error' };
    }
    return { sent: true };
  } catch (err) {
    console.error('[email] Erreur réseau', err);
    return { sent: false, reason: 'network_error' };
  }
}
