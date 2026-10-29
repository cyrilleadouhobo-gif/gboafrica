// One-off nettoyage : supprime les 4 coachs de démo et 2 avis de démo écrits par erreur
// sur la vraie base Turso le 29/10/2026 (voir prisma/seed.js, corrigé depuis pour ne plus
// jamais écrire de données placeholder en production).
// Vérifie qu'aucun Lead ne référence ces coachs avant de les supprimer.
// Run once: node scripts/remove-demo-coaches-reviews.mjs
import { createClient } from '@libsql/client';
import { readFileSync } from 'node:fs';

const envText = readFileSync('.env', 'utf8');
const match = envText.match(/^TURSO_DATABASE_URL="([^"]+)"/m);
if (!match) throw new Error('TURSO_DATABASE_URL not found in .env');

const remote = createClient({ url: match[1] });

const FAKE_COACH_NAMES = ['Coach Awa', 'Coach Yao', 'Coach Grace', 'Coach Ibrahim'];
const FAKE_REVIEW_AUTHORS = ['Aïcha B.', 'Kader T.'];

const coachRows = await remote.execute({
  sql: `SELECT id, name FROM Coach WHERE name IN (${FAKE_COACH_NAMES.map(() => '?').join(',')})`,
  args: FAKE_COACH_NAMES,
});
const coachIds = coachRows.rows.map((r) => r.id);

if (coachIds.length > 0) {
  const refCheck = await remote.execute({
    sql: `SELECT COUNT(*) as n FROM Lead WHERE coachId IN (${coachIds.map(() => '?').join(',')})`,
    args: coachIds,
  });
  if (Number(refCheck.rows[0].n) > 0) {
    throw new Error(`Abandon : ${refCheck.rows[0].n} lead(s) référencent ces coachs — vérifier avant de continuer.`);
  }
  for (const id of coachIds) {
    await remote.execute({ sql: 'DELETE FROM Coach WHERE id = ?', args: [id] });
  }
  console.log(`  - ${coachIds.length} coach(s) de démo supprimé(s) :`, coachRows.rows.map((r) => r.name).join(', '));
} else {
  console.log('  = aucun coach de démo trouvé (déjà nettoyé ?)');
}

const reviewRows = await remote.execute({
  sql: `SELECT id, authorName FROM Review WHERE authorName IN (${FAKE_REVIEW_AUTHORS.map(() => '?').join(',')})`,
  args: FAKE_REVIEW_AUTHORS,
});
for (const row of reviewRows.rows) {
  await remote.execute({ sql: 'DELETE FROM Review WHERE id = ?', args: [row.id] });
}
console.log(reviewRows.rows.length > 0
  ? `  - ${reviewRows.rows.length} avis de démo supprimé(s) : ${reviewRows.rows.map((r) => r.authorName).join(', ')}`
  : '  = aucun avis de démo trouvé (déjà nettoyé ?)');

remote.close();
console.log('Done.');
