import { NextResponse } from 'next/server';
import { purgeExpiredLeads } from '../../../../../lib/retention.js';
import { getCurrentStaffAdmin, logAudit } from '../../../../../lib/auth.js';

// Appelée automatiquement chaque nuit par Vercel Cron (voir vercel.json), qui envoie
// l'en-tête "Authorization: Bearer $CRON_SECRET" — aucune autre requête externe ne doit
// pouvoir déclencher une purge. Reste aussi joignable par un admin connecté (bouton
// "Lancer la purge maintenant" côté back-office), pour vérifier le mécanisme sans attendre
// la prochaine exécution planifiée.
export async function GET(request) {
  const authHeader = request.headers.get('authorization');
  const isCron = Boolean(process.env.CRON_SECRET) && authHeader === `Bearer ${process.env.CRON_SECRET}`;

  const admin = isCron ? null : await getCurrentStaffAdmin();
  if (!isCron && !admin) return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });

  const result = await purgeExpiredLeads();
  await logAudit({
    adminUserId: admin?.id ?? null,
    action: 'retention_purge',
    targetType: 'Lead',
    targetId: isCron ? 'cron' : String(admin.id),
    detail: { anonymizedCount: result.anonymized, leadIds: result.ids },
  });

  return NextResponse.json({ anonymized: result.anonymized });
}
