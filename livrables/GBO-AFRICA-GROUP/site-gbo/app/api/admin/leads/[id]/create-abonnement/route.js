import { NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/db.js';
import { getCurrentStaffAdmin, logAudit } from '../../../../../../lib/auth.js';
import { isSameOrigin } from '../../../../../../lib/security.js';
import { createAbonnementSchema, parseOrError } from '../../../../../../lib/validation.js';

export async function POST(request, { params }) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const admin = await getCurrentStaffAdmin();
  if (!admin) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) return NextResponse.json({ error: 'Identifiant invalide.' }, { status: 400 });

  const body = await request.json().catch(() => null);
  const parsed = parseOrError(createAbonnementSchema, body || {});
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const lead = await prisma.lead.findUnique({ where: { id }, include: { clientAccount: true } });
  if (!lead) return NextResponse.json({ error: 'Prospect introuvable.' }, { status: 404 });
  if (!lead.clientAccount) return NextResponse.json({ error: "Ce client n'a pas encore de compte — créez-le d'abord." }, { status: 409 });

  const formule = await prisma.formule.findUnique({ where: { id: parsed.data.formuleId } });
  if (!formule || !formule.actif) return NextResponse.json({ error: 'Formule introuvable ou désactivée.' }, { status: 404 });

  const now = new Date();
  const expireLe = new Date(now.getTime() + formule.dureeJours * 24 * 60 * 60 * 1000);

  // Vérification et création dans une transaction : deux requêtes simultanées (double-clic,
  // deux onglets admin) ne doivent pas pouvoir créer deux abonnements actifs pour le même client.
  try {
    const abonnement = await prisma.$transaction(async (tx) => {
      const existingActif = await tx.abonnement.findFirst({ where: { clientAccountId: lead.clientAccount.id, statut: 'ACTIF' } });
      if (existingActif) throw new Error('DEJA_ACTIF');

      return tx.abonnement.create({
        data: {
          clientAccountId: lead.clientAccount.id,
          formuleId: formule.id,
          seancesRestantes: formule.nbSeances,
          statut: 'ACTIF',
          demarreLe: now,
          expireLe,
        },
        include: { formule: true, paiements: true },
      });
    });

    await logAudit({ adminUserId: admin.id, action: 'abonnement_created', targetType: 'Abonnement', targetId: abonnement.id, detail: { leadId: id, formule: formule.nom } });

    return NextResponse.json({ abonnement });
  } catch (err) {
    if (err.message === 'DEJA_ACTIF') {
      return NextResponse.json({ error: 'Ce client a déjà un abonnement actif.' }, { status: 409 });
    }
    throw err;
  }
}
