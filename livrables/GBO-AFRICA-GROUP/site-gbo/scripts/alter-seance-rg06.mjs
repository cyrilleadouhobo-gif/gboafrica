// Script ponctuel (13/11/2026) : ajoute à la table Seance, sur Turso en production, les 3
// colonnes RG06 (annulation/report). push-schema-to-turso.mjs ne gère que les CREATE
// TABLE/INDEX, pas les ALTER sur une table déjà existante — d'où ce script séparé.
// À lancer une seule fois : node scripts/alter-seance-rg06.mjs
import { createClient } from '@libsql/client';
import { readFileSync } from 'node:fs';

const envText = readFileSync('.env', 'utf8');
const match = envText.match(/^TURSO_DATABASE_URL="([^"]+)"/m);
if (!match) throw new Error('TURSO_DATABASE_URL not found in .env');

const remote = createClient({ url: match[1] });

const alters = [
  'ALTER TABLE "Seance" ADD COLUMN "motifAnnulation" TEXT',
  'ALTER TABLE "Seance" ADD COLUMN "annulePar" TEXT',
  'ALTER TABLE "Seance" ADD COLUMN "decompteeMalgreAnnulation" BOOLEAN NOT NULL DEFAULT false',
];

for (const sql of alters) {
  try {
    await remote.execute(sql);
    console.log(`  + ${sql}`);
  } catch (err) {
    if (/duplicate column name/i.test(err.message)) {
      console.log(`  = ${sql} (déjà présente, ignorée)`);
    } else {
      throw err;
    }
  }
}

const check = await remote.execute("SELECT sql FROM sqlite_master WHERE name='Seance'");
console.log('\nSchéma Seance sur Turso après ajout :\n', check.rows[0].sql);
