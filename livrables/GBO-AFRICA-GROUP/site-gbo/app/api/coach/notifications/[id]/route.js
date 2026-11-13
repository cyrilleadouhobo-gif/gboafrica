import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db.js';
import { getCurrentCoach } from '../../../../../lib/coachAuth.js';
import { isSameOrigin } from '../../../../../lib/security.js';

export async function PATCH(request, { params }) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const coach = await getCurrentCoach();
  if (!coach) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) return NextResponse.json({ error: 'Identifiant invalide.' }, { status: 400 });

  const notification = await prisma.notification.findUnique({ where: { id } });
  if (!notification || notification.coachAccountId !== coach.id) {
    return NextResponse.json({ error: 'Notification introuvable.' }, { status: 404 });
  }

  await prisma.notification.update({ where: { id }, data: { statut: 'LUE' } });

  return NextResponse.json({ ok: true });
}
