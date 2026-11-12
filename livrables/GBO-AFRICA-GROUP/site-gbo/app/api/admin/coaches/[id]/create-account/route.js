import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/db.js';
import { getCurrentStaffAdmin, logAudit, hashPassword } from '../../../../../../lib/auth.js';
import { isSameOrigin } from '../../../../../../lib/security.js';
import { createCoachAccountSchema, parseOrError } from '../../../../../../lib/validation.js';

// Sans 0/O/1/l/I — ambigus à relire/recopier à l'oral (voir app/api/admin/leads/[id]/create-client-account/route.js).
const UPPER = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
const LOWER = 'abcdefghjkmnpqrstuvwxyz';
const DIGITS = '23456789';

function generateTempPassword() {
  const all = UPPER + LOWER + DIGITS;
  const pick = (set) => set[crypto.randomInt(set.length)];
  const chars = [pick(UPPER), pick(LOWER), pick(DIGITS)];
  for (let i = 0; i < 7; i++) chars.push(pick(all));
  for (let i = chars.length - 1; i > 0; i--) {
    const j = crypto.randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join('');
}

export async function POST(request, { params }) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const admin = await getCurrentStaffAdmin();
  if (!admin) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) return NextResponse.json({ error: 'Identifiant invalide.' }, { status: 400 });

  const body = await request.json().catch(() => null);
  const parsed = parseOrError(createCoachAccountSchema, { ...body, coachId: id });
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const coach = await prisma.coach.findUnique({ where: { id }, include: { coachAccount: true } });
  if (!coach) return NextResponse.json({ error: 'Coach introuvable.' }, { status: 404 });
  if (coach.coachAccount) {
    return NextResponse.json({ error: 'Ce coach a déjà un compte.' }, { status: 409 });
  }

  const existingEmail = await prisma.coachAccount.findUnique({ where: { email: parsed.data.email } });
  if (existingEmail) {
    return NextResponse.json({ error: 'Cet e-mail est déjà utilisé par un autre compte coach.' }, { status: 409 });
  }

  const tempPassword = generateTempPassword();
  const passwordHash = await hashPassword(tempPassword);

  const coachAccount = await prisma.coachAccount.create({
    data: { coachId: id, email: parsed.data.email, passwordHash, mustChangePassword: true },
  });

  await logAudit({ adminUserId: admin.id, action: 'coach_account_created', targetType: 'CoachAccount', targetId: coachAccount.id, detail: { coachId: id } });

  return NextResponse.json({ coachAccount: { id: coachAccount.id, email: coachAccount.email }, tempPassword });
}
