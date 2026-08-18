import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db.js';
import { particulierLeadSchema, parseOrError } from '../../../lib/validation.js';
import { getClientIp, isSameOrigin, rateLimit, honeypotTripped } from '../../../lib/security.js';
import { leadCode } from '../../../lib/constants.js';
import { sendEmail } from '../../../lib/email.js';
import { sendWhatsAppConfirmation } from '../../../lib/whatsapp.js';

const PROFILE_LABELS = { adulte: 'Adulte', femme: 'Femme', enceinte: 'Femme enceinte', maman: 'Nouvelle maman', senior: 'Senior' };

export async function POST(request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });
  }

  const ip = getClientIp(request);
  const { allowed } = await rateLimit(`leads:${ip}`, { max: 5, windowMs: 10 * 60 * 1000 });
  if (!allowed) {
    return NextResponse.json({ error: 'Trop de demandes. Réessayez dans quelques minutes.' }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 });
  if (honeypotTripped(body.website)) {
    return NextResponse.json({ ok: true }); // silently accept — don't tip off the bot
  }

  const parsed = parseOrError(particulierLeadSchema, body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const d = parsed.data;

  const created = await prisma.lead.create({
    data: {
      code: 'TEMP',
      type: 'PARTICULIER',
      name: `${d.prenom} ${d.nom}`.trim(),
      objective: d.objective,
      profile: PROFILE_LABELS[d.profile] || d.profile,
      source: 'Tunnel Particulier',
      status: 'NOUVEAU',
      commune: d.commune || '—',
      practiceLocation: d.practiceLocation || null,
      contactEmail: d.email,
      contactPhone: d.tel,
      nutrition: d.nutrition === 'oui',
      nutritionObjective: d.nutrition === 'oui' ? d.nutritionObj || null : null,
      consentAt: new Date(),
    },
  });
  const lead = await prisma.lead.update({ where: { id: created.id }, data: { code: leadCode('PARTICULIER', created.id) } });

  await sendEmail({
    to: d.email,
    subject: 'GBÔ AFRICA GROUP — Votre demande est enregistrée',
    html: `<p>Bonjour ${d.prenom},</p><p>Votre demande d'accompagnement a bien été enregistrée. Un conseiller GBÔ vous contactera rapidement afin de préparer votre premier bilan.</p>`,
  });
  await sendWhatsAppConfirmation({ to: d.tel, templateName: 'lead_confirmation', params: { name: d.prenom } });

  return NextResponse.json({ ok: true, code: lead.code });
}
