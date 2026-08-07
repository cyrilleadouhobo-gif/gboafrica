import Link from 'next/link';
import { css } from '../lib/css.js';
import { POLES } from '../data/poles.js';
import { SOCIALS } from '../data/content.js';

export default function Footer() {
  return (
    <footer style={css('background:var(--footerbg,#050505);border-top:1px solid var(--border,rgba(255,255,255,.1));padding:clamp(48px,7vw,80px) clamp(20px,5vw,64px) 32px')}>
      <div style={css('max-width:1200px;margin:0 auto')}>
        <div
          style={css(
            'display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:36px;padding-bottom:40px;border-bottom:1px solid var(--border,rgba(255,255,255,.1))'
          )}
        >
          <div style={{ gridColumn: 'span 1', minWidth: 200 }}>
            <div style={css("font-family:'Space Grotesk';font-weight:700;font-size:28px;letter-spacing:-1px")}>
              GB<span style={{ color: 'var(--lime,#C6F202)' }}>Ô</span>
            </div>
            <p style={css('font-size:13px;color:var(--muted,#8a8a8a);margin:12px 0;line-height:1.5')}>
              Plus qu&apos;une pratique, un style de vie.
              <br />
              Abidjan — Côte d&apos;Ivoire
            </p>
            <div style={css('display:flex;gap:10px;margin-top:14px')}>
              {SOCIALS.map((s, i) => (
                <span
                  key={i}
                  style={css(
                    'width:36px;height:36px;border-radius:10px;border:1px solid var(--border,rgba(255,255,255,.14));display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--muted,#8a8a8a)'
                  )}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div style={css('font-size:12px;letter-spacing:1px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:600;margin-bottom:14px')}>Pôles</div>
            <div style={css('display:grid;gap:9px;font-size:14px')}>
              {POLES.map((p) => (
                <Link key={p.key} href={p.key === 'fitness' ? '/fitness' : `/poles/${p.key}`} style={css('color:var(--fg,#ddd);cursor:pointer')}>
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div style={css('font-size:12px;letter-spacing:1px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:600;margin-bottom:14px')}>Contenu</div>
            <div style={css('display:grid;gap:9px;font-size:14px')}>
              <Link href="/about">À propos</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/news">Actualités</Link>
              <Link href="/careers">Carrières</Link>
              <Link href="/partners">Partenaires</Link>
            </div>
          </div>
          <div>
            <div style={css('font-size:12px;letter-spacing:1px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:600;margin-bottom:14px')}>Relation</div>
            <div style={css('display:grid;gap:9px;font-size:14px')}>
              <Link href="/contact">Contact</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/corporate">Entreprises</Link>
              <Link href="/admin">Back-office</Link>
            </div>
          </div>
          <div>
            <div style={css('font-size:12px;letter-spacing:1px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:600;margin-bottom:14px')}>Légal</div>
            <div style={css('display:grid;gap:9px;font-size:14px')}>
              <Link href="/legal/mentions">Mentions légales</Link>
              <Link href="/legal/cgu">CGU</Link>
              <Link href="/legal/cgv">CGV</Link>
              <Link href="/legal/privacy">Confidentialité</Link>
            </div>
          </div>
        </div>
        <div style={css('display:flex;flex-wrap:wrap;justify-content:space-between;gap:14px;padding-top:24px;font-size:12.5px;color:var(--muted,#8a8a8a)')}>
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
