import { NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/db.js';
import { getCurrentClient } from '../../../../../../lib/clientAuth.js';
import { isSameOrigin } from '../../../../../../lib/security.js';
import { logAudit } from '../../../../../../lib/auth.js';
import { annulerSeanceSchema, parseOrError } from '../../../../../../lib/validation.js';
import { annulerParClient } from '../../../../../../lib/seanceAnnulation.js';

export async function POST(request, { params }) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) return NextResponse.json({ error: 'Identifiant invalide.' }, { status: 400 });

  const body = await request.json().catch(() => null);
  const parsed = parseOrError(annulerSeanceSchema, body || {});
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const seance = await prisma.seance.findUnique({ where: { id } });
  if (!seance || seance.clientAccountId !== client.id) {
    return NextResponse.json({ error: 'Séance introuvable.' }, { status: 404 });
  }
  if (seance.statut !== 'PLANIFIEE') {
    return NextResponse.json({ error: 'Cette séance ne peut plus être annulée.' }, { status: 409 });
  }

  const { dansLeDelai } = await prisma.$transaction((tx) =>
    annulerParClient(tx, seance, { motif: parsed.data.motif, modifiePar: `client:${client.id}` })
  );

  await logAudit({ adminUserId: null, action: 'seance_annulee', targetType: 'Seance', targetId: id, detail: { par: 'CLIENT', dansLeDelai } });

  return NextResponse.json({ ok: true, decomptee: !dansLeDelai });
}
