'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { css } from '../../lib/css.js';
import ImageSlot from '../../components/ImageSlot.js';
import Reveal from '../../components/Reveal.js';
import GlowBlobs from '../../components/GlowBlobs.js';
import { stockPhoto, stockPhotoDirect } from '../../lib/stockPhoto.js';
import { JOBS } from '../../data/content.js';

// Icônes des points forts du hero et des types de postes (trait, viewBox 24x24) — même style
// que le reste du site (ICONS de data/poles.js, SEGMENTS de app/page.js).
const TRUST_ICONS = {
  impact: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="8" r="2.5" />
      <path d="M2 21c0-3.5 3-6 7-6s7 2.5 7 6" />
      <path d="M16.5 15.2c2.6.5 4.5 2.7 4.5 5.8" />
    </>
  ),
  growth: (
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </>
  ),
  africa: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.4 2.5 2.4 15.5 0 18M12 3c-2.4 2.5-2.4 15.5 0 18" />
    </>
  ),
};

const TRUST_POINTS = [
  { t: 'Un projet à impact', icon: TRUST_ICONS.impact },
  { t: "Des opportunités d'évolution", icon: TRUST_ICONS.growth },
  { t: 'Une aventure africaine', icon: TRUST_ICONS.africa },
];

const JOB_ICONS = {
  person: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </>
  ),
  baby: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 16.2s-4-2.5-4-5.5A2.5 2.5 0 0112 8.2a2.5 2.5 0 014 2.5c0 3-4 5.5-4 5.5z" />
    </>
  ),
  headset: (
    <>
      <path d="M4 13a8 8 0 0116 0" />
      <rect x="2" y="13" width="4" height="6" rx="2" />
      <rect x="18" y="13" width="4" height="6" rx="2" />
    </>
  ),
  megaphone: (
    <>
      <path d="M3 11v2a2 2 0 002 2h1l9 4V5l-9 4H5a2 2 0 00-2 2z" />
      <path d="M17 9a4 4 0 010 6" />
    </>
  ),
  handshake: (
    <>
      <circle cx="8" cy="12" r="5" />
      <circle cx="16" cy="12" r="5" />
    </>
  ),
  graduation: (
    <>
      <path d="M2 9l10-5 10 5-10 5-10-5z" />
      <path d="M6 11v4c0 1.5 2.7 3 6 3s6-1.5 6-3v-4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  chart: <path d="M4 19V9M11 19V4M18 19v-7" />,
};

// Couleurs discrètes par pôle (badges + filtres uniquement) pour repérer rapidement l'origine
// d'un poste dans une liste mêlant plusieurs pôles — seule utilisation de couleurs autres que
// le lime sur le site, volontairement limitée à ce contexte de repérage.
const POLE_STYLE = {
  fitness: { fg: '#C6F202', bg: 'rgba(198,242,2,.12)', border: 'rgba(198,242,2,.4)' },
  academy: { fg: '#6FB1FF', bg: 'rgba(111,177,255,.12)', border: 'rgba(111,177,255,.4)' },
  events: { fg: '#FFA855', bg: 'rgba(255,168,85,.12)', border: 'rgba(255,168,85,.4)' },
  security: { fg: '#FF6B6B', bg: 'rgba(255,107,107,.12)', border: 'rgba(255,107,107,.4)' },
  groupe: { fg: '#c8c8c8', bg: 'rgba(255,255,255,.06)', border: 'rgba(255,255,255,.22)' },
};

const FILTERS = [
  { key: 'all', label: 'Tous les postes' },
  { key: 'fitness', label: 'GBÔ Fitness' },
  { key: 'academy', label: 'GBÔ Academy' },
  { key: 'events', label: 'GBÔ Events' },
  { key: 'security', label: 'GBÔ Security' },
  { key: 'groupe', label: 'Groupe' },
];

const POLE_LABEL = Object.fromEntries(FILTERS.filter((f) => f.key !== 'all').map((f) => [f.key, f.label]));

export default function CareersPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredJobs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return JOBS.filter((j) => (activeFilter === 'all' || j.pole === activeFilter) && (!q || j.t.toLowerCase().includes(q)));
  }, [activeFilter, search]);

  return (
    <div>
      <section style={css('position:relative;overflow:hidden;padding:clamp(64px,9vw,110px) clamp(20px,5vw,64px) clamp(48px,6vw,72px)')}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <ImageSlot placeholder="Équipe GBÔ" src={stockPhotoDirect('photo-1633956319625-df645828880d', '1600x900')} />
        </div>
        <div
          style={css(
            'position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.9) 0%,rgba(0,0,0,.65) 45%,rgba(0,0,0,.35) 75%),linear-gradient(180deg,rgba(0,0,0,.55) 0%,rgba(0,0,0,.4) 45%,rgba(0,0,0,.88) 100%);pointer-events:none'
          )}
        />
        <GlowBlobs />
        <div style={{ position: 'relative', maxWidth: 1160, margin: '0 auto' }}>
          <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(30px,6vw,56px);letter-spacing:-2px;line-height:1;max-width:16ch")}>
            REJOIGNEZ <span style={{ color: 'var(--lime,#C6F202)' }}>GBÔ.</span>
          </h1>
          <p style={css("font-family:'Broaven';font-weight:700;font-size:clamp(17px,2.4vw,22px);margin-top:14px;max-width:32ch")}>
            Des talents pour faire avancer le sport en Afrique.
          </p>
          <p style={css('font-size:15.5px;color:rgba(255,255,255,.75);max-width:56ch;margin-top:14px;line-height:1.55')}>
            Nous construisons une équipe engagée, compétente et passionnée pour développer nos solutions et avoir un impact durable sur le sport et le
            bien-être en Afrique.
          </p>
          <div style={css('display:flex;flex-wrap:wrap;gap:clamp(20px,3vw,40px);margin-top:32px')}>
            {TRUST_POINTS.map((p) => (
              <div key={p.t} style={css('display:flex;align-items:center;gap:10px;font-size:14px;font-weight:600')}>
                <span
                  style={css(
                    'width:32px;height:32px;flex:0 0 auto;border-radius:50%;border:1px solid rgba(198,242,2,.4);color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center'
                  )}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {p.icon}
                  </svg>
                </span>
                {p.t}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Reveal as="section" style={css('padding:clamp(28px,4vw,44px) clamp(20px,5vw,64px) 0')}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={css('display:flex;flex-wrap:wrap;align-items:center;gap:10px;justify-content:space-between')}>
            <div style={css('display:flex;flex-wrap:wrap;gap:10px')}>
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  style={css(
                    `padding:9px 16px;border-radius:20px;font-size:13.5px;font-weight:700;white-space:nowrap;cursor:pointer;border:1px solid ${
                      activeFilter === f.key ? 'transparent' : 'var(--border,rgba(255,255,255,.16))'
                    };background:${activeFilter === f.key ? 'var(--lime,#C6F202)' : 'transparent'};color:${
                      activeFilter === f.key ? '#000' : 'var(--fg,#fff)'
                    }`
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div
              style={css(
                'display:flex;align-items:center;gap:8px;padding:9px 16px;border-radius:20px;border:1px solid var(--border,rgba(255,255,255,.16));min-width:220px'
              )}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--muted,#8a8a8a)" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un poste..."
                style={css('background:none;border:none;outline:none;color:var(--fg,#fff);font-size:13.5px;width:100%')}
              />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(24px,3vw,36px) clamp(20px,5vw,64px) clamp(40px,6vw,70px)')}>
        <div style={{ maxWidth: 1160, margin: '0 auto', display: 'grid', gap: 12 }}>
          {filteredJobs.map((j, i) => {
            const c = POLE_STYLE[j.pole];
            return (
              <Reveal
                key={j.t}
                delay={i * 40}
                className="hover-card"
                style={css(
                  'display:flex;align-items:center;gap:16px;padding:18px 22px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.09));flex-wrap:wrap'
                )}
              >
                <span
                  style={css(
                    'width:40px;height:40px;flex:0 0 auto;border-radius:12px;background:var(--surface2,#161616);color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center'
                  )}
                >
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {JOB_ICONS[j.icon]}
                  </svg>
                </span>
                <div style={{ fontWeight: 700, fontSize: 16.5, flex: '1 1 200px', minWidth: 0 }}>{j.t}</div>
                <div data-jobmeta="" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12, flex: '0 1 auto' }}>
                  <span
                    style={css(
                      `padding:4px 12px;border-radius:20px;font-size:11.5px;font-weight:700;white-space:nowrap;border:1px solid ${c.border};background:${c.bg};color:${c.fg}`
                    )}
                  >
                    {POLE_LABEL[j.pole]}
                  </span>
                  <div style={css('display:flex;align-items:center;gap:6px;font-size:13px;color:var(--muted,#8a8a8a);white-space:nowrap')}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 21s-7-6.5-7-11.5A7 7 0 0112 2a7 7 0 017 7.5C19 14.5 12 21 12 21z" />
                      <circle cx="12" cy="9.5" r="2.3" />
                    </svg>
                    {j.loc}
                  </div>
                  <div style={css('display:flex;align-items:center;gap:6px;font-size:13px;color:var(--muted,#8a8a8a)')}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                      <rect x="3" y="7" width="18" height="13" rx="2" />
                      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                    {j.mode}
                  </div>
                </div>
                <Link
                  href={`/careers/postuler?poste=${encodeURIComponent(j.t)}`}
                  style={css(
                    'margin-left:auto;padding:11px 20px;border-radius:11px;border:1px solid var(--border,rgba(255,255,255,.2));font-weight:700;font-size:14px;color:var(--fg,#fff);white-space:nowrap'
                  )}
                >
                  Postuler →
                </Link>
              </Reveal>
            );
          })}
          {filteredJobs.length === 0 && (
            <div style={css('padding:32px;text-align:center;color:var(--muted,#8a8a8a);font-size:14.5px')}>Aucun poste ne correspond à cette recherche.</div>
          )}
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:0 clamp(20px,5vw,64px) clamp(64px,9vw,110px)')}>
        <div
          style={css(
            'position:relative;overflow:hidden;max-width:1160px;margin:0 auto;border-radius:28px;border:1px solid var(--border,rgba(255,255,255,.1))'
          )}
        >
          <div
            style={css(
              'position:relative;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr));align-items:center'
            )}
          >
            <div style={css('padding:clamp(32px,5vw,56px);background:var(--surface,#0c0c0c)')}>
              <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:12px')}>
                Pas de poste qui correspond ?
              </div>
              <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,3.6vw,32px);letter-spacing:-1px;margin-bottom:14px")}>
                Candidature spontanée
              </h2>
              <p style={css('font-size:14.5px;color:var(--muted,#8a8a8a);line-height:1.6;margin-bottom:24px')}>
                Vous souhaitez rejoindre GBÔ mais aucun poste ne correspond actuellement ? Envoyez-nous votre candidature, nous la conservons pour de futures
                opportunités.
              </p>
              <Link
                href="/careers/postuler"
                className="btn-cta"
                style={css('display:inline-flex;padding:14px 26px;border-radius:11px;border:1px solid var(--border,rgba(255,255,255,.2));font-weight:700;font-size:14.5px;color:#fff')}
              >
                Envoyer ma candidature →
              </Link>
            </div>
            <div style={{ position: 'relative', minHeight: 220, alignSelf: 'stretch' }}>
              <ImageSlot placeholder="Salle GBÔ" src={stockPhoto('gymInterior', 'careers-cta', '900x700')} />
              <div
                style={css(
                  'position:absolute;inset:0;background:linear-gradient(90deg,rgba(5,5,5,.5) 0%,rgba(5,5,5,.75) 100%);pointer-events:none'
                )}
              />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: 'clamp(24px,4vw,36px)' }}>
                <div style={css("font-family:'Broaven';font-weight:700;font-size:clamp(18px,2.4vw,24px);line-height:1.2")}>
                  DES TALENTS
                  <br />
                  POUR UN IMPACT <span style={{ color: 'var(--lime,#C6F202)' }}>DURABLE.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
