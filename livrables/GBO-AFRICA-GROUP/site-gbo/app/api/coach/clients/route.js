import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db.js';
import { getCurrentCoach } from '../../../../lib/coachAuth.js';

// RG02 — un coach ne voit que les clients qui lui sont attribués (Lead.coachId), jamais
// l'ensemble de la base clients.
export async function GET() {
  const coach = await getCurrentCoach();
  if (!coach) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const leads = await prisma.lead.findMany({
    where: { coachId: coach.coachId, status: 'CLIENT', clientAccount: { isNot: null } },
    select: {
      id: true,
      name: true,
      clientAccount: {
        select: {
          id: true,
          email: true,
          abonnements: { where: { statut: 'ACTIF' }, orderBy: { createdAt: 'desc' }, take: 1, include: { formule: { select: { nom: true } } } },
        },
      },
    },
    orderBy: { name: 'asc' },
  });

  const clients = leads
    .filter((l) => l.clientAccount)
    .map((l) => ({
      leadName: l.name,
      clientAccountId: l.clientAccount.id,
      email: l.clientAccount.email,
      abonnement: l.clientAccount.abonnements[0] || null,
    }));

  return NextResponse.json({ clients });
}
