import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db.js';
import { companyLeadSchema, parseOrError } from '../../../../lib/validation.js';
import { getClientIp, isSameOrigin, rateLimit, honeypotTripped } from '../../../../lib/security.js';
import { leadCode } from '../../../../lib/constants.js';
import { sendEmail } from '../../../../lib/email.js';
import { sendWhatsAppConfirmation } from '../../../../lib/whatsapp.js';

export async function POST(request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });
  }

  const ip = getClientIp(request);
  const { allowed } = await rateLimit(`leads-company:${ip}`, { max: 5, windowMs: 10 * 60 * 1000 });
  if (!allowed) return NextResponse.json({ error: 'Trop de demandes. Réessayez dans quelques minutes.' }, { status: 429 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 });
  if (honeypotTripped(body.website)) return NextResponse.json({ ok: true });

  const parsed = parseOrError(companyLeadSchema, body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const d = parsed.data;

  const created = await prisma.lead.create({
    data: {
      code: 'TEMP',
      type: 'ENTREPRISE',
      name: d.entreprise,
      objective: d.besoin || 'Solution corporate',
      profile: '—',
      source: 'Corporate',
      status: 'NOUVEAU',
      commune: '—',
      contactEmail: d.email,
      contactPhone: d.tel,
      contactName: d.contact,
      consentAt: new Date(),
    },
  });
  const lead = await prisma.lead.update({ where: { id: created.id }, data: { code: leadCode('ENTREPRISE', created.id) } });

  await sendEmail({
    to: d.email,
    subject: 'GBÔ AFRICA GROUP — Votre demande entreprise',
    html: `<p>Bonjour,</p><p>Votre demande pour <strong>${d.entreprise}</strong> a bien été reçue. Un conseiller Entreprise GBÔ vous recontacte pour établir une proposition sur mesure.</p>`,
  });
  await sendWhatsAppConfirmation({ to: d.tel, templateName: 'company_confirmation', params: { company: d.entreprise } });

  return NextResponse.json({ ok: true, code: lead.code });
}
