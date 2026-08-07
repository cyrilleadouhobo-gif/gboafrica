/**
 * WhatsApp Business confirmations — NOT operational, by necessity, not oversight.
 *
 * Sending automated WhatsApp messages requires a Meta Business verification, an
 * approved WhatsApp Business Account, a registered phone number and pre-approved
 * message templates (see PRD §10.2). None of that can be provisioned from code.
 *
 * This function exists so the call sites (lead creation, waitlist, etc.) already have
 * the right shape wired in. Once GBÔ has a WhatsApp Business Platform account (directly
 * with Meta, or via a BSP like 360dialog/Twilio), fill in the fetch call below with the
 * provider's send-message endpoint and add WHATSAPP_TOKEN / WHATSAPP_PHONE_ID to env.
 */
export async function sendWhatsAppConfirmation({ to, templateName, params }) {
  const token = process.env.WHATSAPP_TOKEN;

  if (!token) {
    console.warn(`[whatsapp] Non configuré — message simulé vers ${to} (template "${templateName}"). Nécessite un compte WhatsApp Business Platform.`);
    return { sent: false, reason: 'not_configured' };
  }

  // TODO once a WhatsApp Business Platform account exists: call the provider's API here.
  console.warn('[whatsapp] Token présent mais intégration non implémentée — voir lib/whatsapp.js.');
  return { sent: false, reason: 'not_implemented' };
}
