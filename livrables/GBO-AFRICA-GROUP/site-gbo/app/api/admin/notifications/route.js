import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db.js';
import { getCurrentStaffAdmin } from '../../../../lib/auth.js';

// Notifications destinées à l'admin : clientAccountId et coachAccountId restent null,
// canal:'admin' les distingue des notifications client/coach (lib/seanceAnnulation.js).
export async function GET() {
  const admin = await getCurrentStaffAdmin();
  if (!admin) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const notifications = await prisma.notification.findMany({
    where: { canal: 'admin' },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  return NextResponse.json({ notifications });
}
