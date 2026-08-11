/**
 * WhatsApp Business confirmations, via Meta's WhatsApp Cloud API.
 *
 * Sending automated WhatsApp messages requires a verified Meta Business, a WhatsApp
 * Business Platform app with a registered phone number, and pre-approved message
 * templates for every template name below (Meta rejects unknown/unapproved templates —
 * business-initiated messages outside a 24h customer-service window MUST use one).
 * None of that can be provisioned from code. See README.md for the setup steps and the
 * exact template copy to submit for approval.
 */
const GRAPH_API_VERSION = 'v21.0';

// One entry per templateName used at the call sites (app/api/leads/*.js) — paramsOrder
// must match the {{1}}, {{2}}... placeholder order in the template body approved on Meta.
const TEMPLATES = {
  lead_confirmation: { paramsOrder: ['name'] },
  company_confirmation: { paramsOrder: ['company'] },
};

// Côte d'Ivoire only: local numbers are 10 digits starting with 0 (e.g. 0700000000).
// E.164 for the API drops that leading 0 and prepends the 225 country code, no '+'.
// Strips any existing 225 prefix first so "+225 07 00…" (country code AND the leading
// 0 — a common input mistake) normalizes the same as a plain local number.
function toIvorianE164(raw) {
  let digits = String(raw).replace(/\D/g, '');
  if (digits.startsWith('225')) digits = digits.slice(3);
  return `225${digits.replace(/^0/, '')}`;
}

export async function sendWhatsAppConfirmation({ to, templateName, params }) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    console.warn(`[whatsapp] Non configuré — message simulé vers ${to} (template "${templateName}"). Nécessite un compte WhatsApp Business Platform.`);
    return { sent: false, reason: 'not_configured' };
  }

  const template = TEMPLATES[templateName];
  if (!template) {
    console.error(`[whatsapp] Template inconnu : "${templateName}" — l'ajouter à TEMPLATES dans lib/whatsapp.js.`);
    return { sent: false, reason: 'unknown_template' };
  }

  const parameters = template.paramsOrder.map((key) => ({ type: 'text', text: String(params?.[key] ?? '') }));

  try {
    const res = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: toIvorianE164(to),
        type: 'template',
        template: {
          name: templateName,
          language: { code: 'fr' },
          components: parameters.length ? [{ type: 'body', parameters }] : undefined,
        },
      }),
    });
    if (!res.ok) {
      console.error('[whatsapp] Échec envoi', res.status, await res.text().catch(() => ''));
      return { sent: false, reason: 'provider_error' };
    }
    return { sent: true };
  } catch (err) {
    console.error('[whatsapp] Erreur réseau', err);
    return { sent: false, reason: 'network_error' };
  }
}
