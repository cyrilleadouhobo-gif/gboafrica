import { getCurrentClient } from '../../../../lib/clientAuth.js';
import { prisma } from '../../../../lib/db.js';
import { css } from '../../../../lib/css.js';
import { ProgressRing, Badge } from '../../../../components/DashboardKit.js';

export const metadata = { title: 'Mon forfait — GBÔ', robots: { index: false, follow: false } };

const STATUT_TONE = { ACTIF: 'lime', EPUISE: 'amber', EXPIRE: 'neutral', ANNULE: 'red' };
const STATUT_LABEL = { ACTIF: 'Actif', EPUISE: 'Épuisé', EXPIRE: 'Expiré', ANNULE: 'Annulé' };

export default async function ClientForfaitPage() {
  const client = await getCurrentClient();
  const abonnements = await prisma.abonnement.findMany({
    where: { clientAccountId: client.id },
    include: { formule: true, paiements: true },
    orderBy: { createdAt: 'desc' },
  });

  const actif = abonnements.find((a) => a.statut === 'ACTIF');
  const historique = abonnements.filter((a) => a.id !== actif?.id);
  const pct = actif ? Math.round((actif.seancesRestantes / actif.formule.nbSeances) * 100) : 0;

  return (
    <div>
      <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(22px,4vw,28px);margin-bottom:24px")}>Mon forfait</h1>

      {actif ? (
        <div
          className="hover-card"
          style={css(
            'display:flex;flex-wrap:wrap;gap:24px;align-items:center;padding:26px;border-radius:18px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c);margin-bottom:16px'
          )}
        >
          <ProgressRing size={120} pct={pct} value={actif.seancesRestantes} label={`/ ${actif.formule.nbSeances}`} />
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
              <div style={{ fontWeight: 700, fontSize: 19, overflowWrap: 'break-word' }}>{actif.formule.nom}</div>
              <Badge tone={STATUT_TONE[actif.statut]}>{STATUT_LABEL[actif.statut]}</Badge>
            </div>
            <div style={css('color:var(--muted,#8a8a8a);font-size:14px')}>
              {actif.seancesRestantes} séance{actif.seancesRestantes > 1 ? 's' : ''} restante{actif.seancesRestantes > 1 ? 's' : ''} sur {actif.formule.nbSeances}
            </div>
            <div style={css('color:var(--muted,#8a8a8a);font-size:14px;margin-top:2px')}>
              Du {new Date(actif.demarreLe).toLocaleDateString('fr-FR')} au {new Date(actif.expireLe).toLocaleDateString('fr-FR')}
            </div>
          </div>
        </div>
      ) : (
        <div
          style={css(
            'padding:22px;border-radius:16px;border:1px dashed var(--border,rgba(255,255,255,.18));color:var(--muted,#8a8a8a);font-size:14.5px;margin-bottom:16px'
          )}
        >
          Vous n&apos;avez pas d&apos;abonnement actif pour le moment.
        </div>
      )}

      <div
        style={css(
          'padding:20px 22px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c);margin-bottom:32px'
        )}
      >
        <div style={{ fontWeight: 700, marginBottom: 6 }}>Renouveler ou changer de formule</div>
        <p style={css('color:var(--muted,#8a8a8a);font-size:13.5px;margin-bottom:14px')}>
          Les forfaits GBÔ ne se souscrivent pas en ligne — contactez votre coach ou l&apos;équipe GBÔ pour en discuter.
        </p>
        <a
          href="https://wa.me/2250103161415"
          target="_blank"
          rel="noopener noreferrer"
          style={css('display:inline-block;padding:12px 20px;border-radius:10px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:13.5px')}
        >
          Contacter l&apos;équipe GBÔ
        </a>
      </div>

      {historique.length > 0 && (
        <>
          <h2 style={css('font-size:17px;font-weight:700;margin-bottom:14px')}>Historique</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 10 }}>
            {historique.map((a) => {
              const total = a.paiements.reduce((sum, p) => sum + p.montant, 0);
              return (
                <div
                  key={a.id}
                  style={css(
                    'padding:16px 18px;border-radius:14px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c)'
                  )}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
                    <div style={{ fontWeight: 700, overflowWrap: 'break-word' }}>{a.formule.nom}</div>
                    <Badge tone={STATUT_TONE[a.statut]}>{STATUT_LABEL[a.statut]}</Badge>
                  </div>
                  <div style={css('font-size:13px;color:var(--muted,#8a8a8a)')}>
                    Du {new Date(a.demarreLe).toLocaleDateString('fr-FR')} au {new Date(a.expireLe).toLocaleDateString('fr-FR')}
                    {total > 0 ? ` · ${total.toLocaleString('fr-FR')} FCFA réglés` : ''}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
