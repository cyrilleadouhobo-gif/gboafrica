'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { css } from '../../lib/css.js';
import ImageSlot from '../../components/ImageSlot.js';
import Reveal from '../../components/Reveal.js';
import GlowBlobs from '../../components/GlowBlobs.js';
import { stockPhoto } from '../../lib/stockPhoto.js';
import { NEWS_ITEMS, NEWS_CATS, NEWS_CAT_PHOTO } from '../../data/content.js';

const eyebrow = css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:700');

const FEATURE_HIGHLIGHTS = [
  {
    t: 'Une expérience plus fluide',
    icon: (
      <>
        <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
      </>
    ),
  },
  {
    t: 'Un écosystème plus connecté',
    icon: (
      <>
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="6" r="2.5" />
        <circle cx="12" cy="18" r="2.5" />
        <path d="M8 7.5L10.5 16M16 7.5L13.5 16M8.5 6h7" />
      </>
    ),
  },
  {
    t: 'Plus d’opportunités pour la communauté',
    icon: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="8" r="2.5" />
        <path d="M2 21c0-3.5 3-6 7-6s7 2.5 7 6" />
        <path d="M16.5 15.2c2.6.5 4.5 2.7 4.5 5.8" />
      </>
    ),
  },
];

function NewsCard({ n, i }) {
  return (
    <Reveal
      key={n.id}
      delay={i * 60}
      className="hover-card"
      style={css('border-radius:18px;overflow:hidden;border:1px solid var(--border,rgba(255,255,255,.09))')}
    >
      <div style={{ aspectRatio: '16/10', position: 'relative' }}>
        <ImageSlot placeholder="Visuel actualité" src={stockPhoto(NEWS_CAT_PHOTO[n.tag] || 'fitnessMen', n.id, '600x375')} />
      </div>
      <div style={{ padding: 20 }}>
        <div style={css('font-size:11px;letter-spacing:1px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600')}>
          {n.tag} · {n.date}
        </div>
        <div style={{ fontWeight: 700, fontSize: 18, margin: '8px 0 6px', lineHeight: 1.3 }}>{n.title}</div>
        <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a);line-height:1.5;margin-bottom:12px')}>{n.excerpt}</div>
        <div style={css('font-size:13px;font-weight:700;color:var(--lime,#C6F202)')}>Lire →</div>
      </div>
    </Reveal>
  );
}

export default function NewsPage() {
  const [activeFilter, setActiveFilter] = useState('Tous');

  const filtered = useMemo(() => NEWS_ITEMS.filter((n) => activeFilter === 'Tous' || n.tag === activeFilter), [activeFilter]);
  const featured = NEWS_ITEMS[0];

  return (
    <div>
      {/* Hero */}
      <section
        style={css(
          'position:relative;overflow:hidden;padding:clamp(64px,9vw,110px) clamp(20px,5vw,64px) clamp(40px,6vw,64px);border-bottom:1px solid var(--border,rgba(255,255,255,.08))'
        )}
      >
        <GlowBlobs />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <div
            style={css(
              'display:grid;grid-template-columns:repeat(auto-fit,minmax(min(380px,100%),1fr));gap:clamp(32px,5vw,56px);align-items:center'
            )}
          >
            <div>
              <div style={{ ...eyebrow, color: 'var(--lime,#C6F202)', marginBottom: 16 }}>Actualités</div>
              <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(30px,5.6vw,50px);letter-spacing:-1.5px;line-height:1.05")}>
                Ce qui bouge
                <br />
                <span style={{ color: 'var(--lime,#C6F202)' }}>chez GBÔ.</span>
              </h1>
              <p style={css('font-size:clamp(15px,1.8vw,17px);color:var(--muted,#8a8a8a);max-width:46ch;margin-top:18px;line-height:1.55')}>
                Découvrez les dernières actualités, lancements, événements et évolutions de notre écosystème.
              </p>
              <div style={css('display:flex;flex-wrap:wrap;gap:10px;margin-top:26px')}>
                {NEWS_CATS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveFilter(c)}
                    style={css(
                      `padding:9px 16px;border-radius:20px;font-size:13px;font-weight:600;white-space:nowrap;cursor:pointer;border:1px solid ${
                        activeFilter === c ? 'transparent' : 'var(--border,rgba(255,255,255,.14))'
                      };background:${activeFilter === c ? 'var(--lime,#C6F202)' : 'transparent'};color:${
                        activeFilter === c ? '#000' : 'var(--muted,#8a8a8a)'
                      }`
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', aspectRatio: '3/4', minHeight: 280 }}>
              <ImageSlot placeholder="Sportive GBÔ" src={stockPhoto('fitnessWomen', 'news-hero', '900x1100')} />
              <div
                style={css(
                  'position:absolute;inset:0;background:linear-gradient(200deg,rgba(0,0,0,.65) 0%,rgba(0,0,0,0) 42%);pointer-events:none'
                )}
              />
              <div style={{ position: 'absolute', right: 20, top: 20, textAlign: 'right' }}>
                <div style={css('font-size:11px;letter-spacing:1.5px;color:rgba(255,255,255,.85);line-height:1.6;font-weight:600')}>
                  SPORT.
                  <br />
                  BIEN-ÊTRE.
                  <br />
                  COMMUNAUTÉ.
                  <br />
                  AFRIQUE.
                </div>
                <div style={css("font-family:'Broaven';font-weight:700;font-size:clamp(14px,1.8vw,17px);margin-top:16px;color:var(--lime,#C6F202)")}>
                  AVANCER
                  <br />
                  ENSEMBLE.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* À la une */}
      <Reveal as="section" style={css('padding:clamp(32px,5vw,48px) clamp(20px,5vw,64px) 0')}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div
            style={css(
              'display:grid;grid-template-columns:repeat(auto-fit,minmax(min(560px,100%),3fr)) minmax(min(280px,100%),2fr);gap:16px;border-radius:24px;overflow:hidden;border:1px solid var(--border,rgba(255,255,255,.1))'
            )}
          >
            <div
              style={css(
                'position:relative;background:var(--surface,#0c0c0c);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(300px,55%),1fr));align-items:stretch'
              )}
            >
              <div style={css('padding:clamp(28px,4vw,44px);display:flex;flex-direction:column;justify-content:center')}>
                <div style={css('display:flex;align-items:center;gap:10px;margin-bottom:16px;flex-wrap:wrap')}>
                  <span style={css('padding:5px 13px;border-radius:20px;background:var(--lime,#C6F202);color:#000;font-size:11px;font-weight:700;letter-spacing:.5px')}>
                    À LA UNE
                  </span>
                  <span style={css('font-size:12px;color:var(--muted,#8a8a8a);font-weight:600;text-transform:uppercase;letter-spacing:.5px')}>
                    {featured.tag} · {featured.date}
                  </span>
                </div>
                <h2
                  style={css(
                    "font-family:'Broaven';font-weight:700;font-size:clamp(22px,3.4vw,32px);letter-spacing:-.5px;line-height:1.2;text-transform:uppercase;margin-bottom:16px"
                  )}
                >
                  {featured.title}
                </h2>
                <p style={css('font-size:14.5px;color:var(--muted,#8a8a8a);line-height:1.6;margin-bottom:24px;max-width:48ch')}>{featured.excerpt}</p>
                <div
                  className="btn-cta"
                  style={css(
                    'display:inline-flex;align-self:flex-start;padding:14px 26px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:14.5px;cursor:pointer'
                  )}
                >
                  Lire l&apos;article →
                </div>
              </div>
              <div style={{ position: 'relative', minHeight: 260 }}>
                <ImageSlot placeholder="Plateforme GBÔ" src={stockPhoto('gymInterior', 'news-featured', '700x800')} />
                <div
                  style={css(
                    'position:absolute;inset:0;background:linear-gradient(90deg,rgba(12,12,12,.5) 0%,rgba(12,12,12,0) 30%);pointer-events:none'
                  )}
                />
              </div>
            </div>

            <div style={css('padding:clamp(28px,4vw,40px);background:var(--glass,rgba(255,255,255,.02));display:flex;flex-direction:column;justify-content:center')}>
              <div style={{ display: 'grid', gap: 20 }}>
                {FEATURE_HIGHLIGHTS.map((h) => (
                  <div key={h.t} style={css('display:flex;align-items:center;gap:14px')}>
                    <span
                      style={css(
                        'width:42px;height:42px;flex:0 0 auto;border-radius:12px;background:rgba(198,242,2,.12);color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center'
                      )}
                    >
                      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {h.icon}
                      </svg>
                    </span>
                    <div style={{ fontWeight: 600, fontSize: 14.5, lineHeight: 1.35 }}>{h.t}</div>
                  </div>
                ))}
              </div>
              <div
                style={css(
                  'margin-top:28px;padding-top:22px;border-top:1px solid var(--border,rgba(255,255,255,.08));font-size:12px;letter-spacing:1px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:600;text-align:right'
                )}
              >
                Nous faisons avancer le sport.
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Dernières actualités */}
      <Reveal as="section" style={css('padding:clamp(40px,6vw,60px) clamp(20px,5vw,64px) clamp(64px,9vw,110px)')}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={css('display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:22px')}>
            <div style={eyebrow}>Dernières actualités</div>
            <button onClick={() => setActiveFilter('Tous')} style={css('font-size:13px;font-weight:700;color:var(--lime,#C6F202);cursor:pointer')}>
              Voir toutes les actualités →
            </button>
          </div>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fill,minmax(min(260px,100%),1fr));gap:16px')}>
            {filtered.map((n, i) => (
              <NewsCard key={n.id} n={n} i={i} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div style={css('padding:32px;text-align:center;color:var(--muted,#8a8a8a);font-size:14.5px')}>Aucune actualité pour l&apos;instant dans cette catégorie.</div>
          )}
        </div>
      </Reveal>

      {/* Bandeau Journal GBÔ */}
      <Reveal as="section" style={css('padding:0 clamp(20px,5vw,64px) clamp(64px,9vw,110px)')}>
        <div
          style={css(
            'position:relative;overflow:hidden;max-width:1200px;margin:0 auto;border-radius:28px;border:1px solid var(--border,rgba(255,255,255,.1));min-height:200px'
          )}
        >
          <ImageSlot placeholder="Le journal GBÔ" src={stockPhoto('fitnessMen', 'news-journal-cta', '1600x500')} />
          <div
            style={css(
              'position:absolute;inset:0;background:linear-gradient(90deg,rgba(5,5,5,.9) 0%,rgba(5,5,5,.65) 55%,rgba(5,5,5,.3) 100%)'
            )}
          />
          <div
            style={css(
              'position:relative;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px;padding:clamp(28px,4vw,40px)'
            )}
          >
            <div>
              <div style={{ ...eyebrow, color: 'var(--lime,#C6F202)', marginBottom: 10 }}>Le journal GBÔ</div>
              <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(20px,3vw,26px);letter-spacing:-.5px;max-width:24ch")}>
                Des idées pour aller plus loin.
              </h2>
              <p style={css('font-size:14px;color:var(--muted,#8a8a8a);margin-top:10px;max-width:46ch')}>
                Conseils, analyses et inspirations autour du sport et du bien-être en Afrique.
              </p>
            </div>
            <Link
              href="/blog"
              className="btn-cta"
              style={css(
                'flex:0 0 auto;display:inline-flex;padding:15px 26px;border-radius:12px;border:1px solid var(--lime,#C6F202);color:var(--lime,#C6F202);font-weight:700;font-size:14.5px'
              )}
            >
              Découvrir le journal →
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
