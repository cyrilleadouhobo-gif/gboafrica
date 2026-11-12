import { NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/db.js';
import { getCurrentStaffAdmin, logAudit } from '../../../../../../lib/auth.js';
import { isSameOrigin } from '../../../../../../lib/security.js';
import { paiementSchema, parseOrError } from '../../../../../../lib/validation.js';

// Enregistrement manuel uniquement — pas de paiement en ligne en phase 1 (CDC, partie 5).
export async function POST(request, { params }) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const admin = await getCurrentStaffAdmin();
  if (!admin) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) return NextResponse.json({ error: 'Identifiant invalide.' }, { status: 400 });

  const body = await request.json().catch(() => null);
  const parsed = parseOrError(paiementSchema, body || {});
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const abonnement = await prisma.abonnement.findUnique({ where: { id } });
  if (!abonnement) return NextResponse.json({ error: 'Abonnement introuvable.' }, { status: 404 });

  const paiement = await prisma.paiement.create({
    data: { abonnementId: id, montant: parsed.data.montant, methode: parsed.data.methode, enregistreParAdminUserId: admin.id },
  });

  await logAudit({ adminUserId: admin.id, action: 'paiement_enregistre', targetType: 'Paiement', targetId: paiement.id, detail: { abonnementId: id, montant: parsed.data.montant, methode: parsed.data.methode } });

  return NextResponse.json({ paiement });
}
