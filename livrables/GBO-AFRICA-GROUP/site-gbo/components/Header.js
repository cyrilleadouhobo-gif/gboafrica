'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { css } from '../lib/css.js';
import { POLES, badgeStyle } from '../data/poles.js';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [polesOpen, setPolesOpen] = useState(false);
  const pathname = usePathname();

  const poles = POLES.map((p) => ({ ...p, statusLabel: p.status === 'op' ? 'Disponible' : 'Bientôt' }));

  const closeAll = () => {
    setMenuOpen(false);
    setPolesOpen(false);
  };

  if (pathname === '/admin/login') return null;

  return (
    <>
      <header
        style={css(
          "font-family:'Broaven',sans-serif;position:sticky;top:0;z-index:60;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:14px clamp(16px,4vw,48px);background:var(--headerbg,rgba(0,0,0,.72));backdrop-filter:blur(18px);border-bottom:1px solid var(--border,rgba(255,255,255,.1))"
        )}
      >
        <Link href="/" onClick={closeAll} style={css('display:flex;align-items:center;cursor:pointer')}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-full.png" alt="GBÔ — Plus qu'une pratique, un style de vie" width={111} height={40} style={{ height: 40, width: 'auto' }} />
        </Link>

        <nav style={css('display:flex;align-items:center;gap:6px')} data-desktopnav="">
          <button
            onClick={() => setPolesOpen((v) => !v)}
            style={css(
              "display:flex;align-items:center;gap:6px;padding:8px 11px;border-radius:10px;font-size:13.5px;font-weight:600;white-space:nowrap;color:var(--fg,#fff);cursor:pointer"
            )}
          >
            Pôles
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              style={{ transform: polesOpen ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <Link href="/pour-les-salles" onClick={closeAll} style={css('padding:8px 11px;border-radius:10px;font-size:13.5px;font-weight:600;white-space:nowrap;cursor:pointer')}>
            Pour les salles
          </Link>
          <Link href="/careers" onClick={closeAll} style={css('padding:8px 11px;border-radius:10px;font-size:13.5px;font-weight:600;white-space:nowrap;cursor:pointer')}>
            Recrutement
          </Link>
          <Link href="/partners" onClick={closeAll} style={css('padding:8px 11px;border-radius:10px;font-size:13.5px;font-weight:600;white-space:nowrap;cursor:pointer')}>
            Partenaires
          </Link>
          <Link href="/about" onClick={closeAll} style={css('padding:8px 11px;border-radius:10px;font-size:13.5px;font-weight:600;white-space:nowrap;cursor:pointer')}>
            À propos
          </Link>
          <Link href="/blog" onClick={closeAll} style={css('padding:8px 11px;border-radius:10px;font-size:13.5px;font-weight:600;white-space:nowrap;cursor:pointer')}>
            Blog
          </Link>
          <Link href="/contact" onClick={closeAll} style={css('padding:8px 11px;border-radius:10px;font-size:13.5px;font-weight:600;white-space:nowrap;cursor:pointer')}>
            Contact
          </Link>
        </nav>

        <div style={css('display:flex;align-items:center;gap:10px')}>
          <Link
            href="/deux-seances-gratuites"
            onClick={closeAll}
            className="btn-cta"
            data-hidesmallmobile=""
            style={css('padding:9px 16px;border-radius:10px;font-size:14px;font-weight:700;white-space:nowrap;background:var(--lime,#C6F202);color:#000')}
          >
            Deux séances gratuites
          </Link>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            data-mobileonly=""
            style={css(
              "width:38px;height:38px;border-radius:10px;border:1px solid var(--border,rgba(255,255,255,.16));display:none;align-items:center;justify-content:center;color:var(--fg,#fff)"
            )}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </header>

      {polesOpen && (
        <div
          data-desktopnav=""
          style={css(
            "font-family:'Broaven',sans-serif;position:sticky;top:68px;z-index:55;background:var(--surface,#101010);border-bottom:1px solid var(--border,rgba(255,255,255,.1));padding:22px clamp(16px,4vw,48px);animation:fadeIn .2s both"
          )}
        >
          <div style={css('max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px')}>
            {poles.map((p) => (
              <Link
                key={p.key}
                href={p.key === 'fitness' ? '/fitness' : `/poles/${p.key}`}
                onClick={closeAll}
                style={css(
                  "display:flex;gap:12px;padding:14px;border-radius:14px;border:1px solid var(--border,rgba(255,255,255,.08));background:var(--glass,rgba(255,255,255,.03));cursor:pointer"
                )}
              >
                <div
                  style={css(
                    "flex:0 0 auto;width:40px;height:40px;border-radius:11px;background:var(--lime,#C6F202);color:#000;display:flex;align-items:center;justify-content:center;font-family:'Broaven';font-weight:700"
                  )}
                >
                  {p.mono}
                </div>
                <div style={{ minWidth: 0 }}>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>{p.name}</span>
                  <div style={css('font-size:12.5px;color:var(--muted,#8a8a8a);margin-top:2px;line-height:1.35')}>{p.tagline}</div>
                  <span style={css(badgeStyle(p.status))}>{p.statusLabel}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {menuOpen && (
        <div
          style={css(
            "font-family:'Broaven',sans-serif;position:fixed;inset:0;z-index:80;background:var(--bg,#000);padding:20px clamp(16px,5vw,32px);overflow:auto;animation:fadeIn .2s both"
          )}
        >
          <div style={css('display:flex;justify-content:space-between;align-items:center;margin-bottom:28px')}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-full.png" alt="GBÔ — Plus qu'une pratique, un style de vie" width={108} height={39} style={{ height: 39, width: 'auto' }} />
            <button
              onClick={() => setMenuOpen(false)}
              style={css(
                "width:40px;height:40px;border-radius:10px;border:1px solid var(--border,rgba(255,255,255,.16));display:flex;align-items:center;justify-content:center"
              )}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <div style={css('font-size:11px;letter-spacing:1px;text-transform:uppercase;color:var(--muted,#8a8a8a);margin:6px 0 12px')}>Pôles</div>
          <div style={css('display:grid;gap:8px;margin-bottom:22px')}>
            {poles.map((p) => (
              <Link
                key={p.key}
                href={p.key === 'fitness' ? '/fitness' : `/poles/${p.key}`}
                onClick={closeAll}
                style={css(
                  'display:flex;align-items:center;justify-content:space-between;padding:15px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.1))'
                )}
              >
                <span style={{ fontWeight: 700, fontSize: 17 }}>{p.name}</span>
                <span style={css(badgeStyle(p.status))}>{p.statusLabel}</span>
              </Link>
            ))}
          </div>
          <div style={css('display:grid;gap:2px')}>
            <Link href="/pour-les-salles" onClick={closeAll} style={css("padding:14px 4px;font-size:18px;font-weight:600;border-bottom:1px solid var(--border,rgba(255,255,255,.08))")}>
              Pour les salles
            </Link>
            <Link href="/careers" onClick={closeAll} style={css("padding:14px 4px;font-size:18px;font-weight:600;border-bottom:1px solid var(--border,rgba(255,255,255,.08))")}>
              Recrutement
            </Link>
            <Link href="/partners" onClick={closeAll} style={css("padding:14px 4px;font-size:18px;font-weight:600;border-bottom:1px solid var(--border,rgba(255,255,255,.08))")}>
              Partenaires
            </Link>
            <Link href="/about" onClick={closeAll} style={css("padding:14px 4px;font-size:18px;font-weight:600;border-bottom:1px solid var(--border,rgba(255,255,255,.08))")}>
              À propos
            </Link>
            <Link href="/blog" onClick={closeAll} style={css("padding:14px 4px;font-size:18px;font-weight:600;border-bottom:1px solid var(--border,rgba(255,255,255,.08))")}>
              Blog
            </Link>
            <Link href="/news" onClick={closeAll} style={css("padding:14px 4px;font-size:18px;font-weight:600;border-bottom:1px solid var(--border,rgba(255,255,255,.08))")}>
              Actualités
            </Link>
            <Link href="/coachs" onClick={closeAll} style={css("padding:14px 4px;font-size:18px;font-weight:600;border-bottom:1px solid var(--border,rgba(255,255,255,.08))")}>
              Nos coachs
            </Link>
            <Link href="/avis" onClick={closeAll} style={css("padding:14px 4px;font-size:18px;font-weight:600;border-bottom:1px solid var(--border,rgba(255,255,255,.08))")}>
              Avis clients
            </Link>
            <Link href="/contact" onClick={closeAll} style={css("padding:14px 4px;font-size:18px;font-weight:600;border-bottom:1px solid var(--border,rgba(255,255,255,.08))")}>
              Contact
            </Link>
            <Link href="/admin" onClick={closeAll} style={css("padding:14px 4px;font-size:18px;font-weight:600;border-bottom:1px solid var(--border,rgba(255,255,255,.08))")}>
              Back-office
            </Link>
            <Link
              href="/partenaires/nutrition/login"
              onClick={closeAll}
              style={css("padding:14px 4px;font-size:18px;font-weight:600;border-bottom:1px solid var(--border,rgba(255,255,255,.08))")}
            >
              Espace partenaire nutrition
            </Link>
          </div>
          <Link
            href="/deux-seances-gratuites"
            onClick={closeAll}
            style={css('margin-top:24px;width:100%;padding:16px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:16px;display:block;text-align:center')}
          >
            Deux séances gratuites
          </Link>
        </div>
      )}
    </>
  );
}
