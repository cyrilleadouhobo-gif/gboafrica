// Prisma 5.x's CLI refuses to `db push`/`migrate` directly against a libsql:// URL for the
// "sqlite" provider (it requires the datasource url to start with "file:"). Workaround:
// `npm run db:push` writes the schema to a local prisma/turso-init.db file, then this script
// copies every CREATE TABLE/INDEX statement from that file onto the real Turso database.
// Run after any schema.prisma change: npm run db:push && node scripts/push-schema-to-turso.mjs
import { createClient } from '@libsql/client';
import { readFileSync, existsSync, unlinkSync } from 'node:fs';

const envText = readFileSync('.env', 'utf8');
const match = envText.match(/^TURSO_DATABASE_URL="([^"]+)"/m);
if (!match) throw new Error('TURSO_DATABASE_URL not found in .env');

const localDbPath = 'prisma/turso-init.db';
if (!existsSync(localDbPath)) {
  throw new Error(`${localDbPath} not found — run "npm run db:push" first.`);
}

const local = createClient({ url: `file:./${localDbPath}` });
const remote = createClient({ url: match[1] });

const rows = await local.execute(
  "SELECT name, sql FROM sqlite_master WHERE sql IS NOT NULL AND name NOT LIKE 'sqlite_%' ORDER BY CASE type WHEN 'table' THEN 0 ELSE 1 END"
);

console.log(`Applying ${rows.rows.length} statements to Turso (existing objects are skipped)...`);
for (const row of rows.rows) {
  try {
    await remote.execute(row.sql);
    console.log(`  + ${row.name}`);
  } catch (err) {
    if (/already exists/i.test(err.message)) {
      console.log(`  = ${row.name} (already exists, skipped)`);
    } else {
      throw err;
    }
  }
}

local.close();
remote.close();
unlinkSync(localDbPath);
console.log('Done.');
