'use client';

import { useRouter } from 'next/navigation';
import { css } from '../lib/css.js';

// Barre du haut partagée par les espaces connectés grand public (client, coach) — mêmes
// identité visuelle et mécanique, seuls l'endpoint de déconnexion et la page de connexion
// à laquelle revenir changent.
export default function SpaceTopBar({ email, logoutUrl, loginUrl }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch(logoutUrl, { method: 'POST' });
    router.replace(loginUrl);
    router.refresh();
  };

  return (
    <div
      style={css(
        'display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid var(--border,rgba(255,255,255,.12))'
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-full.png" alt="GBÔ" width={83} height={30} style={{ height: 30, width: 'auto' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={css('color:var(--muted,#8a8a8a);font-size:13px')}>{email}</span>
        <button
          type="button"
          onClick={handleLogout}
          style={css(
            'padding:9px 16px;border-radius:10px;border:1px solid var(--border,rgba(255,255,255,.14));color:var(--fg,#fff);font-size:13px;font-weight:600'
          )}
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}
