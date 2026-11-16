import { getCurrentCoach } from '../../../../lib/coachAuth.js';
import { prisma } from '../../../../lib/db.js';
import { css } from '../../../../lib/css.js';
import PlanifierSeanceForm from '../../../../components/PlanifierSeanceForm.js';
import { Avatar, ProgressBar } from '../../../../components/DashboardKit.js';

export const metadata = { title: 'Mes clients — GBÔ', robots: { index: false, follow: false } };

export default async function CoachClientsPage() {
  const coachAccount = await getCurrentCoach();

  // RG02 — un coach ne voit que les clients qui lui sont attribués (Lead.coachId), jamais
  // l'ensemble de la base clients.
  const leads = await prisma.lead.findMany({
    where: { coachId: coachAccount.coachId, status: 'CLIENT', clientAccount: { isNot: null } },
    select: {
      id: true,
      name: true,
      clientAccount: {
        select: {
          id: true,
          email: true,
          abonnements: { where: { statut: 'ACTIF' }, orderBy: { createdAt: 'desc' }, take: 1, include: { formule: { select: { nom: true, nbSeances: true } } } },
        },
      },
    },
    orderBy: { name: 'asc' },
  });

  const clients = leads
    .filter((l) => l.clientAccount)
    .map((l) => ({ leadName: l.name, clientAccountId: l.clientAccount.id, abonnement: l.clientAccount.abonnements[0] || null }));

  return (
    <div>
      <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(22px,4vw,28px);margin-bottom:6px")}>Mes clients</h1>
      <p style={css('color:var(--muted,#8a8a8a);font-size:14.5px;margin-bottom:24px')}>{clients.length} client(s) attribué(s).</p>

      {clients.length === 0 ? (
        <p style={css('color:var(--muted,#8a8a8a);font-size:13.5px')}>Aucun client ne vous est attribué pour le moment.</p>
      ) : (
        <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px')}>
          {clients.map((c) => {
            const pct = c.abonnement ? Math.round((c.abonnement.seancesRestantes / c.abonnement.formule.nbSeances) * 100) : 0;
            return (
              <div
                key={c.clientAccountId}
                className="hover-card"
                style={css('padding:18px;border-radius:14px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c);min-width:0')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <Avatar name={c.leadName} size={36} />
                  <div style={{ fontWeight: 700, overflowWrap: 'break-word', minWidth: 0 }}>{c.leadName}</div>
                </div>
                {c.abonnement ? (
                  <>
                    <div style={css('color:var(--muted,#8a8a8a);font-size:12.5px;margin-bottom:6px')}>
                      {c.abonnement.formule.nom} · {c.abonnement.seancesRestantes}/{c.abonnement.formule.nbSeances} séances
                    </div>
                    <div style={{ marginBottom: 14 }}>
                      <ProgressBar pct={pct} />
                    </div>
                  </>
                ) : (
                  <div style={css('color:var(--muted,#8a8a8a);font-size:13px;margin-bottom:14px')}>Aucun abonnement actif</div>
                )}
                {c.abonnement && c.abonnement.seancesRestantes > 0 && <PlanifierSeanceForm clientAccountId={c.clientAccountId} />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
