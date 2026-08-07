import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db.js';
import { waitlistSchema, parseOrError } from '../../../lib/validation.js';
import { getClientIp, isSameOrigin, rateLimit, honeypotTripped } from '../../../lib/security.js';
import { leadCode } from '../../../lib/constants.js';
import { sendEmail } from '../../../lib/email.js';

export async function POST(request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });
  }

  const ip = getClientIp(request);
  const { allowed } = await rateLimit(`waitlist:${ip}`, { max: 8, windowMs: 10 * 60 * 1000 });
  if (!allowed) return NextResponse.json({ error: 'Trop de demandes. Réessayez dans quelques minutes.' }, { status: 429 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 });
  if (honeypotTripped(body.website)) return NextResponse.json({ ok: true });

  const parsed = parseOrError(waitlistSchema, body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const d = parsed.data;

  const created = await prisma.lead.create({
    data: {
      code: 'TEMP',
      type: 'WAITLIST',
      name: d.email,
      objective: 'GBÔ ' + d.pole,
      profile: '—',
      source: "Liste d'attente",
      status: 'NOUVEAU',
      commune: '—',
      contactEmail: d.email,
      poleName: d.pole,
      consentAt: new Date(),
    },
  });
  const lead = await prisma.lead.update({ where: { id: created.id }, data: { code: leadCode('WAITLIST', created.id) } });

  await sendEmail({
    to: d.email,
    subject: `GBÔ ${d.pole} — Vous êtes sur la liste d'attente`,
    html: `<p>Merci ! Vous serez notifié en priorité à l'ouverture de GBÔ ${d.pole}.</p>`,
  });

  return NextResponse.json({ ok: true, code: lead.code });
}
