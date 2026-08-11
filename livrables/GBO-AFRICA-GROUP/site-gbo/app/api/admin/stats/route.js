import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db.js';
import { getCurrentStaffAdmin } from '../../../../lib/auth.js';
import { LEAD_STATUSES } from '../../../../lib/constants.js';

export async function GET() {
  const admin = await getCurrentStaffAdmin();
  if (!admin) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const [total, byStatus, byType, recent] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.groupBy({ by: ['status'], _count: true }),
    prisma.lead.groupBy({ by: ['type'], _count: true }),
    prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 4, include: { coach: { select: { name: true } } } }),
  ]);

  const countFor = (status) => byStatus.find((s) => s.status === status)?._count || 0;
  const countType = (type) => byType.find((t) => t.type === type)?._count || 0;

  const stats = {
    total,
    nouveau: countFor('NOUVEAU') + countFor('A_CONTACTER'),
    qualifie: countFor('QUALIFIE') + countFor('COACH_ATTRIBUE'),
    client: countFor('CLIENT'),
    entreprise: countType('ENTREPRISE'),
    waitlist: countType('WAITLIST'),
  };

  const funnel = LEAD_STATUSES.slice(0, 5).map((s) => ({ status: s, n: countFor(s) }));

  return NextResponse.json({ stats, funnel, recent });
}
