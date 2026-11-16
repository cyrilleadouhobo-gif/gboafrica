import { getCurrentClient } from '../../../../lib/clientAuth.js';
import { prisma } from '../../../../lib/db.js';
import { css } from '../../../../lib/css.js';
import { formatSeanceDateTime } from '../../../../lib/styleHelpers.js';
import AnnulerReporterSeance from '../../../../components/AnnulerReporterSeance.js';
import SessionCard from '../../../../components/SessionCard.js';
import { Avatar, StatTile, Badge, countdownLabel, IconCalendar, IconCheck, IconClock } from '../../../../components/DashboardKit.js';

export const metadata = { title: 'Mes séances — GBÔ', robots: { index: false, follow: false } };

export default async function ClientSeancesPage() {
  const client = await getCurrentClient();
  const [abonnement, seances, seancesPassees, seancesAnnulees] = await Promise.all([
    prisma.abonnement.findFirst({ where: { clientAccountId: client.id, statut: 'ACTIF' }, orderBy: { createdAt: 'desc' }, select: { seancesRestantes: true } }),
    prisma.seance.findMany({
      where: { clientAccountId: client.id, statut: { notIn: ['ANNULEE', 'EN_REATTRIBUTION'] }, datePrevue: { gte: new Date() } },
      include: { coachAccount: { include: { coach: { select: { name: true } } } } },
      orderBy: { datePrevue: 'asc' },
    }),
    prisma.seance.findMany({
      where: { clientAccountId: client.id, statut: 'REALISEE' },
      include: { coachAccount: { include: { coach: { select: { name: true } } } }, compteRendu: true },
      orderBy: { datePrevue: 'desc' },
      take: 10,
    }),
    prisma.seance.findMany({
      where: { clientAccountId: client.id, statut: 'ANNULEE' },
      include: { coachAccount: { include: { coach: { select: { name: true } } } } },
      orderBy: { updatedAt: 'desc' },
      take: 5,
    }),
  ]);

  return (
    <div>
      <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(22px,4vw,28px);margin-bottom:6px")}>Mes séances</h1>
      <p style={css('color:var(--muted,#8a8a8a);font-size:14.5px;margin-bottom:24px')}>Planifiées par votre coach GBÔ.</p>

      <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-bottom:32px')}>
        <StatTile icon={<IconCalendar />} value={seances.length} label="À venir" />
        <StatTile icon={<IconCheck />} value={seancesPassees.length} label="Effectuées récemment" />
        <StatTile icon={<IconClock />} value={abonnement?.seancesRestantes ?? '—'} label="Restantes sur le forfait" />
      </div>

      <h2 style={css('font-size:17px;font-weight:700;margin-bottom:14px')}>À venir</h2>
      {seances.length === 0 ? (
        <p style={css('color:var(--muted,#8a8a8a);font-size:14.5px;margin-bottom:28px')}>Aucune séance planifiée pour le moment.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 10, marginBottom: 32 }}>
          {seances.map((s) => {
            const countdown = countdownLabel(s.datePrevue);
            return (
              <SessionCard
                key={s.id}
                accent="lime"
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar name={s.coachAccount.coach.name} size={32} />
                    <span>Avec {s.coachAccount.coach.name}</span>
                  </div>
                }
                meta={`${formatSeanceDateTime(s.datePrevue)}${s.lieu ? ` · ${s.lieu}` : ''}`}
                badge={countdown && <Badge tone="lime">{countdown}</Badge>}
                body={s.contenuPrevu && <div style={css('font-size:13.5px;margin-top:2px')}>{s.contenuPrevu}</div>}
              >
                <AnnulerReporterSeance seanceId={s.id} datePrevue={s.datePrevue} basePath="/api/client/seances" />
              </SessionCard>
            );
          })}
        </div>
      )}

      {seancesPassees.length > 0 && (
        <>
          <h2 style={css('font-size:17px;font-weight:700;margin-bottom:14px')}>Passées</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 10, marginBottom: 32 }}>
            {seancesPassees.map((s) => (
              <SessionCard
                key={s.id}
                accent="green"
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar name={s.coachAccount.coach.name} size={32} />
                    <span>Avec {s.coachAccount.coach.name}</span>
                  </div>
                }
                meta={formatSeanceDateTime(s.datePrevue)}
                body={
                  s.compteRendu && (
                    <div style={css('font-size:13.5px;overflow-wrap:break-word;margin-top:2px')}>
                      <span style={{ color: 'var(--muted,#8a8a8a)', fontWeight: 700 }}>Compte rendu : </span>
                      {s.compteRendu.contenu}
                    </div>
                  )
                }
              />
            ))}
          </div>
        </>
      )}

      {seancesAnnulees.length > 0 && (
        <>
          <h2 style={css('font-size:17px;font-weight:700;margin-bottom:14px')}>Annulées récemment</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 10 }}>
            {seancesAnnulees.map((s) => (
              <SessionCard
                key={s.id}
                accent="red"
                muted
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar name={s.coachAccount.coach.name} size={32} />
                    <span>Avec {s.coachAccount.coach.name}</span>
                  </div>
                }
                meta={formatSeanceDateTime(s.datePrevue)}
                body={
                  <>
                    <div style={css('font-size:12.5px;color:#f87171;margin-top:2px')}>
                      Annulée par {s.annulePar === 'COACH' ? 'le coach' : 'vous'}
                      {s.decompteeMalgreAnnulation ? ' — décomptée du forfait (moins de 24h de préavis)' : ' — non décomptée'}
                    </div>
                    {s.motifAnnulation && <div style={css('font-size:12.5px;color:var(--muted,#8a8a8a);margin-top:4px')}>Motif : {s.motifAnnulation}</div>}
                  </>
                }
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
