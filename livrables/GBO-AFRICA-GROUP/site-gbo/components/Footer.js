'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { css } from '../lib/css.js';
import { POLES } from '../data/poles.js';
import { SOCIALS } from '../data/content.js';

// Simplified single-color brand marks (currentColor) — matches the inline-icon style used
// elsewhere in the site (see app/contact/page.js) rather than pulling in an icon library.
function SocialIcon({ label }) {
  const props = { width: 16, height: 16, viewBox: '0 0 24 24' };
  if (label === 'FB') {
    return (
      <svg {...props} fill="currentColor">
        <path d="M22.675 0h-21.35C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.002c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.115C23.407 24 24 23.407 24 22.676V1.325C24 .593 23.407 0 22.675 0z" />
      </svg>
    );
  }
  if (label === 'IG') {
    return (
      <svg {...props} fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (label === 'TT') {
    return (
      <svg {...props} fill="currentColor">
        <path d="M16.5 2h-3.1v13.6c0 1.5-1.2 2.7-2.7 2.7-1.5 0-2.7-1.2-2.7-2.7 0-1.5 1.2-2.7 2.7-2.7.3 0 .5 0 .8.1v-3.2c-.3 0-.5-.1-.8-.1-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6V9.1c1.2.9 2.7 1.4 4.3 1.4V7.4c-2.5 0-4.5-2-4.5-4.5V2z" />
      </svg>
    );
  }
  return (
    <svg {...props} fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function Footer() {
  const pathname = usePathname();
  if (pathname === '/admin/login') return null;

  return (
    <footer
      style={css(
        "font-family:'Broaven',sans-serif;background:var(--footerbg,#050505);border-top:1px solid var(--border,rgba(255,255,255,.1));padding:clamp(48px,7vw,80px) clamp(20px,5vw,64px) 32px"
      )}
    >
      <div style={css('max-width:1200px;margin:0 auto')}>
        <div
          style={css(
            'display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:36px;padding-bottom:40px;border-bottom:1px solid var(--border,rgba(255,255,255,.1))'
          )}
        >
          <div style={{ gridColumn: 'span 1', minWidth: 200 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-full.png" alt="GBÔ — Plus qu'une pratique, un style de vie" width={111} height={40} style={{ height: 40, width: 'auto' }} />
            <p style={css('font-size:13px;color:var(--muted,#8a8a8a);margin:12px 0;line-height:1.5')}>Abidjan — Côte d&apos;Ivoire</p>
            <div style={css('display:flex;gap:10px;margin-top:14px')}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className="social-badge"
                  style={css(
                    'width:36px;height:36px;border-radius:10px;border:1px solid var(--border,rgba(255,255,255,.14));display:flex;align-items:center;justify-content:center;color:var(--muted,#8a8a8a);cursor:pointer'
                  )}
                >
                  <SocialIcon label={s.label} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div style={css('font-size:13px;letter-spacing:1px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:600;margin-bottom:14px')}>Pôles</div>
            <div style={css('display:grid;gap:9px;font-size:15.5px')}>
              {POLES.map((p) => (
                <Link key={p.key} href={p.key === 'fitness' ? '/fitness' : `/poles/${p.key}`} style={css('color:var(--fg,#ddd);cursor:pointer')}>
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div style={css('font-size:13px;letter-spacing:1px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:600;margin-bottom:14px')}>Contenu</div>
            <div style={css('display:grid;gap:9px;font-size:15.5px')}>
              <Link href="/about">À propos</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/news">Actualités</Link>
              <Link href="/avis">Avis clients</Link>
              <Link href="/devenir-coach">Devenir coach</Link>
              <Link href="/careers">Carrières</Link>
              <Link href="/partners">Partenaires</Link>
              <Link href="/devenir-salle-partenaire">Salles partenaires</Link>
            </div>
          </div>
          <div>
            <div style={css('font-size:13px;letter-spacing:1px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:600;margin-bottom:14px')}>Relation</div>
            <div style={css('display:grid;gap:9px;font-size:15.5px')}>
              <Link href="/contact">Contact</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/corporate">Entreprises</Link>
              <Link href="/admin">Back-office</Link>
              <Link href="/partenaires/nutrition/login">Espace partenaire nutrition</Link>
            </div>
          </div>
          <div>
            <div style={css('font-size:13px;letter-spacing:1px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:600;margin-bottom:14px')}>Légal</div>
            <div style={css('display:grid;gap:9px;font-size:15.5px')}>
              <Link href="/legal/mentions">Mentions légales</Link>
              <Link href="/legal/cgu">CGU</Link>
              <Link href="/legal/cgv">CGV</Link>
              <Link href="/legal/privacy">Confidentialité</Link>
            </div>
          </div>
        </div>
        <div style={css('display:flex;flex-wrap:wrap;justify-content:space-between;gap:14px;padding-top:24px;font-size:13.5px;color:var(--muted,#8a8a8a)')}>
          <span>© 2026 GBÔ AFRICA GROUP. Tous droits réservés.</span>
          <div style={css('display:flex;gap:16px;align-items:center')}>
            <span style={{ opacity: 0.6 }}>Conforme ARTCI · Loi n° 2013-450</span>
            <span
              style={css(
                'display:inline-flex;align-items:center;gap:6px;padding:5px 10px;border-radius:8px;border:1px solid var(--border,rgba(255,255,255,.14));opacity:.7'
              )}
            >
              FR ▾
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
