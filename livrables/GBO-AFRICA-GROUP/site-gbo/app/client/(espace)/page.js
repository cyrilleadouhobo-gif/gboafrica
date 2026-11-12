import { getCurrentClient } from '../../../lib/clientAuth.js';
import { prisma } from '../../../lib/db.js';
import { css } from '../../../lib/css.js';
import { formatSeanceDateTime } from '../../../lib/styleHelpers.js';

export const metadata = { title: 'Mon espace — GBÔ', robots: { index: false, follow: false } };

export default async function ClientSpacePage() {
  const client = await getCurrentClient();
  const [lead, abonnement, seances, seancesPassees] = await Promise.all([
    prisma.lead.findUnique({ where: { id: client.leadId }, select: { name: true } }),
    prisma.abonnement.findFirst({ where: { clientAccountId: client.id, statut: 'ACTIF' }, orderBy: { createdAt: 'desc' }, include: { formule: true } }),
    prisma.seance.findMany({
      where: { clientAccountId: client.id, statut: { not: 'ANNULEE' }, datePrevue: { gte: new Date() } },
      include: { coachAccount: { include: { coach: { select: { name: true } } } } },
      orderBy: { datePrevue: 'asc' },
    }),
    prisma.seance.findMany({
      where: { clientAccountId: client.id, statut: 'REALISEE' },
      include: { coachAccount: { include: { coach: { select: { name: true } } } }, compteRendu: true },
      orderBy: { datePrevue: 'desc' },
      take: 10,
    }),
  ]);

  return (
    <div>
      <h1 style={css("font-family:'Broaven';font-weight:700;font-size:28px;margin-bottom:8px")}>
        Bonjour{lead?.name ? ` ${lead.name}` : ''}
      </h1>

      {abonnement ? (
        <div
          style={css(
            'margin-top:20px;padding:22px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c);max-width:420px'
          )}
        >
          <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{abonnement.formule.nom}</div>
          <div style={css('color:var(--muted,#8a8a8a);font-size:14px;margin-bottom:4px')}>
            {abonnement.seancesRestantes} séance{abonnement.seancesRestantes > 1 ? 's' : ''} restante{abonnement.seancesRestantes > 1 ? 's' : ''} sur {abonnement.formule.nbSeances}
          </div>
          <div style={css('color:var(--muted,#8a8a8a);font-size:14px')}>
            Valable jusqu&apos;au {new Date(abonnement.expireLe).toLocaleDateString('fr-FR')}
          </div>
        </div>
      ) : (
        <p style={css('color:var(--muted,#8a8a8a);font-size:14.5px;margin-top:12px')}>
          Vous n&apos;avez pas encore d&apos;abonnement actif. Contactez votre coach ou l&apos;équipe GBÔ.
        </p>
      )}

      <h2 style={css('font-size:17px;font-weight:700;margin:32px 0 14px')}>Prochaines séances</h2>
      {seances.length === 0 ? (
        <p style={css('color:var(--muted,#8a8a8a);font-size:14.5px')}>Aucune séance planifiée pour le moment.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 10 }}>
          {seances.map((s) => (
            <div key={s.id} style={css('padding:18px;border-radius:14px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c);max-width:480px')}>
              <div style={{ fontWeight: 700, marginBottom: 2, overflowWrap: 'break-word' }}>Avec {s.coachAccount.coach.name}</div>
              <div style={css('color:var(--muted,#8a8a8a);font-size:13.5px;margin-bottom:6px')}>
                {formatSeanceDateTime(s.datePrevue)}
                {s.lieu ? ` · ${s.lieu}` : ''}
              </div>
              {s.contenuPrevu && <div style={css('font-size:13.5px')}>{s.contenuPrevu}</div>}
            </div>
          ))}
        </div>
      )}

      {seancesPassees.length > 0 && (
        <>
          <h2 style={css('font-size:17px;font-weight:700;margin:32px 0 14px')}>Séances passées</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 10 }}>
            {seancesPassees.map((s) => (
              <div key={s.id} style={css('padding:18px;border-radius:14px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c);max-width:480px')}>
                <div style={{ fontWeight: 700, marginBottom: 2, overflowWrap: 'break-word' }}>Avec {s.coachAccount.coach.name}</div>
                <div style={css('color:var(--muted,#8a8a8a);font-size:13.5px;margin-bottom:8px')}>{formatSeanceDateTime(s.datePrevue)}</div>
                {s.compteRendu && (
                  <div style={css('font-size:13.5px;overflow-wrap:break-word')}>
                    <span style={{ color: 'var(--muted,#8a8a8a)', fontWeight: 700 }}>Compte rendu : </span>
                    {s.compteRendu.contenu}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
