import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db.js';
import { contactSchema, parseOrError } from '../../../lib/validation.js';
import { getClientIp, isSameOrigin, rateLimit, honeypotTripped } from '../../../lib/security.js';
import { sendEmail } from '../../../lib/email.js';

export async function POST(request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const ip = getClientIp(request);
  const { allowed } = await rateLimit(`contact:${ip}`, { max: 5, windowMs: 10 * 60 * 1000 });
  if (!allowed) return NextResponse.json({ error: 'Trop de demandes. Réessayez dans quelques minutes.' }, { status: 429 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 });
  if (honeypotTripped(body.website)) return NextResponse.json({ ok: true });

  const parsed = parseOrError(contactSchema, body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const d = parsed.data;

  await prisma.message.create({ data: { type: 'CONTACT', name: d.nom, email: d.email, phone: d.tel, body: d.msg } });
  await sendEmail({ to: 'contact@gboafrica.com', subject: `Nouveau message de ${d.nom}`, html: `<p>${d.msg}</p><p>Contact : ${d.email} / ${d.tel}</p>` });

  return NextResponse.json({ ok: true });
}
