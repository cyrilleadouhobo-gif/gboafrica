// One-off migration: adds Lead.relationEndedAt and Lead.anonymizedAt on the live Turso
// database. push-schema-to-turso.mjs only replays CREATE TABLE/INDEX statements (it silently
// skips anything that "already exists"), so it can't add a column to a table that's already
// live — this ALTER TABLE fills that gap, same as add-lead-comment-columns.mjs before it.
// Safe/additive: nullable datetime columns, no existing row is touched.
// Run once: node scripts/add-lead-retention-columns.mjs
import { createClient } from '@libsql/client';
import { readFileSync } from 'node:fs';

const envText = readFileSync('.env', 'utf8');
const match = envText.match(/^TURSO_DATABASE_URL="([^"]+)"/m);
if (!match) throw new Error('TURSO_DATABASE_URL not found in .env');

const remote = createClient({ url: match[1] });

const columns = [
  { name: 'relationEndedAt', ddl: 'ALTER TABLE Lead ADD COLUMN relationEndedAt DATETIME' },
  { name: 'anonymizedAt', ddl: 'ALTER TABLE Lead ADD COLUMN anonymizedAt DATETIME' },
];

for (const c of columns) {
  try {
    await remote.execute(c.ddl);
    console.log(`  + Lead.${c.name} added`);
  } catch (err) {
    if (/duplicate column name/i.test(err.message)) {
      console.log(`  = Lead.${c.name} already exists, skipped`);
    } else {
      throw err;
    }
  }
}

remote.close();
console.log('Done.');
