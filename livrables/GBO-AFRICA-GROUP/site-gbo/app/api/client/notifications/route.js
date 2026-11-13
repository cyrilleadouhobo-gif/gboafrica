import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db.js';
import { getCurrentClient } from '../../../../lib/clientAuth.js';

export async function GET() {
  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const notifications = await prisma.notification.findMany({
    where: { clientAccountId: client.id },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  return NextResponse.json({ notifications });
}
