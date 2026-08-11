import { NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/db.js';
import { getCurrentStaffAdmin, logAudit } from '../../../../../../lib/auth.js';
import { isSameOrigin } from '../../../../../../lib/security.js';
import { sendEmail } from '../../../../../../lib/email.js';
import { SITE_URL } from '../../../../../../lib/site.js';

// Deliberate one-way gate: this is the only place a NutritionFollowUp row gets created,
// and it requires a staff admin. Before this runs, the lead is invisible to the partner —
// see app/api/partner/nutrition/clients/route.js, which only ever reads this table.
export async function POST(request, { params }) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const admin = await getCurrentStaffAdmin();
  if (!admin) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) return NextResponse.json({ error: 'Identifiant invalide.' }, { status: 400 });

  const lead = await prisma.lead.findUnique({ where: { id }, include: { nutritionFollowUp: true } });
  if (!lead) return NextResponse.json({ error: 'Prospect introuvable.' }, { status: 404 });
  if (!lead.nutrition) return NextResponse.json({ error: "Ce prospect n'a pas demandé de suivi nutritionnel." }, { status: 400 });
  if (lead.nutritionFollowUp) return NextResponse.json({ error: 'Déjà transmis au partenaire.' }, { status: 409 });

  const followUp = await prisma.nutritionFollowUp.create({ data: { leadId: id, status: 'NOUVEAU' } });
  await logAudit({ adminUserId: admin.id, action: 'nutrition_handoff', targetType: 'Lead', targetId: id, detail: { followUpId: followUp.id } });

  // Best-effort notification — the handoff itself already succeeded above, so a delivery
  // failure here must never turn a successful transmission into an error response.
  const partner = await prisma.adminUser.findFirst({ where: { role: 'nutrition_partner' } });
  if (partner) {
    await sendEmail({
      to: partner.email,
      subject: 'GBÔ AFRICA GROUP — Nouveau client à suivre',
      html: `
        <p>Bonjour,</p>
        <p>Un nouveau client vous a été transmis par GBÔ AFRICA GROUP pour un suivi nutritionnel :</p>
        <ul>
          <li><strong>Nom :</strong> ${lead.name}</li>
          <li><strong>E-mail :</strong> ${lead.contactEmail || '—'}</li>
          <li><strong>Téléphone :</strong> ${lead.contactPhone || '—'}</li>
          <li><strong>Objectif :</strong> ${lead.nutritionObjective || '—'}</li>
        </ul>
        <p><a href="${SITE_URL}/partenaires/nutrition">Voir dans votre espace partenaire</a></p>
      `,
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
