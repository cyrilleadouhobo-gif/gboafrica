import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db.js';
import { getCurrentStaffAdmin } from '../../../../lib/auth.js';

export async function GET() {
  const admin = await getCurrentStaffAdmin();
  if (!admin) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const reviews = await prisma.review.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ reviews });
}
