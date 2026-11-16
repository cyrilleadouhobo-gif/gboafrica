import { getCurrentClient } from '../../../../lib/clientAuth.js';
import { prisma } from '../../../../lib/db.js';
import { css } from '../../../../lib/css.js';
import { formatSeanceDateTime } from '../../../../lib/styleHelpers.js';
import { Avatar } from '../../../../components/DashboardKit.js';

export const metadata = { title: 'Mon coach — GBÔ', robots: { index: false, follow: false } };

function waLink(phone) {
  const digits = phone.replace(/[^\d]/g, '');
  return `https://wa.me/${digits}`;
}

export default async function ClientCoachPage() {
  const client = await getCurrentClient();
  const lead = await prisma.lead.findUnique({
    where: { id: client.leadId },
    select: { coach: { select: { name: true, spec: true, zones: true, phone: true, photoUrl: true } } },
  });
  const coach = lead?.coach;

  const prochaine = coach
    ? await prisma.seance.findFirst({
        where: { clientAccountId: client.id, statut: { notIn: ['ANNULEE', 'EN_REATTRIBUTION'] }, datePrevue: { gte: new Date() } },
        orderBy: { datePrevue: 'asc' },
        select: { datePrevue: true, lieu: true },
      })
    : null;

  return (
    <div>
      <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(22px,4vw,28px);margin-bottom:24px")}>Mon coach</h1>

      {!coach ? (
        <div
          style={css(
            'padding:22px;border-radius:16px;border:1px dashed var(--border,rgba(255,255,255,.18));color:var(--muted,#8a8a8a);font-size:14.5px'
          )}
        >
          Pas encore de coach attribué. Un conseiller GBÔ vous en attribuera un prochainement.
        </div>
      ) : (
        <div
          style={css(
            'padding:26px;border-radius:18px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c)'
          )}
        >
          <div style={css('display:flex;gap:18px;align-items:center;margin-bottom:20px;flex-wrap:wrap')}>
            {coach.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={coach.photoUrl} alt={coach.name} style={{ width: 84, height: 84, borderRadius: 20, objectFit: 'cover', flexShrink: 0 }} />
            ) : (
              <Avatar name={coach.name} size={84} />
            )}
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 20, overflowWrap: 'break-word' }}>{coach.name}</div>
              <div style={css('color:var(--muted,#8a8a8a);font-size:14px')}>Coach sportif · {coach.spec}</div>
              {coach.zones && (
                <div style={css('display:flex;flex-wrap:wrap;gap:6px;margin-top:8px')}>
                  {coach.zones
                    .split(/[,·]/)
                    .map((z) => z.trim())
                    .filter(Boolean)
                    .map((z) => (
                      <span
                        key={z}
                        style={css(
                          'padding:4px 10px;border-radius:20px;background:rgba(198,242,2,.1);color:var(--lime,#C6F202);border:1px solid rgba(198,242,2,.3);font-size:11.5px;font-weight:700'
                        )}
                      >
                        {z}
                      </span>
                    ))}
                </div>
              )}
            </div>
          </div>

          {prochaine && (
            <div style={css('padding:14px 16px;border-radius:12px;background:var(--surface2,#161616);font-size:13.5px;margin-bottom:20px')}>
              <span style={{ color: 'var(--muted,#8a8a8a)', fontWeight: 700 }}>Prochaine séance avec lui : </span>
              {formatSeanceDateTime(prochaine.datePrevue)}
              {prochaine.lieu ? ` · ${prochaine.lieu}` : ''}
            </div>
          )}

          {coach.phone ? (
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a
                href={waLink(coach.phone)}
                target="_blank"
                rel="noopener noreferrer"
                style={css('padding:13px 22px;border-radius:11px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:14px')}
              >
                Écrire sur WhatsApp
              </a>
              <a
                href={`tel:${coach.phone}`}
                style={css(
                  'padding:13px 22px;border-radius:11px;border:1px solid var(--border,rgba(255,255,255,.2));color:var(--fg,#fff);font-weight:700;font-size:14px'
                )}
              >
                Appeler
              </a>
            </div>
          ) : (
            <p style={css('color:var(--muted,#8a8a8a);font-size:13px')}>Coordonnées directes non renseignées — passez par l&apos;équipe GBÔ.</p>
          )}
        </div>
      )}
    </div>
  );
}
