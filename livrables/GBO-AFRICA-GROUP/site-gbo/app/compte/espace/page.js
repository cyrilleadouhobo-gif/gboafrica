import Link from 'next/link';
import { prisma } from '../../../lib/db.js';
import { getCurrentMember } from '../../../lib/memberAuth.js';
import { css } from '../../../lib/css.js';
import MemberLogoutButton from '../../../components/MemberLogoutButton.js';

const PLAN_LABEL = { GRATUIT: 'Gratuit', PREMIUM: 'Premium' };

export default async function EspaceMembrePage() {
  const member = await getCurrentMember();
  const subscription = await prisma.subscription.findUnique({ where: { memberId: member.id } });

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(100px,10vw,130px) clamp(20px,5vw,40px) clamp(64px,9vw,110px)' }}>
      <div style={css('display:flex;justify-content:space-between;align-items:center;margin-bottom:32px')}>
        <div>
          <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(22px,5vw,32px);margin-bottom:4px")}>
            Bonjour {member.firstName}
          </h1>
          <p style={css('color:var(--muted,#8a8a8a);font-size:14px')}>{member.email}</p>
        </div>
        <MemberLogoutButton />
      </div>

      <div
        style={css(
          'padding:28px;border-radius:20px;border:1px solid var(--border,rgba(255,255,255,.12));background:var(--surface,#0c0c0c);margin-bottom:20px'
        )}
      >
        <p style={css('font-size:12px;letter-spacing:.3px;color:var(--muted,#8a8a8a);text-transform:uppercase;margin-bottom:8px')}>
          Mon abonnement Club GBÔ
        </p>
        <div style={css('display:flex;align-items:center;gap:12px;margin-bottom:12px')}>
          <span
            style={css(
              `display:inline-block;padding:5px 14px;border-radius:20px;font-size:13px;font-weight:700;background:${
                subscription?.plan === 'PREMIUM' ? 'var(--lime,#C6F202)' : 'var(--surface2,#222)'
              };color:${subscription?.plan === 'PREMIUM' ? '#000' : 'var(--fg,#fff)'}`
            )}
          >
            {PLAN_LABEL[subscription?.plan] || 'Gratuit'}
          </span>
        </div>
        {subscription?.plan !== 'PREMIUM' && (
          <>
            <p style={css('color:var(--muted,#8a8a8a);font-size:14px;margin-bottom:16px;line-height:1.5')}>
              Passez au Club Premium (2 000 FCFA/mois) pour débloquer les contenus et avantages réservés aux membres.
            </p>
            <Link
              href="/club"
              style={css('display:inline-block;padding:13px 24px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:14px')}
            >
              Découvrir le Club Premium
            </Link>
          </>
        )}
      </div>

      <div style={css('padding:28px;border-radius:20px;border:1px solid var(--border,rgba(255,255,255,.12));background:var(--surface,#0c0c0c)')}>
        <p style={css('font-size:12px;letter-spacing:.3px;color:var(--muted,#8a8a8a);text-transform:uppercase;margin-bottom:12px')}>
          Mon profil
        </p>
        <div style={css('display:grid;gap:10px;font-size:14.5px')}>
          <div>
            <span style={{ color: 'var(--muted,#8a8a8a)' }}>Nom : </span>
            {member.firstName} {member.lastName}
          </div>
          <div>
            <span style={{ color: 'var(--muted,#8a8a8a)' }}>Téléphone : </span>
            {member.phone || '—'}
          </div>
        </div>
      </div>
    </div>
  );
}
