import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db.js';
import { getCurrentCoach } from '../../../../lib/coachAuth.js';

export async function GET() {
  const coach = await getCurrentCoach();
  if (!coach) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const notifications = await prisma.notification.findMany({
    where: { coachAccountId: coach.id },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  return NextResponse.json({ notifications });
}
