import { NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/db.js';
import { getCurrentClient } from '../../../../../../lib/clientAuth.js';
import { isSameOrigin } from '../../../../../../lib/security.js';
import { logAudit } from '../../../../../../lib/auth.js';
import { reporterSeanceSchema, parseOrError } from '../../../../../../lib/validation.js';
import { reporterSeance, estDansLeDelai } from '../../../../../../lib/seanceAnnulation.js';

export async function POST(request, { params }) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) return NextResponse.json({ error: 'Identifiant invalide.' }, { status: 400 });

  const body = await request.json().catch(() => null);
  const parsed = parseOrError(reporterSeanceSchema, body || {});
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const seance = await prisma.seance.findUnique({ where: { id } });
  if (!seance || seance.clientAccountId !== client.id) {
    return NextResponse.json({ error: 'Séance introuvable.' }, { status: 404 });
  }
  if (seance.statut !== 'PLANIFIEE') {
    return NextResponse.json({ error: 'Cette séance ne peut plus être reportée.' }, { status: 409 });
  }
  if (!estDansLeDelai(seance.datePrevue)) {
    return NextResponse.json({ error: 'Trop tard pour reporter cette séance (moins de 24h avant l\'horaire prévu). Contactez votre coach.' }, { status: 409 });
  }

  try {
    await prisma.$transaction((tx) =>
      reporterSeance(tx, seance, { motif: parsed.data.motif, nouvelleDatePrevue: parsed.data.nouvelleDatePrevue, modifiePar: `client:${client.id}` })
    );
  } catch (err) {
    if (err.message === 'CONFLICT') {
      return NextResponse.json({ error: 'Votre coach a déjà une séance prévue à ce créneau.' }, { status: 409 });
    }
    if (err.message === 'TROP_DE_REPORTS') {
      return NextResponse.json({ error: 'Cette séance a déjà été reportée 2 fois. Contactez votre coach directement pour aller plus loin.' }, { status: 409 });
    }
    throw err;
  }

  await logAudit({ adminUserId: null, action: 'seance_reportee', targetType: 'Seance', targetId: id, detail: { par: 'CLIENT' } });

  return NextResponse.json({ ok: true });
}
