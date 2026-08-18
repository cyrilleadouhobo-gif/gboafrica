'use client';

import { useState } from 'react';
import Link from 'next/link';
import { css } from '../lib/css.js';
import { useAppData } from '../context/AppData.js';
import { POLES, badgeStyle } from '../data/poles.js';

export default function Header() {
  const { theme, toggleTheme, showToast } = useAppData();
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  const poles = POLES.map((p) => ({
    ...p,
    statusLabel: p.status === 'op' ? 'Disponible' : 'Bientôt',
  }));

  const closeAll = () => {
    setMenuOpen(false);
    setMegaOpen(false);
  };

  return (
    <>
      <header
        style={css(
          "position:sticky;top:0;z-index:60;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:14px clamp(16px,4vw,48px);background:var(--headerbg,rgba(0,0,0,.72));backdrop-filter:blur(18px);border-bottom:1px solid var(--border,rgba(255,255,255,.1))"
        )}
      >
        <Link href="/" onClick={closeAll} style={css('display:flex;align-items:center;gap:10px;cursor:pointer')}>
          <span style={css("font-family:'Big Shoulders Display',sans-serif;font-weight:700;font-size:26px;letter-spacing:-1px;color:var(--fg,#fff)")}>
            GB<span style={{ color: 'var(--lime,#C6F202)' }}>Ô</span>
          </span>
          <span style={css('width:1px;height:22px;background:var(--border,rgba(255,255,255,.18))')} />
          <span style={css("font-size:10px;letter-spacing:1px;text-transform:uppercase;color:var(--muted,#8a8a8a);max-width:120px;line-height:1.25;font-weight:500")}>
            Plus qu&apos;une pratique,
            <br />
            un style de vie
          </span>
        </Link>

        <nav style={css('display:flex;align-items:center;gap:6px')} data-desktopnav="">
          <button
            onClick={() => setMegaOpen((v) => !v)}
            style={css("display:flex;align-items:center;gap:6px;padding:9px 14px;border-radius:10px;font-size:14px;font-weight:600;color:var(--fg,#fff)")}
          >
            Pôles
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <Link href="/about" onClick={closeAll} style={css('padding:9px 14px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer')}>
            À propos
          </Link>
          <Link href="/blog" onClick={closeAll} style={css('padding:9px 14px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer')}>
            Blog
          </Link>
        </nav>

        <div style={css('display:flex;align-items:center;gap:10px')}>
          <button
            onClick={toggleTheme}
            title="Changer de thème"
            style={css(
              "width:38px;height:38px;border-radius:10px;border:1px solid var(--border,rgba(255,255,255,.14));display:flex;align-items:center;justify-content:center;color:var(--fg,#fff)"
            )}
          >
            {theme === 'dark' ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4.5" />
                <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" />
              </svg>
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z" />
              </svg>
            )}
          </button>
          <button
            onClick={() => showToast('Espace membre — bientôt disponible.')}
            data-desktoponly=""
            style={css("padding:9px 14px;border-radius:10px;font-size:14px;font-weight:600;border:1px solid var(--border,rgba(255,255,255,.16));color:var(--fg,#fff)")}
          >
            Connexion
          </button>
          <Link
            href="/fitness"
            onClick={closeAll}
            style={css('padding:10px 18px;border-radius:10px;font-size:14px;font-weight:700;background:var(--lime,#C6F202);color:#000')}
          >
            Commencer
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

      {megaOpen && (
        <div
          style={css(
            "position:sticky;top:67px;z-index:55;background:var(--surface,#101010);border-bottom:1px solid var(--border,rgba(255,255,255,.1));padding:22px clamp(16px,4vw,48px);animation:fadeIn .2s both"
          )}
        >
          <div style={css('max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px')}>
            {poles.map((p) =>
              p.key === 'fitness' ? (
                <div
                  key={p.key}
                  style={css(
                    "padding:14px;border-radius:14px;border:1px solid var(--border,rgba(255,255,255,.08));background:var(--glass,rgba(255,255,255,.03))"
                  )}
                >
                  <div style={css('display:flex;gap:12px')}>
                    <div
                      style={css(
                        "flex:0 0 auto;width:40px;height:40px;border-radius:11px;background:var(--lime,#C6F202);color:#000;display:flex;align-items:center;justify-content:center;font-family:'Big Shoulders Display';font-weight:700"
                      )}
                    >
                      {p.mono}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontWeight: 700, fontSize: 15 }}>{p.name}</span>
                      <div style={css('font-size:12.5px;color:var(--muted,#8a8a8a);margin-top:2px;line-height:1.35')}>{p.tagline}</div>
                      <span style={css(badgeStyle(p.status))}>{p.statusLabel}</span>
                    </div>
                  </div>
                  <div style={css('display:grid;gap:6px;margin-top:12px')}>
                    <Link
                      href="/fitness"
                      onClick={closeAll}
                      style={css('padding:9px 11px;border-radius:9px;font-size:12.5px;font-weight:600;color:var(--fg,#ddd);border:1px solid var(--border,rgba(255,255,255,.08))')}
                    >
                      Particuliers
                    </Link>
                    <Link
                      href="/corporate"
                      onClick={closeAll}
                      style={css('padding:9px 11px;border-radius:9px;font-size:12.5px;font-weight:600;color:var(--fg,#ddd);border:1px solid var(--border,rgba(255,255,255,.08))')}
                    >
                      Entreprises
                    </Link>
                    <Link
                      href="/fitness/salles-partenaires"
                      onClick={closeAll}
                      style={css('padding:9px 11px;border-radius:9px;font-size:12.5px;font-weight:600;color:var(--fg,#ddd);border:1px solid var(--border,rgba(255,255,255,.08))')}
                    >
                      Salles partenaires
                    </Link>
                  </div>
                </div>
              ) : (
                <Link
                  key={p.key}
                  href={`/poles/${p.key}`}
                  onClick={closeAll}
                  style={css(
                    "display:flex;gap:12px;padding:14px;border-radius:14px;border:1px solid var(--border,rgba(255,255,255,.08));background:var(--glass,rgba(255,255,255,.03));cursor:pointer;transition:.18s"
                  )}
                >
                  <div
                    style={css(
                      "flex:0 0 auto;width:40px;height:40px;border-radius:11px;background:var(--lime,#C6F202);color:#000;display:flex;align-items:center;justify-content:center;font-family:'Big Shoulders Display';font-weight:700"
                    )}
                  >
                    {p.mono}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={css('display:flex;align-items:center;gap:8px')}>
                      <span style={{ fontWeight: 700, fontSize: 15 }}>{p.name}</span>
                    </div>
                    <div style={css('font-size:12.5px;color:var(--muted,#8a8a8a);margin-top:2px;line-height:1.35')}>{p.tagline}</div>
                    <span style={css(badgeStyle(p.status))}>{p.statusLabel}</span>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      )}

      {menuOpen && (
        <div
          style={css(
            "position:fixed;inset:0;z-index:80;background:var(--bg,#000);padding:20px clamp(16px,5vw,32px);overflow:auto;animation:fadeIn .2s both"
          )}
        >
          <div style={css('display:flex;justify-content:space-between;align-items:center;margin-bottom:28px')}>
            <span style={css("font-family:'Big Shoulders Display';font-weight:700;font-size:24px")}>
              GB<span style={{ color: 'var(--lime,#C6F202)' }}>Ô</span>
            </span>
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
            {poles.map((p) =>
              p.key === 'fitness' ? (
                <div key={p.key} style={css('padding:15px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.1))')}>
                  <div style={css('display:flex;align-items:center;justify-content:space-between;margin-bottom:10px')}>
                    <span style={{ fontWeight: 700, fontSize: 17 }}>{p.name}</span>
                    <span style={css(badgeStyle(p.status))}>{p.statusLabel}</span>
                  </div>
                  <div style={css('display:grid;gap:6px')}>
                    <Link href="/fitness" onClick={closeAll} style={css('padding:10px 4px;font-size:14.5px;font-weight:600;color:var(--muted,#c0c0c0)')}>
                      Particuliers
                    </Link>
                    <Link href="/corporate" onClick={closeAll} style={css('padding:10px 4px;font-size:14.5px;font-weight:600;color:var(--muted,#c0c0c0)')}>
                      Entreprises
                    </Link>
                    <Link href="/fitness/salles-partenaires" onClick={closeAll} style={css('padding:10px 4px;font-size:14.5px;font-weight:600;color:var(--muted,#c0c0c0)')}>
                      Salles partenaires
                    </Link>
                  </div>
                </div>
              ) : (
                <Link
                  key={p.key}
                  href={`/poles/${p.key}`}
                  onClick={closeAll}
                  style={css('display:flex;align-items:center;justify-content:space-between;padding:15px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.1))')}
                >
                  <span style={{ fontWeight: 700, fontSize: 17 }}>{p.name}</span>
                  <span style={css(badgeStyle(p.status))}>{p.statusLabel}</span>
                </Link>
              )
            )}
          </div>
          <div style={css('display:grid;gap:2px')}>
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
            href="/fitness"
            onClick={closeAll}
            style={css('margin-top:24px;width:100%;padding:16px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:16px;display:block;text-align:center')}
          >
            Commencer
          </Link>
        </div>
      )}
    </>
  );
}
