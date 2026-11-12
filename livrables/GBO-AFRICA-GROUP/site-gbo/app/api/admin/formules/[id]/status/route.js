import { NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/db.js';
import { getCurrentStaffAdmin, logAudit } from '../../../../../../lib/auth.js';
import { isSameOrigin } from '../../../../../../lib/security.js';
import { formuleStatusSchema, parseOrError } from '../../../../../../lib/validation.js';

// Désactiver une formule ne la supprime pas : les abonnements déjà souscrits dessus
// restent valides (Abonnement.formuleId la référence toujours), elle disparaît juste
// des formules proposables pour un nouvel abonnement.
export async function PATCH(request, { params }) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const admin = await getCurrentStaffAdmin();
  if (!admin) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) return NextResponse.json({ error: 'Identifiant invalide.' }, { status: 400 });

  const body = await request.json().catch(() => null);
  const parsed = parseOrError(formuleStatusSchema, body || {});
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const formule = await prisma.formule.update({ where: { id }, data: { actif: parsed.data.actif } }).catch(() => null);
  if (!formule) return NextResponse.json({ error: 'Formule introuvable.' }, { status: 404 });

  await logAudit({ adminUserId: admin.id, action: 'formule_status_changed', targetType: 'Formule', targetId: id, detail: { actif: parsed.data.actif } });

  return NextResponse.json({ formule });
}
