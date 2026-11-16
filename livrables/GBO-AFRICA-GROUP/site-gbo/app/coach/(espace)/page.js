import Link from 'next/link';
import { getCurrentCoach } from '../../../lib/coachAuth.js';
import { prisma } from '../../../lib/db.js';
import { css } from '../../../lib/css.js';
import { formatSeanceDateTime } from '../../../lib/styleHelpers.js';
import NotificationsBanner from '../../../components/NotificationsBanner.js';
import SessionCard from '../../../components/SessionCard.js';
import CompteRenduForm from '../../../components/CompteRenduForm.js';
import { Avatar, StatTile, Badge, countdownLabel, IconUsers, IconCalendar, IconAlert, IconCheck } from '../../../components/DashboardKit.js';

export const metadata = { title: 'Mon espace — GBÔ', robots: { index: false, follow: false } };

export default async function CoachSpacePage() {
  const coachAccount = await getCurrentCoach();
  const [coach, clientsCount, seances] = await Promise.all([
    prisma.coach.findUnique({ where: { id: coachAccount.coachId }, select: { name: true } }),
    prisma.lead.count({ where: { coachId: coachAccount.coachId, status: 'CLIENT', clientAccount: { isNot: null } } }),
    prisma.seance.findMany({
      where: { coachAccountId: coachAccount.id },
      include: { clientAccount: { include: { lead: { select: { name: true } } } }, compteRendu: true },
      orderBy: { datePrevue: 'asc' },
    }),
  ]);

  const now = new Date();
  const upcoming = seances.filter((s) => s.statut !== 'ANNULEE' && s.statut !== 'EN_REATTRIBUTION' && new Date(s.datePrevue) >= now);
  const aDocumenter = seances.filter((s) => s.statut === 'PLANIFIEE' && new Date(s.datePrevue) < now && !s.compteRendu);
  const totalRealisees = seances.filter((s) => s.statut === 'REALISEE').length;
  const semaineCount = upcoming.filter((s) => (new Date(s.datePrevue).getTime() - now.getTime()) / 86400000 <= 7).length;
  const apercu = upcoming.slice(0, 2);

  return (
    <div>
      <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,4vw,32px);margin-bottom:6px")}>
        Bonjour{coach?.name ? ` ${coach.name}` : ''}
      </h1>
      <p style={css('color:var(--muted,#8a8a8a);font-size:14.5px;margin-bottom:24px')}>Vos clients et vos prochaines séances.</p>

      <NotificationsBanner basePath="/api/coach/notifications" propositionsPath="/api/coach/propositions" />

      <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-bottom:32px')}>
        <StatTile icon={<IconUsers />} value={clientsCount} label="Clients actifs" />
        <StatTile icon={<IconCalendar />} value={semaineCount} label="Séances cette semaine" />
        <StatTile icon={<IconAlert />} value={aDocumenter.length} label="À documenter" tone={aDocumenter.length > 0 ? 'amber' : 'lime'} />
        <StatTile icon={<IconCheck />} value={totalRealisees} label="Séances réalisées" />
      </div>

      {aDocumenter.length > 0 && (
        <>
          <h2 style={css('font-size:17px;font-weight:700;margin-bottom:14px')}>Séances à documenter</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 10, marginBottom: 32 }}>
            {aDocumenter.map((s) => (
              <SessionCard
                key={s.id}
                accent="amber"
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar name={s.clientAccount.lead.name} size={32} />
                    <span>{s.clientAccount.lead.name}</span>
                  </div>
                }
                meta={`${formatSeanceDateTime(s.datePrevue)}${s.lieu ? ` · ${s.lieu}` : ''}`}
                badge={<Badge tone="amber">À documenter</Badge>}
                body={s.contenuPrevu && <div style={css('font-size:13px;margin-top:2px')}>{s.contenuPrevu}</div>}
              >
                <CompteRenduForm seanceId={s.id} />
              </SessionCard>
            ))}
          </div>
        </>
      )}

      <div style={css('display:flex;justify-content:space-between;align-items:center;margin-bottom:14px')}>
        <h2 style={css('font-size:17px;font-weight:700')}>Prochaines séances</h2>
        <Link href="/coach/seances" style={css('font-size:13px;font-weight:700;color:var(--lime,#C6F202)')}>
          Voir tout →
        </Link>
      </div>
      {apercu.length === 0 ? (
        <p style={css('color:var(--muted,#8a8a8a);font-size:13.5px')}>Aucune séance planifiée.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 10 }}>
          {apercu.map((s) => {
            const countdown = countdownLabel(s.datePrevue);
            return (
              <SessionCard
                key={s.id}
                accent="lime"
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar name={s.clientAccount.lead.name} size={32} />
                    <span>{s.clientAccount.lead.name}</span>
                  </div>
                }
                meta={`${formatSeanceDateTime(s.datePrevue)}${s.lieu ? ` · ${s.lieu}` : ''}`}
                badge={countdown && <Badge tone="lime">{countdown}</Badge>}
                body={s.contenuPrevu && <div style={css('font-size:13px;margin-top:2px')}>{s.contenuPrevu}</div>}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
