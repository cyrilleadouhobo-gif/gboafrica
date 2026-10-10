import { NextResponse, after } from 'next/server';
import { prisma } from '../../../lib/db.js';
import { reviewSchema, parseOrError } from '../../../lib/validation.js';
import { getClientIp, isSameOrigin, formRateLimit, honeypotTripped } from '../../../lib/security.js';
import { sendEmail } from '../../../lib/email.js';
import { CONTACT_EMAIL, SITE_URL } from '../../../lib/site.js';

export async function POST(request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const ip = getClientIp(request);
  const { allowed } = await formRateLimit('reviews', ip, { max: 5, windowMs: 60 * 60 * 1000 });
  if (!allowed) return NextResponse.json({ error: 'Trop de demandes. Réessayez plus tard.' }, { status: 429 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 });
  if (honeypotTripped(body.website)) return NextResponse.json({ ok: true });

  const parsed = parseOrError(reviewSchema, body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const d = parsed.data;

  // Never published immediately — an admin validates every review before it goes public.
  const review = await prisma.review.create({
    data: { authorName: d.authorName, context: d.context || null, rating: d.rating, comment: d.comment, status: 'PENDING' },
  });

  // Notification interne — jusqu'ici un avis arrivait sans prévenir personne, invisible
  // tant qu'un admin n'allait pas vérifier le back-office manuellement.
  after(async () => {
    await sendEmail({
      to: CONTACT_EMAIL,
      subject: `Nouvel avis à modérer — ${d.authorName}`,
      html: `<p><strong>${d.authorName}</strong>${d.context ? ` · ${d.context}` : ''} — ${d.rating}/5</p><p>${d.comment}</p><p><a href="${SITE_URL}/admin">Voir dans le back-office</a></p>`,
    });
  });

  return NextResponse.json({ ok: true, id: review.id });
}
