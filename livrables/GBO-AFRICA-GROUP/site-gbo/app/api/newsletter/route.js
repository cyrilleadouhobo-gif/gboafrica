import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db.js';
import { newsletterSchema, parseOrError } from '../../../lib/validation.js';
import { getClientIp, isSameOrigin, rateLimit, honeypotTripped } from '../../../lib/security.js';
import { sendEmail } from '../../../lib/email.js';

export async function POST(request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const ip = getClientIp(request);
  const { allowed } = await rateLimit(`newsletter:${ip}`, { max: 8, windowMs: 10 * 60 * 1000 });
  if (!allowed) return NextResponse.json({ error: 'Trop de demandes. Réessayez dans quelques minutes.' }, { status: 429 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 });
  if (honeypotTripped(body.website)) return NextResponse.json({ ok: true });

  const parsed = parseOrError(newsletterSchema, body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const d = parsed.data;

  const existing = await prisma.message.findFirst({ where: { type: 'NEWSLETTER', email: d.email } });
  if (!existing) {
    await prisma.message.create({ data: { type: 'NEWSLETTER', email: d.email } });
  }
  await sendEmail({
    to: d.email,
    subject: 'Confirmez votre inscription à la newsletter GBÔ',
    html: `<p>Merci de votre intérêt — cliquez pour confirmer votre inscription (double opt-in) [lien à intégrer une fois le fournisseur e-mail branché].</p>`,
  });

  return NextResponse.json({ ok: true });
}
