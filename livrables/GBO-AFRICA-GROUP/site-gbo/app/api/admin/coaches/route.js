import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db.js';
import { getCurrentAdmin } from '../../../../lib/auth.js';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const coaches = await prisma.coach.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json({ coaches });
}
