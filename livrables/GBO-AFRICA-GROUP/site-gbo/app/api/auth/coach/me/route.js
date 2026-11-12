import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db.js';
import { getCurrentCoach } from '../../../../../lib/coachAuth.js';

export async function GET() {
  const coach = await getCurrentCoach();
  if (!coach) return NextResponse.json({ coach: null }, { status: 401 });

  const coachProfile = await prisma.coach.findUnique({ where: { id: coach.coachId }, select: { name: true } });
  return NextResponse.json({ coach: { email: coach.email, name: coachProfile?.name || null } });
}
