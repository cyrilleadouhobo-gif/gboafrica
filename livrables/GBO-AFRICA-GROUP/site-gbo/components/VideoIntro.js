'use client';

import { useState } from 'react';
import { css } from '../lib/css.js';

// Carte vidéo « cliquer pour lire » : pas de poster à générer, la vidéo ne se charge
// qu'au clic (léger tant qu'on ne l'a pas ouverte). Reprend l'esprit de la carte vidéo
// de l'ancien site (fond sombre, bouton play, libellé en overlay).
export default function VideoIntro({ src, label = "Vidéo d'introduction GBÔ" }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      style={css(
        'position:relative;border-radius:24px;overflow:hidden;border:1px solid var(--border,rgba(255,255,255,.12));background:#0c0c0c;aspect-ratio:16/9'
      )}
    >
      {playing ? (
        <video
          src={src}
          controls
          autoPlay
          playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', background: '#000' }}
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          aria-label="Lire la vidéo"
          style={css(
            'position:absolute;inset:0;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;cursor:pointer;background:linear-gradient(135deg,#141414,#000)'
          )}
        >
          <span
            className="btn-cta"
            style={css(
              'width:72px;height:72px;border-radius:50%;background:var(--lime,#C6F202);color:#000;display:flex;align-items:center;justify-content:center;box-shadow:0 14px 34px rgba(198,242,2,.32)'
            )}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 3 }}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span style={css('font-size:13px;font-weight:600;color:rgba(255,255,255,.75)')}>{label}</span>
        </button>
      )}
    </div>
  );
}
