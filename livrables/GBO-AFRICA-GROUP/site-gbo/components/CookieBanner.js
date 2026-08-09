'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { css } from '../lib/css.js';

const CONSENT_KEY = 'gbo_cookie_consent';

// The site sets exactly one cookie today (gbo_session, strictly necessary — admin auth,
// httpOnly). Strictly-necessary cookies don't legally require consent, but we show this
// banner anyway so the mechanism (and the localStorage consent flag future analytics/
// marketing scripts should check before loading) is in place ahead of time.
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
    } catch {
      // localStorage unavailable (private mode / blocked) — skip the banner rather than crash.
    }
  }, []);

  const choose = (value) => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Préférences cookies"
      style={css(
        'position:fixed;left:0;right:0;bottom:0;z-index:130;display:flex;justify-content:center;padding:16px;pointer-events:none'
      )}
    >
      <div
        style={css(
          'pointer-events:auto;max-width:760px;width:100%;display:flex;flex-wrap:wrap;align-items:center;gap:16px;padding:18px 22px;border-radius:16px;background:#141414;border:1px solid var(--border,rgba(255,255,255,.14));box-shadow:0 20px 50px rgba(0,0,0,.5);animation:fadeUp .3s both'
        )}
      >
        <p style={css('flex:1;min-width:220px;font-size:13.5px;line-height:1.5;color:var(--muted,#8a8a8a);margin:0')}>
          Nous utilisons uniquement des cookies strictement nécessaires au fonctionnement du site (connexion à
          l&apos;espace admin). Aucun cookie de mesure d&apos;audience ou publicitaire n&apos;est déposé à ce jour.{' '}
          <Link href="/legal/privacy" style={{ color: 'var(--lime,#C6F202)' }}>
            En savoir plus
          </Link>
        </p>
        <div style={css('display:flex;gap:10px;flex:0 0 auto')}>
          <button
            onClick={() => choose('rejected')}
            style={css(
              'padding:10px 18px;border-radius:10px;border:1px solid var(--border,rgba(255,255,255,.18));background:transparent;color:#fff;font-size:13.5px;font-weight:600'
            )}
          >
            Refuser
          </button>
          <button
            onClick={() => choose('accepted')}
            style={css('padding:10px 18px;border-radius:10px;background:var(--lime,#C6F202);color:#000;font-size:13.5px;font-weight:700')}
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
