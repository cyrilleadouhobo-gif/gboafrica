import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db.js';
import { getCurrentMember } from '../../../lib/memberAuth.js';
import { isSameOrigin } from '../../../lib/security.js';
import { memberProfileUpdateSchema, parseOrError } from '../../../lib/validation.js';

export async function GET() {
  const member = await getCurrentMember();
  if (!member) return NextResponse.json({ member: null }, { status: 401 });

  const subscription = await prisma.subscription.findUnique({ where: { memberId: member.id } });

  return NextResponse.json({
    member: { email: member.email, firstName: member.firstName, lastName: member.lastName, phone: member.phone },
    subscription: subscription ? { plan: subscription.plan, status: subscription.status, nextBillingAt: subscription.nextBillingAt } : null,
  });
}

export async function PUT(request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const member = await getCurrentMember();
  if (!member) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Corps de requête invalide.' }, { status: 400 });

  const parsed = parseOrError(memberProfileUpdateSchema, body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const d = parsed.data;

  await prisma.member.update({ where: { id: member.id }, data: { firstName: d.prenom, lastName: d.nom, phone: d.tel || null } });

  return NextResponse.json({ ok: true });
}
