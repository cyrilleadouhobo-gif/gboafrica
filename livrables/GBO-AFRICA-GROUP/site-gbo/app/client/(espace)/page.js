import Link from 'next/link';
import { getCurrentClient } from '../../../lib/clientAuth.js';
import { prisma } from '../../../lib/db.js';
import { css } from '../../../lib/css.js';
import { formatSeanceDateTime } from '../../../lib/styleHelpers.js';
import NotificationsBanner from '../../../components/NotificationsBanner.js';
import SessionCard from '../../../components/SessionCard.js';
import { Avatar, StatTile, ProgressRing, Badge, countdownLabel, IconCalendar, IconCheck, IconClock } from '../../../components/DashboardKit.js';

export const metadata = { title: 'Mon espace — GBÔ', robots: { index: false, follow: false } };

export default async function ClientSpacePage() {
  const client = await getCurrentClient();
  const [lead, abonnement, seances, totalRealisees] = await Promise.all([
    prisma.lead.findUnique({ where: { id: client.leadId }, select: { name: true, coach: { select: { name: true, photoUrl: true } } } }),
    prisma.abonnement.findFirst({ where: { clientAccountId: client.id, statut: 'ACTIF' }, orderBy: { createdAt: 'desc' }, include: { formule: true } }),
    prisma.seance.findMany({
      where: { clientAccountId: client.id, statut: { notIn: ['ANNULEE', 'EN_REATTRIBUTION'] }, datePrevue: { gte: new Date() } },
      include: { coachAccount: { include: { coach: { select: { name: true } } } } },
      orderBy: { datePrevue: 'asc' },
      take: 2,
    }),
    prisma.seance.count({ where: { clientAccountId: client.id, statut: 'REALISEE' } }),
  ]);

  const prochaine = seances[0];
  const joursRestants = abonnement ? Math.max(0, Math.ceil((new Date(abonnement.expireLe).getTime() - Date.now()) / 86400000)) : null;
  const pctRestant = abonnement ? Math.round((abonnement.seancesRestantes / abonnement.formule.nbSeances) * 100) : 0;

  return (
    <div>
      <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,4vw,32px);margin-bottom:6px")}>
        Bonjour{lead?.name ? ` ${lead.name}` : ''}
      </h1>
      <p style={css('color:var(--muted,#8a8a8a);font-size:14.5px;margin-bottom:24px')}>Voici l&apos;essentiel de votre accompagnement.</p>

      <NotificationsBanner basePath="/api/client/notifications" propositionsPath="/api/client/propositions" />

      <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-bottom:20px')}>
        <StatTile
          icon={<IconCalendar />}
          value={prochaine ? new Date(prochaine.datePrevue).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : '—'}
          label="Prochaine séance"
        />
        <StatTile icon={<IconCheck />} value={totalRealisees} label="Séances réalisées" />
        <StatTile icon={<IconClock />} value={joursRestants ?? '—'} label="Jours restants" />
      </div>

      <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin-bottom:28px')}>
        <Link
          href="/client/forfait"
          className="hover-card"
          style={css(
            'display:flex;gap:16px;align-items:center;padding:20px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c);min-width:0'
          )}
        >
          {abonnement ? (
            <>
              <ProgressRing size={64} pct={pctRestant} value={abonnement.seancesRestantes} />
              <div style={{ minWidth: 0 }}>
                <div style={css('font-size:11px;letter-spacing:.5px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:700;margin-bottom:4px')}>
                  Mon forfait
                </div>
                <div style={{ fontWeight: 700, overflowWrap: 'break-word' }}>{abonnement.formule.nom}</div>
                <div style={css('font-size:12.5px;color:var(--muted,#8a8a8a)')}>{abonnement.seancesRestantes} séance(s) restante(s)</div>
              </div>
            </>
          ) : (
            <div style={{ minWidth: 0 }}>
              <div style={css('font-size:11px;letter-spacing:.5px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:700;margin-bottom:4px')}>
                Mon forfait
              </div>
              <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a)')}>Pas d&apos;abonnement actif pour le moment.</div>
            </div>
          )}
        </Link>

        <Link
          href="/client/coach"
          className="hover-card"
          style={css(
            'display:flex;gap:16px;align-items:center;padding:20px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c);min-width:0'
          )}
        >
          {lead?.coach ? (
            <>
              {lead.coach.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={lead.coach.photoUrl} alt={lead.coach.name} style={{ width: 52, height: 52, borderRadius: 14, objectFit: 'cover', flexShrink: 0 }} />
              ) : (
                <Avatar name={lead.coach.name} size={52} />
              )}
              <div style={{ minWidth: 0 }}>
                <div style={css('font-size:11px;letter-spacing:.5px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:700;margin-bottom:4px')}>
                  Mon coach
                </div>
                <div style={{ fontWeight: 700, overflowWrap: 'break-word' }}>{lead.coach.name}</div>
                <div style={css('font-size:12.5px;color:var(--muted,#8a8a8a)')}>Voir le profil</div>
              </div>
            </>
          ) : (
            <div style={{ minWidth: 0 }}>
              <div style={css('font-size:11px;letter-spacing:.5px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:700;margin-bottom:4px')}>
                Mon coach
              </div>
              <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a)')}>Pas encore de coach attribué.</div>
            </div>
          )}
        </Link>
      </div>

      <div style={css('display:flex;justify-content:space-between;align-items:center;margin-bottom:14px')}>
        <h2 style={css('font-size:17px;font-weight:700')}>Prochaines séances</h2>
        <Link href="/client/seances" style={css('font-size:13px;font-weight:700;color:var(--lime,#C6F202)')}>
          Voir tout →
        </Link>
      </div>
      {seances.length === 0 ? (
        <p style={css('color:var(--muted,#8a8a8a);font-size:14.5px')}>Aucune séance planifiée pour le moment.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 10 }}>
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
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
