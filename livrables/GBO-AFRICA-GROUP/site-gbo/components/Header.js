'use client';

import { useState } from 'react';
import Link from 'next/link';
import { css } from '../lib/css.js';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeAll = () => {
    setMenuOpen(false);
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
          <Link href="/fitness" onClick={closeAll} style={css('padding:9px 14px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer')}>
            GBÔ Fitness
          </Link>
          <Link href="/pour-les-salles" onClick={closeAll} style={css('padding:9px 14px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer')}>
            Pour les salles
          </Link>
          <Link href="/careers" onClick={closeAll} style={css('padding:9px 14px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer')}>
            Recrutement
          </Link>
          <Link href="/partners" onClick={closeAll} style={css('padding:9px 14px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer')}>
            Partenaires
          </Link>
          <Link href="/about" onClick={closeAll} style={css('padding:9px 14px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer')}>
            À propos
          </Link>
          <Link href="/blog" onClick={closeAll} style={css('padding:9px 14px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer')}>
            Blog
          </Link>
          <Link href="/contact" onClick={closeAll} style={css('padding:9px 14px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer')}>
            Contact
          </Link>
        </nav>

        <div style={css('display:flex;align-items:center;gap:10px')}>
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
          <div style={css('display:grid;gap:2px')}>
            <Link href="/fitness" onClick={closeAll} style={css("padding:14px 4px;font-size:18px;font-weight:600;border-bottom:1px solid var(--border,rgba(255,255,255,.08))")}>
              GBÔ Fitness
            </Link>
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
