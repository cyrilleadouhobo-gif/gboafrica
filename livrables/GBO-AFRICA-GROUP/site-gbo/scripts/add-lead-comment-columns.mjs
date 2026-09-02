// One-off migration: adds Lead.availability and Lead.comment on the live Turso database.
// push-schema-to-turso.mjs only replays CREATE TABLE/INDEX statements (it silently skips
// anything that "already exists"), so it can't add a column to a table that's already live —
// this ALTER TABLE fills that gap for this specific change. Safe/additive: nullable text
// columns, no existing row is touched. Run once: node scripts/add-lead-comment-columns.mjs
import { createClient } from '@libsql/client';
import { readFileSync } from 'node:fs';

const envText = readFileSync('.env', 'utf8');
const match = envText.match(/^TURSO_DATABASE_URL="([^"]+)"/m);
if (!match) throw new Error('TURSO_DATABASE_URL not found in .env');

const remote = createClient({ url: match[1] });

const columns = [
  { name: 'availability', ddl: 'ALTER TABLE Lead ADD COLUMN availability TEXT' },
  { name: 'comment', ddl: 'ALTER TABLE Lead ADD COLUMN comment TEXT' },
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
