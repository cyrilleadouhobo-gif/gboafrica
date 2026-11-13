import { NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/db.js';
import { getCurrentStaffAdmin, logAudit } from '../../../../../../lib/auth.js';
import { isSameOrigin } from '../../../../../../lib/security.js';
import { proposerCoachSchema, parseOrError } from '../../../../../../lib/validation.js';
import { proposerCoach, buildClientDossier } from '../../../../../../lib/seanceReattribution.js';

export async function POST(request, { params }) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const admin = await getCurrentStaffAdmin();
  if (!admin) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) return NextResponse.json({ error: 'Identifiant invalide.' }, { status: 400 });

  const body = await request.json().catch(() => null);
  const parsed = parseOrError(proposerCoachSchema, body || {});
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const seance = await prisma.seance.findUnique({ where: { id } });
  if (!seance) return NextResponse.json({ error: 'Séance introuvable.' }, { status: 404 });

  const clientDossier = await buildClientDossier(prisma, seance.clientAccountId);

  try {
    const proposition = await prisma.$transaction((tx) =>
      proposerCoach(tx, seance, parsed.data.coachAccountId, { modifiePar: `admin:${admin.id}`, clientDossier })
    );
    await logAudit({ adminUserId: admin.id, action: 'coach_propose', targetType: 'Seance', targetId: id, detail: { coachAccountId: parsed.data.coachAccountId } });
    return NextResponse.json({ proposition });
  } catch (err) {
    if (err.message === 'PAS_EN_REATTRIBUTION') {
      return NextResponse.json({ error: "Cette séance n'est pas en attente de réattribution." }, { status: 409 });
    }
    if (err.message === 'PROPOSITION_EN_COURS') {
      return NextResponse.json({ error: 'Une proposition est déjà en cours pour cette séance.' }, { status: 409 });
    }
    if (err.message === 'COACH_NON_CANDIDAT') {
      return NextResponse.json({ error: "Ce coach n'est plus disponible sur ce créneau." }, { status: 409 });
    }
    if (err.message === 'COACH_INTROUVABLE') {
      return NextResponse.json({ error: 'Coach introuvable.' }, { status: 404 });
    }
    throw err;
  }
}
