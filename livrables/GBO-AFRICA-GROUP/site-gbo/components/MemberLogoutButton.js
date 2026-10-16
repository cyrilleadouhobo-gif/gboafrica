'use client';

import { useRouter } from 'next/navigation';
import { css } from '../lib/css.js';

export default function MemberLogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/member/logout', { method: 'POST' });
    router.replace('/compte');
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      style={css(
        'padding:10px 18px;border-radius:10px;border:1px solid var(--border,rgba(255,255,255,.14));background:transparent;color:var(--fg,#fff);font-size:13.5px;cursor:pointer'
      )}
    >
      Se déconnecter
    </button>
  );
}
