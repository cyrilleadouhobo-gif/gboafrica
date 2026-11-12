import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/db.js';
import { getCurrentStaffAdmin, logAudit, hashPassword } from '../../../../../../lib/auth.js';
import { isSameOrigin } from '../../../../../../lib/security.js';
import { createClientAccountSchema, parseOrError } from '../../../../../../lib/validation.js';

// Sans 0/O/1/l/I — ambigus à relire/recopier à l'oral, ce qui est le canal de remise prévu
// (voir proposition d'architecture, décision sur la remise des identifiants).
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
  const parsed = parseOrError(createClientAccountSchema, { ...body, leadId: id });
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const lead = await prisma.lead.findUnique({ where: { id }, include: { clientAccount: true } });
  if (!lead) return NextResponse.json({ error: 'Prospect introuvable.' }, { status: 404 });
  if (lead.status !== 'CLIENT') {
    return NextResponse.json({ error: 'Ce prospect doit être au statut "Client" avant de créer son compte.' }, { status: 409 });
  }
  if (lead.clientAccount) {
    return NextResponse.json({ error: 'Ce client a déjà un compte.' }, { status: 409 });
  }

  const existingEmail = await prisma.clientAccount.findUnique({ where: { email: parsed.data.email } });
  if (existingEmail) {
    return NextResponse.json({ error: 'Cet e-mail est déjà utilisé par un autre compte client.' }, { status: 409 });
  }

  const tempPassword = generateTempPassword();
  const passwordHash = await hashPassword(tempPassword);

  const clientAccount = await prisma.clientAccount.create({
    data: { leadId: id, email: parsed.data.email, passwordHash, mustChangePassword: true },
  });

  await logAudit({ adminUserId: admin.id, action: 'client_account_created', targetType: 'ClientAccount', targetId: clientAccount.id, detail: { leadId: id } });

  // Le mot de passe en clair n'apparaît qu'une seule fois, dans cette réponse — rien n'en
  // garde de trace ensuite (ni en base, ni dans AuditLog).
  return NextResponse.json({ clientAccount: { id: clientAccount.id, email: clientAccount.email }, tempPassword });
}
