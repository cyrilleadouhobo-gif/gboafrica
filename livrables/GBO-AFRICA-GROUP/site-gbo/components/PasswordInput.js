'use client';

import { useState } from 'react';
import { css } from '../lib/css.js';

// Champ mot de passe avec bouton oeil pour afficher/masquer la saisie.
// Utilisé sur les pages de connexion (admin, espace partenaire nutrition).
export default function PasswordInput({ style, ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <input
        {...props}
        type={visible ? 'text' : 'password'}
        style={{
          ...css(
            "padding:15px;padding-right:46px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.14));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:15px;width:100%"
          ),
          ...style,
        }}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
        style={css(
          'position:absolute;top:0;right:0;height:100%;width:46px;display:flex;align-items:center;justify-content:center;color:var(--muted,#8a8a8a);cursor:pointer'
        )}
      >
        {visible ? (
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        ) : (
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3l18 18" />
            <path d="M10.6 5.1A10.7 10.7 0 0112 5c6.5 0 10 7 10 7a17.7 17.7 0 01-3.2 4.1M6.6 6.6C3.7 8.4 2 12 2 12s3.5 7 10 7a10.4 10.4 0 004.4-.9" />
            <path d="M9.9 9.9a3 3 0 004.2 4.2" />
          </svg>
        )}
      </button>
    </div>
  );
}
