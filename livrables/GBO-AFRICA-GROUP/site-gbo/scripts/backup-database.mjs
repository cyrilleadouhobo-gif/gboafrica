// Sauvegarde manuelle de la base Turso — lecture seule (aucune écriture en base).
// Exporte chaque table en JSON dans un dossier HORS du dépôt git (jamais commité : les
// données contiennent des e-mails, téléphones, et des hash de mots de passe).
//
// Usage : node scripts/backup-database.mjs
import { createClient } from '@libsql/client';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';

const envText = readFileSync(new URL('../.env', import.meta.url), 'utf8');
const match = envText.match(/^TURSO_DATABASE_URL="([^"]+)"/m);
if (!match) throw new Error('TURSO_DATABASE_URL introuvable dans .env');

const client = createClient({ url: match[1] });

const BACKUP_ROOT = path.join(homedir(), 'Documents', 'Sauvegardes-GBO');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const outDir = path.join(BACKUP_ROOT, `backup-${timestamp}`);
mkdirSync(outDir, { recursive: true });

const tablesResult = await client.execute(
  "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' AND name != '_prisma_migrations' ORDER BY name"
);

const manifest = {};
for (const row of tablesResult.rows) {
  const table = row.name;
  const data = await client.execute(`SELECT * FROM "${table}"`);
  const rows = data.rows.map((r) => Object.fromEntries(data.columns.map((c, i) => [c, r[i]])));
  writeFileSync(path.join(outDir, `${table}.json`), JSON.stringify(rows, null, 2));
  manifest[table] = rows.length;
  console.log(`  + ${table} (${rows.length} lignes)`);
}

writeFileSync(path.join(outDir, '_manifest.json'), JSON.stringify({ createdAt: new Date().toISOString(), tables: manifest }, null, 2));

client.close();
console.log(`\nSauvegarde terminée : ${outDir}`);
