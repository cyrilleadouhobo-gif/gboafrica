import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db.js';
import { getCurrentNutritionPartner } from '../../../../../lib/auth.js';

export async function GET() {
  const partner = await getCurrentNutritionPartner();
  if (!partner) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const [total, nouveau, enSuivi, aRelancer, termine] = await Promise.all([
    prisma.nutritionFollowUp.count(),
    prisma.nutritionFollowUp.count({ where: { status: 'NOUVEAU' } }),
    prisma.nutritionFollowUp.count({ where: { status: 'EN_SUIVI' } }),
    prisma.nutritionFollowUp.count({ where: { status: 'A_RELANCER' } }),
    prisma.nutritionFollowUp.count({ where: { status: 'TERMINE' } }),
  ]);

  return NextResponse.json({ stats: { total, nouveau, enSuivi, aRelancer, termine } });
}
