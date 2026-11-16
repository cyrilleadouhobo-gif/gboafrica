import { getCurrentCoach } from '../../../../lib/coachAuth.js';
import { prisma } from '../../../../lib/db.js';
import { css } from '../../../../lib/css.js';
import { formatSeanceDateTime } from '../../../../lib/styleHelpers.js';
import AnnulerReporterSeance from '../../../../components/AnnulerReporterSeance.js';
import SessionCard from '../../../../components/SessionCard.js';
import CompteRenduForm from '../../../../components/CompteRenduForm.js';
import CorrigerCompteRenduForm from '../../../../components/CorrigerCompteRenduForm.js';
import { Avatar, StatTile, Badge, countdownLabel, IconCalendar, IconAlert, IconCheck } from '../../../../components/DashboardKit.js';

export const metadata = { title: 'Mes séances — GBÔ', robots: { index: false, follow: false } };

export default async function CoachSeancesPage() {
  const coachAccount = await getCurrentCoach();
  const seances = await prisma.seance.findMany({
    where: { coachAccountId: coachAccount.id },
    include: { clientAccount: { include: { lead: { select: { name: true } } } }, compteRendu: true },
    orderBy: { datePrevue: 'asc' },
  });

  const now = new Date();
  const upcoming = seances.filter((s) => s.statut !== 'ANNULEE' && s.statut !== 'EN_REATTRIBUTION' && new Date(s.datePrevue) >= now);
  const aDocumenter = seances.filter((s) => s.statut === 'PLANIFIEE' && new Date(s.datePrevue) < now && !s.compteRendu);
  const realisees = seances
    .filter((s) => s.statut === 'REALISEE' && s.compteRendu)
    .sort((a, b) => new Date(b.datePrevue) - new Date(a.datePrevue))
    .slice(0, 10);
  const annulees = seances
    .filter((s) => s.statut === 'ANNULEE')
    .sort((a, b) => new Date(b.updatedAt || b.datePrevue) - new Date(a.updatedAt || a.datePrevue))
    .slice(0, 5);

  return (
    <div>
      <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(22px,4vw,28px);margin-bottom:6px")}>Mes séances</h1>
      <p style={css('color:var(--muted,#8a8a8a);font-size:14.5px;margin-bottom:24px')}>Votre planning avec vos clients.</p>

      <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-bottom:32px')}>
        <StatTile icon={<IconCalendar />} value={upcoming.length} label="À venir" />
        <StatTile icon={<IconAlert />} value={aDocumenter.length} label="À documenter" tone={aDocumenter.length > 0 ? 'amber' : 'lime'} />
        <StatTile icon={<IconCheck />} value={seances.filter((s) => s.statut === 'REALISEE').length} label="Réalisées" />
      </div>

      {aDocumenter.length > 0 && (
        <>
          <h2 style={css('font-size:17px;font-weight:700;margin-bottom:14px')}>À documenter</h2>
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

      <h2 style={css('font-size:17px;font-weight:700;margin-bottom:14px')}>À venir</h2>
      {upcoming.length === 0 ? (
        <p style={css('color:var(--muted,#8a8a8a);font-size:13.5px;margin-bottom:28px')}>Aucune séance planifiée.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 10, marginBottom: 32 }}>
          {upcoming.map((s) => {
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
              >
                <AnnulerReporterSeance seanceId={s.id} datePrevue={s.datePrevue} basePath="/api/coach/seances" canReporter={false} />
              </SessionCard>
            );
          })}
        </div>
      )}

      {realisees.length > 0 && (
        <>
          <h2 style={css('font-size:17px;font-weight:700;margin-bottom:14px')}>Réalisées récemment</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 10, marginBottom: 32 }}>
            {realisees.map((s) => (
              <SessionCard
                key={s.id}
                accent="green"
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar name={s.clientAccount.lead.name} size={32} />
                    <span>{s.clientAccount.lead.name}</span>
                  </div>
                }
                meta={formatSeanceDateTime(s.datePrevue)}
                body={
                  <>
                    <div style={css('font-size:13px;overflow-wrap:break-word;margin-top:2px')}>
                      <span style={{ color: 'var(--muted,#8a8a8a)', fontWeight: 700 }}>Compte rendu : </span>
                      {s.compteRendu.contenu}
                    </div>
                    <CorrigerCompteRenduForm seanceId={s.id} initialContenu={s.compteRendu.contenu} />
                  </>
                }
              />
            ))}
          </div>
        </>
      )}

      {annulees.length > 0 && (
        <>
          <h2 style={css('font-size:17px;font-weight:700;margin-bottom:14px')}>Annulées récemment</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 10 }}>
            {annulees.map((s) => (
              <SessionCard
                key={s.id}
                accent="red"
                muted
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar name={s.clientAccount.lead.name} size={32} />
                    <span>{s.clientAccount.lead.name}</span>
                  </div>
                }
                meta={formatSeanceDateTime(s.datePrevue)}
                body={
                  <>
                    <div style={css('font-size:12.5px;color:#f87171;margin-top:2px')}>
                      Annulée par {s.annulePar === 'CLIENT' ? 'le client' : 'vous'}
                      {s.decompteeMalgreAnnulation ? ' — décomptée du forfait' : ' — non décomptée'}
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
