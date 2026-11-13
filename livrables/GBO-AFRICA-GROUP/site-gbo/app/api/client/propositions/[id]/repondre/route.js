import { NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/db.js';
import { getCurrentClient } from '../../../../../../lib/clientAuth.js';
import { isSameOrigin } from '../../../../../../lib/security.js';
import { logAudit } from '../../../../../../lib/auth.js';
import { clientRepondPropositionSchema, parseOrError } from '../../../../../../lib/validation.js';
import { clientRepondProposition } from '../../../../../../lib/seanceReattribution.js';

export async function POST(request, { params }) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) return NextResponse.json({ error: 'Identifiant invalide.' }, { status: 400 });

  const body = await request.json().catch(() => null);
  const parsed = parseOrError(clientRepondPropositionSchema, body || {});
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const proposition = await prisma.propositionCoach.findUnique({ where: { id }, include: { seance: true } });
  if (!proposition || proposition.seance.clientAccountId !== client.id) {
    return NextResponse.json({ error: 'Proposition introuvable.' }, { status: 404 });
  }

  try {
    await prisma.$transaction((tx) =>
      clientRepondProposition(tx, proposition, proposition.seance, { reponse: parsed.data.reponse, motif: parsed.data.motif, modifiePar: `client:${client.id}` })
    );
  } catch (err) {
    if (err.message === 'DEJA_TRAITEE') {
      return NextResponse.json({ error: 'Cette proposition a déjà été traitée.' }, { status: 409 });
    }
    throw err;
  }

  await logAudit({ adminUserId: null, action: 'client_repond_proposition', targetType: 'PropositionCoach', targetId: id, detail: { reponse: parsed.data.reponse } });

  return NextResponse.json({ ok: true });
}
