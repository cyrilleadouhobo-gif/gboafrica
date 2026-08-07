/**
 * Transactional email — pluggable, not simulated.
 *
 * Without RESEND_API_KEY set, this deliberately does NOT pretend to send an email.
 * It logs what would have been sent and returns { sent: false }. Once you create a
 * free account at https://resend.com and add RESEND_API_KEY (+ EMAIL_FROM, a verified
 * sender) to your environment, real e-mails start going out with no code changes.
 */
export async function sendEmail({ to, subject, html }) {
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
      body: JSON.stringify({ from, to, subject, html }),
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
