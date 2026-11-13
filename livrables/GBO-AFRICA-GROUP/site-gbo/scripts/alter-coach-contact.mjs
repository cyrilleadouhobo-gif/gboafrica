// Script ponctuel (13/11/2026) : ajoute à la table Coach, sur Turso en production, les
// colonnes phone et photoUrl (RG06 — réattribution automatique de coach). Même raison que
// scripts/alter-seance-rg06.mjs : push-schema-to-turso.mjs ne gère que les CREATE
// TABLE/INDEX, pas les ALTER sur une table déjà existante.
// À lancer une seule fois : node scripts/alter-coach-contact.mjs
import { createClient } from '@libsql/client';
import { readFileSync } from 'node:fs';

const envText = readFileSync('.env', 'utf8');
const match = envText.match(/^TURSO_DATABASE_URL="([^"]+)"/m);
if (!match) throw new Error('TURSO_DATABASE_URL not found in .env');

const remote = createClient({ url: match[1] });

const alters = ['ALTER TABLE "Coach" ADD COLUMN "phone" TEXT', 'ALTER TABLE "Coach" ADD COLUMN "photoUrl" TEXT'];

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

const check = await remote.execute("SELECT sql FROM sqlite_master WHERE name='Coach'");
console.log('\nSchéma Coach sur Turso après ajout :\n', check.rows[0].sql);
