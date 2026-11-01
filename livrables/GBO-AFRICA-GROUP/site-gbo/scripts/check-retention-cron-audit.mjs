// One-off lecture : vérifie si le Vercel Cron de purge RGPD/ARTCI a bien écrit une ligne
// AuditLog (action: retention_purge, targetId: 'cron') suite à sa première exécution
// programmée (3h UTC) après l'activation de CRON_SECRET le 29/10/2026.
// Lecture seule, ne modifie rien.
import { createClient } from '@libsql/client';
import { readFileSync } from 'node:fs';

const envText = readFileSync('.env', 'utf8');
const match = envText.match(/^TURSO_DATABASE_URL="([^"]+)"/m);
if (!match) throw new Error('TURSO_DATABASE_URL not found in .env');

const remote = createClient({ url: match[1] });

const rows = await remote.execute({
  sql: `SELECT id, action, targetType, targetId, detail, createdAt FROM AuditLog
        WHERE action = 'retention_purge'
        ORDER BY createdAt DESC
        LIMIT 10`,
  args: [],
});

if (rows.rows.length === 0) {
  console.log('Aucune ligne AuditLog action=retention_purge trouvée.');
} else {
  for (const r of rows.rows) {
    console.log(JSON.stringify(r));
  }
}

remote.close();
