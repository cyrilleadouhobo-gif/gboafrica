import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db.js';
import { getCurrentStaffAdmin } from '../../../../lib/auth.js';

export async function GET() {
  const admin = await getCurrentStaffAdmin();
  if (!admin) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const seances = await prisma.seance.findMany({
    include: {
      clientAccount: { include: { lead: { select: { name: true } } } },
      coachAccount: { include: { coach: { select: { name: true } } } },
    },
    orderBy: { datePrevue: 'desc' },
    take: 100,
  });

  return NextResponse.json({ seances });
}
