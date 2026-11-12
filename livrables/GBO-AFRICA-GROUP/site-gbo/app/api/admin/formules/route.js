import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db.js';
import { getCurrentStaffAdmin, logAudit } from '../../../../lib/auth.js';
import { isSameOrigin } from '../../../../lib/security.js';
import { formuleSchema, parseOrError } from '../../../../lib/validation.js';

export async function GET() {
  const admin = await getCurrentStaffAdmin();
  if (!admin) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const formules = await prisma.formule.findMany({ orderBy: [{ actif: 'desc' }, { prix: 'asc' }] });
  return NextResponse.json({ formules });
}

export async function POST(request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const admin = await getCurrentStaffAdmin();
  if (!admin) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = parseOrError(formuleSchema, body || {});
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const formule = await prisma.formule.create({ data: parsed.data });
  await logAudit({ adminUserId: admin.id, action: 'formule_created', targetType: 'Formule', targetId: formule.id, detail: parsed.data });

  return NextResponse.json({ formule });
}
