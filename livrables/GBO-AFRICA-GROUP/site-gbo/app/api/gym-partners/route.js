import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db.js';
import { gymPartnerSchema, parseOrError } from '../../../lib/validation.js';
import { getClientIp, isSameOrigin, rateLimit, honeypotTripped } from '../../../lib/security.js';
import { gymPartnerCode } from '../../../lib/constants.js';
import { sendEmail } from '../../../lib/email.js';

export async function POST(request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const ip = getClientIp(request);
  const { allowed } = await rateLimit(`gym-partners:${ip}`, { max: 5, windowMs: 10 * 60 * 1000 });
  if (!allowed) return NextResponse.json({ error: 'Trop de demandes. Réessayez dans quelques minutes.' }, { status: 429 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 });
  if (honeypotTripped(body.website)) return NextResponse.json({ ok: true });

  const parsed = parseOrError(gymPartnerSchema, body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const d = parsed.data;

  const created = await prisma.gymPartner.create({
    data: {
      code: 'TEMP',
      gymName: d.gymName,
      managerName: d.managerName,
      phone: d.phone,
      whatsapp: d.whatsapp || null,
      email: d.email,
      commune: d.commune,
      address: d.address,
      memberCount: d.memberCount || null,
      hasSoftware: d.hasSoftware === 'oui',
      reasons: d.reasons.join(', '),
    },
  });
  const gymPartner = await prisma.gymPartner.update({ where: { id: created.id }, data: { code: gymPartnerCode(created.id) } });

  await sendEmail({
    to: 'partenariats@gboafrica.com',
    subject: `GBÔ Partner Gym — Nouvelle candidature : ${d.gymName}`,
    html: `<p>Salle : ${d.gymName}</p><p>Responsable : ${d.managerName}</p><p>Contact : ${d.phone} · ${d.email}</p><p>Adresse : ${d.address}, ${d.commune}</p><p>Raisons : ${d.reasons.join(', ') || '—'}</p>`,
  });

  return NextResponse.json({ ok: true, code: gymPartner.code });
}
