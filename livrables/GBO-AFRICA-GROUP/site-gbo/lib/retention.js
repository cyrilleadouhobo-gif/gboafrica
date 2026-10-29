// Fait respecter automatiquement les durées de conservation annoncées dans la politique de
// confidentialité (data/legal.js, section "Durées de conservation") :
//   - Prospect (status != CLIENT) sans suite : 3 mois après le dernier contact (updatedAt).
//   - Client (status == CLIENT) : 3 ans après la fin de la relation (relationEndedAt, posée
//     manuellement par un admin — voir app/api/admin/leads/[id]/relation-end/route.js).
// Anonymise plutôt que supprime : la ligne Lead reste (stats, intégrité avec Coach /
// NutritionFollowUp) mais toute donnée à caractère personnel est effacée.
import { prisma } from './db.js';

const PROSPECT_RETENTION_MS = 1000 * 60 * 60 * 24 * 30 * 3; // 3 mois
const CLIENT_RETENTION_MS = 1000 * 60 * 60 * 24 * 365 * 3; // 3 ans

const ANONYMIZED_FIELDS = {
  name: 'Ancien contact (anonymisé)',
  objective: '—',
  profile: '—',
  commune: '—',
  contactEmail: null,
  contactPhone: null,
  contactName: null,
  comment: null,
  nutritionObjective: null,
  availability: null,
};

export async function purgeExpiredLeads(now = new Date()) {
  const prospectCutoff = new Date(now.getTime() - PROSPECT_RETENTION_MS);
  const clientCutoff = new Date(now.getTime() - CLIENT_RETENTION_MS);

  const [expiredProspects, expiredClients] = await Promise.all([
    prisma.lead.findMany({
      where: { status: { not: 'CLIENT' }, anonymizedAt: null, updatedAt: { lt: prospectCutoff } },
      select: { id: true },
    }),
    prisma.lead.findMany({
      where: { status: 'CLIENT', anonymizedAt: null, relationEndedAt: { not: null, lt: clientCutoff } },
      select: { id: true },
    }),
  ]);

  const ids = [...expiredProspects, ...expiredClients].map((l) => l.id);
  if (ids.length === 0) return { anonymized: 0, ids: [] };

  await prisma.lead.updateMany({ where: { id: { in: ids } }, data: { ...ANONYMIZED_FIELDS, anonymizedAt: now } });

  return { anonymized: ids.length, ids };
}
