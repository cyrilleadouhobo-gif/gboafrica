import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db.js';
import { getCurrentNutritionPartner } from '../../../../../lib/auth.js';

// Data minimization: only the fields the partner actually needs to run the follow-up are
// selected here — never the full Lead row (no GBÔ CRM status, no source, no coach, no
// commune). The partner is a third party handling personal health-adjacent data.
export async function GET() {
  const partner = await getCurrentNutritionPartner();
  if (!partner) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const followUps = await prisma.nutritionFollowUp.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      lead: {
        select: { id: true, name: true, contactEmail: true, contactPhone: true, nutritionObjective: true },
      },
    },
  });

  return NextResponse.json({ clients: followUps });
}
