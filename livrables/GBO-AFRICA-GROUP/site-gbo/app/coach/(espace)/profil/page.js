import Link from 'next/link';
import { getCurrentCoach } from '../../../../lib/coachAuth.js';
import { prisma } from '../../../../lib/db.js';
import { css } from '../../../../lib/css.js';
import { Avatar } from '../../../../components/DashboardKit.js';

export const metadata = { title: 'Mon profil — GBÔ', robots: { index: false, follow: false } };

export default async function CoachProfilPage() {
  const coachAccount = await getCurrentCoach();
  const coach = await prisma.coach.findUnique({
    where: { id: coachAccount.coachId },
    select: { name: true, spec: true, zones: true, phone: true, photoUrl: true, dispo: true },
  });

  const champs = [
    ['Spécialités', coach?.spec],
    ['Zones', coach?.zones],
    ['Téléphone', coach?.phone],
    ['Disponibilité', coach?.dispo === 'DISPONIBLE' ? 'Disponible' : 'Complet'],
  ].filter(([, v]) => v);

  return (
    <div>
      <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(22px,4vw,28px);margin-bottom:24px")}>Mon profil</h1>

      <div
        style={css(
          'padding:26px;border-radius:18px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c);margin-bottom:16px'
        )}
      >
        <div style={css('display:flex;gap:16px;align-items:center;margin-bottom:20px;flex-wrap:wrap')}>
          {coach?.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={coach.photoUrl} alt={coach.name} style={{ width: 72, height: 72, borderRadius: 18, objectFit: 'cover', flexShrink: 0 }} />
          ) : (
            <Avatar name={coach?.name} size={72} />
          )}
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 19, overflowWrap: 'break-word' }}>{coach?.name}</div>
            <div style={css('color:var(--muted,#8a8a8a);font-size:13.5px;overflow-wrap:break-word')}>{coachAccount.email}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 10 }}>
          {champs.map(([label, valeur]) => (
            <div key={label} style={css('padding:12px 14px;border-radius:10px;background:var(--surface2,#161616);font-size:13.5px')}>
              <span style={{ color: 'var(--muted,#8a8a8a)', fontWeight: 700 }}>{label} : </span>
              {valeur}
            </div>
          ))}
        </div>
      </div>

      <div
        style={css(
          'padding:18px 20px;border-radius:14px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c)'
        )}
      >
        <div style={{ fontWeight: 700, marginBottom: 4 }}>Mot de passe</div>
        <p style={css('color:var(--muted,#8a8a8a);font-size:13px;margin-bottom:12px')}>
          Vos informations (spécialités, zones, coordonnées) sont gérées par l&apos;équipe GBÔ.
        </p>
        <Link
          href="/coach/changer-mot-de-passe"
          style={css('display:inline-block;padding:11px 18px;border-radius:10px;border:1px solid var(--border,rgba(255,255,255,.2));color:var(--fg,#fff);font-weight:700;font-size:13px')}
        >
          Changer de mot de passe
        </Link>
      </div>
    </div>
  );
}
