import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db.js';
import { getCurrentAdmin } from '../../../../lib/auth.js';

export async function GET(request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const type = request.nextUrl.searchParams.get('type');
  const where = type && type !== 'Tous' ? { type } : {};

  const leads = await prisma.lead.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: { coach: { select: { name: true } } },
  });

  return NextResponse.json({ leads });
}
