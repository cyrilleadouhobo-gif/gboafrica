'use client';

import { useEffect, useRef, useState } from 'react';

// Carrousel plein écran du hero d'accueil : une photo à la fois, fondu enchaîné, défilement
// automatique + puces cliquables. Remplace l'ancien bandeau défilant (HeroSlideshow), jugé
// trop chargé visuellement — l'objectif ici est un rendu institutionnel, sobre, une image
// à la fois derrière le texte.
export default function HeroCarousel({ slides, interval = 6000, dotsBottom = 64 }) {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, interval);
    return () => clearInterval(timerRef.current);
  }, [slides.length, interval]);

  const goTo = (i) => {
    setActive(i);
    // Redémarre le minuteur pour éviter un changement de slide juste après un clic.
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((n) => (n + 1) % slides.length);
    }, interval);
  };

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }} aria-hidden="true">
      {slides.map((s, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={s.src}
          src={s.src}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            // Point focal réglable par slide (défaut : centre) — sur mobile, le format très
            // vertical du hero recadre agressivement une photo pensée pour un cadrage large ;
            // sans ça le sujet peut disparaître hors champ (cas vécu avec une photo carrée).
            objectPosition: s.position || 'center',
            opacity: i === active ? 1 : 0,
            // Léger flou pendant le fondu (sous la limite de 20px recommandée) pour masquer
            // la double exposition visible quand deux photos différentes se chevauchent à
            // l'écran pendant la transition — audit du 09/11/2026.
            filter: i === active ? 'blur(0px)' : 'blur(6px)',
            transition: 'opacity 1.4s var(--ease-in-out), filter 1.4s var(--ease-in-out)',
          }}
        />
      ))}
      <div style={{ position: 'absolute', bottom: dotsBottom, right: 'clamp(20px,5vw,64px)', display: 'flex', gap: 8, zIndex: 2 }}>
        {slides.map((s, i) => (
          // Largeur fixe (22px) sur le bouton : la puce active grandit via `transform` plutôt
          // que `width`, qui déclenchait un recalcul de mise en page à chaque bascule — audit
          // du 09/11/2026. `transform-origin: left` garde le bord gauche fixe, comme avant.
          <button
            key={s.src}
            onClick={() => goTo(i)}
            aria-hidden="true"
            tabIndex={-1}
            style={{ width: 22, height: 8, padding: 0, background: 'none', cursor: 'pointer' }}
          >
            <span
              style={{
                display: 'block',
                width: 22,
                height: 8,
                borderRadius: 4,
                background: i === active ? '#C6F202' : 'rgba(255,255,255,.4)',
                transform: i === active ? 'scaleX(1)' : 'scaleX(0.364)',
                transformOrigin: 'left center',
                transition: 'transform .3s ease, background .3s ease',
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
