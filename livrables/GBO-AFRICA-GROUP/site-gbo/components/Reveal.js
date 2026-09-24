'use client';

import { useEffect, useRef, useState } from 'react';

// Fades + slides an element up the first time it scrolls into view. Uses a plain class
// toggle + CSS transition (see .reveal in globals.css) rather than a library — one
// IntersectionObserver per element is cheap enough for a page with a few dozen sections/cards.
export default function Reveal({ children, as: Tag = 'div', delay = 0, className = '', style = {}, ...props }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // An element that mounts already inside (or nearly inside) the viewport — e.g. a card
    // re-rendered in place after a filter click, not scrolled to — must not wait on the
    // IntersectionObserver's first callback, which can lag behind a burst of DOM changes
    // and leave it stuck invisible indefinitely since nothing will scroll to re-trigger it.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Tag>
  );
}
