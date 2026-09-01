'use client';

import { useEffect, useRef, useState } from 'react';

// Carrousel plein écran du hero d'accueil : une photo à la fois, fondu enchaîné, défilement
// automatique + puces cliquables. Remplace l'ancien bandeau défilant (HeroSlideshow), jugé
// trop chargé visuellement — l'objectif ici est un rendu institutionnel, sobre, une image
// à la fois derrière le texte.
export default function HeroCarousel({ slides, interval = 6000 }) {
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
            opacity: i === active ? 1 : 0,
            transition: 'opacity 1.4s ease',
          }}
        />
      ))}
      <div style={{ position: 'absolute', bottom: 64, right: 'clamp(20px,5vw,64px)', display: 'flex', gap: 8, zIndex: 2 }}>
        {slides.map((s, i) => (
          <button
            key={s.src}
            onClick={() => goTo(i)}
            aria-hidden="true"
            tabIndex={-1}
            style={{
              width: i === active ? 22 : 8,
              height: 8,
              borderRadius: 4,
              background: i === active ? '#C6F202' : 'rgba(255,255,255,.4)',
              transition: 'width .3s ease, background .3s ease',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
    </div>
  );
}
