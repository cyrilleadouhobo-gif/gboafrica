import { NextResponse, after } from 'next/server';
import { prisma } from '../../../lib/db.js';
import { particulierLeadSchema, parseOrError } from '../../../lib/validation.js';
import { getClientIp, isSameOrigin, rateLimit, honeypotTripped } from '../../../lib/security.js';
import { leadCode } from '../../../lib/constants.js';
import { sendEmail } from '../../../lib/email.js';
import { sendWhatsAppConfirmation } from '../../../lib/whatsapp.js';
import { FITNESS_EMAIL } from '../../../lib/site.js';

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
      // 'plus_infos' compte comme un intérêt (déclenche le suivi nutrition côté conseiller)
      // mais reste distinguable d'un "oui" ferme via nutritionObjective ci-dessous.
      nutrition: d.nutrition === 'oui' || d.nutrition === 'plus_infos',
      nutritionObjective:
        d.nutrition === 'oui' ? d.nutritionObj || null : d.nutrition === 'plus_infos' ? 'Souhaite en savoir plus' : null,
      availability: d.availability || null,
      comment: d.comment || null,
      consentAt: new Date(),
    },
  });
  const lead = await prisma.lead.update({ where: { id: created.id }, data: { code: leadCode('PARTICULIER', created.id) } });

  // Le prospect est déjà enregistré à ce stade — on répond tout de suite plutôt que
  // d'attendre l'e-mail/WhatsApp (appels réseau lents) avant de répondre : si le visiteur
  // ferme l'onglet ou perd sa connexion pendant cette attente, Next.js annule la requête
  // encore en cours, ce qui peut perdre le prospect malgré l'écriture déjà faite en base.
  // `after()` détache ces notifications du sort de la connexion du visiteur.
  after(async () => {
    await sendEmail({
      to: d.email,
      subject: 'GBÔ AFRICA GROUP — Votre demande est enregistrée',
      html: `<p>Bonjour ${d.prenom},</p><p>Votre demande d'accompagnement a bien été enregistrée. Un conseiller GBÔ vous contactera rapidement afin de préparer votre premier bilan.</p>`,
    });
    await sendWhatsAppConfirmation({ to: d.tel, templateName: 'lead_confirmation', params: { name: d.prenom } });
    // Notification interne — jusqu'ici ce formulaire ne prévenait personne côté GBÔ, un
    // conseiller ne pouvait le voir qu'en allant vérifier le back-office manuellement.
    await sendEmail({
      to: FITNESS_EMAIL,
      subject: `Nouveau prospect Particulier — ${lead.code}`,
      html: `<p><strong>${d.prenom} ${d.nom}</strong> · ${PROFILE_LABELS[d.profile] || d.profile}</p><p>Objectif : ${d.objective}</p><p>Contact : ${d.email} / ${d.tel}</p><p>Commune : ${d.commune || '—'}</p>`,
    });
  });

  return NextResponse.json({ ok: true, code: lead.code });
}
