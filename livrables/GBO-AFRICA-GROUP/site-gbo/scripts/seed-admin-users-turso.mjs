// One-off: crée/synchronise les comptes AdminUser sur la base Turso live à partir de
// ADMIN_EMAIL/ADMIN_PASSWORD et NUTRITION_PARTNER_EMAIL/NUTRITION_PARTNER_PASSWORD (.env).
// `npm run db:seed` (prisma/seed.js) écrit dans dev.db local (PrismaClient() sans adapter),
// jamais dans Turso — ce script comble ce manque en réutilisant la même logique upsert que
// seedAdminUser() mais via @libsql/client directement sur TURSO_DATABASE_URL.
// Lancer une seule fois (ou à chaque fois qu'un mot de passe change) : node scripts/seed-admin-users-turso.mjs
import { createClient } from '@libsql/client';
import { readFileSync } from 'node:fs';
import bcrypt from 'bcryptjs';

const envText = readFileSync('.env', 'utf8');
function envVar(name) {
  const match = envText.match(new RegExp(`^${name}="([^"]*)"`, 'm'));
  return match ? match[1] : undefined;
}

const tursoUrl = envVar('TURSO_DATABASE_URL');
if (!tursoUrl) throw new Error('TURSO_DATABASE_URL not found in .env');

const accounts = [
  { label: 'admin', role: 'admin', email: envVar('ADMIN_EMAIL'), password: envVar('ADMIN_PASSWORD') },
  {
    label: 'partenaire nutrition',
    role: 'nutrition_partner',
    email: envVar('NUTRITION_PARTNER_EMAIL'),
    password: envVar('NUTRITION_PARTNER_PASSWORD'),
  },
];

const remote = createClient({ url: tursoUrl });

for (const { label, role, email, password } of accounts) {
  if (!email || !password) {
    console.warn(`  ! ${label} : email/mot de passe absents de .env, ignoré`);
    continue;
  }
  const passwordHash = await bcrypt.hash(password, 12);
  const existing = await remote.execute({ sql: 'SELECT id FROM AdminUser WHERE email = ?', args: [email] });
  if (existing.rows.length > 0) {
    await remote.execute({
      sql: 'UPDATE AdminUser SET passwordHash = ?, role = ? WHERE email = ?',
      args: [passwordHash, role, email],
    });
    console.log(`  = ${label} (${email}) mis à jour`);
  } else {
    await remote.execute({
      sql: 'INSERT INTO AdminUser (email, passwordHash, role, createdAt) VALUES (?, ?, ?, datetime(\'now\'))',
      args: [email, passwordHash, role],
    });
    console.log(`  + ${label} (${email}) créé`);
  }
}

remote.close();
console.log('Done.');
