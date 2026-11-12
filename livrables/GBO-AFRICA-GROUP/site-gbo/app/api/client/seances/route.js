import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db.js';
import { getCurrentClient } from '../../../../lib/clientAuth.js';

// RG01 — un client ne voit que ses propres séances.
export async function GET() {
  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const seances = await prisma.seance.findMany({
    where: { clientAccountId: client.id },
    include: { coachAccount: { include: { coach: { select: { name: true } } } } },
    orderBy: { datePrevue: 'asc' },
  });

  return NextResponse.json({ seances });
}
