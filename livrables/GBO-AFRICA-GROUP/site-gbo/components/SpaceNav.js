'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { css } from '../lib/css.js';

// Navigation partagée espace client / espace coach : barre horizontale sous le topbar sur
// tablette/desktop, barre fixe en bas sur mobile (mêmes items, voir globals.css pour le
// basculement par breakpoint). `items` = [{ href, label, icon }].
export default function SpaceNav({ items }) {
  const pathname = usePathname();
  const isActive = (href) => pathname === href;

  return (
    <>
      <nav
        data-space-nav-desktop
        style={css('justify-content:center;gap:4px;padding:0 20px;border-bottom:1px solid var(--border,rgba(255,255,255,.1));overflow-x:auto')}
      >
        {items.map((it) => {
          const active = isActive(it.href);
          return (
            <Link
              key={it.href}
              href={it.href}
              style={css(
                `display:inline-flex;align-items:center;gap:8px;padding:14px 16px;font-size:13.5px;font-weight:700;white-space:nowrap;border-bottom:2px solid ${
                  active ? 'var(--lime,#C6F202)' : 'transparent'
                };color:${active ? 'var(--lime,#C6F202)' : 'var(--muted,#8a8a8a)'}`
              )}
            >
              {it.icon}
              {it.label}
            </Link>
          );
        })}
      </nav>

      <nav
        data-space-nav-mobile
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 30,
          gridTemplateColumns: `repeat(${items.length}, 1fr)`,
          background: 'var(--headerbg,rgba(0,0,0,.88))',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid var(--border,rgba(255,255,255,.12))',
        }}
      >
        {items.map((it) => {
          const active = isActive(it.href);
          return (
            <Link
              key={it.href}
              href={it.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
                padding: '10px 4px 12px',
                fontSize: 11,
                fontWeight: 700,
                color: active ? 'var(--lime,#C6F202)' : 'var(--muted,#8a8a8a)',
              }}
            >
              {it.icon}
              {it.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
