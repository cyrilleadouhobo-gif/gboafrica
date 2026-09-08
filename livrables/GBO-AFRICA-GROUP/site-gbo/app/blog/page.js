'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { css } from '../../lib/css.js';
import ImageSlot from '../../components/ImageSlot.js';
import Reveal from '../../components/Reveal.js';
import GlowBlobs from '../../components/GlowBlobs.js';
import Honeypot from '../../components/Honeypot.js';
import { useAppData } from '../../context/AppData.js';
import { stockPhoto } from '../../lib/stockPhoto.js';
import { ARTICLES, BLOG_CATS, ARTICLE_CAT_PHOTO } from '../../data/content.js';

const eyebrow = css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:700');

function ArrowCircle({ size = 30 }) {
  return (
    <span
      style={css(
        `width:${size}px;height:${size}px;border-radius:50%;border:1px solid var(--border,rgba(255,255,255,.2));display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px;flex:0 0 auto`
      )}
    >
      →
    </span>
  );
}

function ArticleCard({ a, i }) {
  return (
    <Reveal
      key={a.id}
      delay={i * 60}
      className="hover-card"
      style={css('border-radius:18px;overflow:hidden;border:1px solid var(--border,rgba(255,255,255,.09))')}
    >
      <div style={{ aspectRatio: '16/10', position: 'relative' }}>
        <ImageSlot placeholder="Visuel article" src={stockPhoto(ARTICLE_CAT_PHOTO[a.cat] || 'fitnessMen', a.id, '600x375')} />
      </div>
      <div style={{ padding: 20 }}>
        <div style={css('font-size:11px;letter-spacing:1px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600')}>
          {a.cat} · {a.read}
        </div>
        <div style={{ fontWeight: 700, fontSize: 19, margin: '8px 0 6px', lineHeight: 1.3 }}>{a.title}</div>
        <div style={css('font-size:14px;color:var(--muted,#8a8a8a);line-height:1.5;margin-bottom:12px')}>{a.excerpt}</div>
        <div style={css('display:flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--lime,#C6F202)')}>Lire l&apos;article →</div>
      </div>
    </Reveal>
  );
}

export default function BlogPage() {
  const { showToast } = useAppData();
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [search, setSearch] = useState('');
  const [featOffset, setFeatOffset] = useState(0);
  const [nlEmail, setNlEmail] = useState('');
  const [nlSubmitting, setNlSubmitting] = useState(false);

  const filteredArticles = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ARTICLES.filter((a) => (activeFilter === 'Tous' || a.pillar === activeFilter) && (!q || a.title.toLowerCase().includes(q)));
  }, [activeFilter, search]);

  // Rotation "À la une" : une fenêtre de 3 articles sur l'ensemble des 8, qu'on fait glisser
  // avec les flèches — indépendante des filtres ci-dessus (mise en avant éditoriale, pas
  // une recherche).
  const featured = [0, 1, 2].map((k) => ARTICLES[(featOffset + k) % ARTICLES.length]);
  const nextFeatured = () => setFeatOffset((o) => (o + 1) % ARTICLES.length);
  const prevFeatured = () => setFeatOffset((o) => (o - 1 + ARTICLES.length) % ARTICLES.length);

  const submitNewsletter = async (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    if (f.get('website')) return; // honeypot
    setNlSubmitting(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: f.get('email') }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Une erreur est survenue, réessayez.');
        return;
      }
      setNlEmail('');
      showToast('Merci ! Vérifiez votre boîte mail pour confirmer votre inscription.');
    } catch {
      showToast('Connexion impossible. Réessayez.');
    } finally {
      setNlSubmitting(false);
    }
  };

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
              <div style={{ ...eyebrow, color: 'var(--lime,#C6F202)', marginBottom: 16 }}>Le journal GBÔ</div>
              <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(30px,5.6vw,50px);letter-spacing:-1.5px;line-height:1.05")}>
                Des idées pour faire
                <br />
                <span style={{ color: 'var(--lime,#C6F202)' }}>avancer le sport.</span>
              </h1>
              <p style={css('font-size:clamp(15px,1.8vw,17px);color:var(--muted,#8a8a8a);max-width:46ch;margin-top:18px;line-height:1.55')}>
                Le sport, le bien-être et les initiatives qui font avancer notre manière de bouger, de travailler et de vivre en Afrique.
              </p>
              <div style={css('display:flex;flex-wrap:wrap;gap:14px;margin-top:28px')}>
                <a
                  href="#articles"
                  className="btn-cta"
                  style={css('display:inline-flex;padding:15px 28px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:15px')}
                >
                  Découvrir nos articles →
                </a>
                <Link
                  href="/about"
                  style={css(
                    'display:inline-flex;align-items:center;padding:15px 28px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.2));font-weight:700;font-size:15px;color:var(--fg,#fff)'
                  )}
                >
                  Notre mission
                </Link>
              </div>
            </div>
            <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', aspectRatio: '3/4', minHeight: 280 }}>
              <ImageSlot placeholder="Sportive GBÔ" src={stockPhoto('fitnessWomen', 'blog-hero', '900x1100')} />
              <div
                style={css(
                  'position:absolute;inset:0;background:linear-gradient(200deg,rgba(0,0,0,.65) 0%,rgba(0,0,0,0) 42%);pointer-events:none'
                )}
              />
              <div style={{ position: 'absolute', right: 20, top: 20, textAlign: 'right' }}>
                <div style={css("font-family:'Broaven';font-weight:700;font-size:clamp(15px,2vw,19px);line-height:1.25;color:#fff")}>
                  PLUS QU&apos;UNE
                  <br />
                  PRATIQUE,
                  <br />
                  <span style={{ color: 'var(--lime,#C6F202)' }}>UN STYLE</span>
                  <br />
                  <span style={{ color: 'var(--lime,#C6F202)' }}>DE VIE.</span>
                </div>
                <div style={css('margin-top:14px;font-size:11px;letter-spacing:1.5px;color:rgba(255,255,255,.8);line-height:1.9')}>
                  SPORT
                  <br />
                  BIEN-ÊTRE
                  <br />
                  COMMUNAUTÉ
                  <br />
                  AFRIQUE
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtres + recherche */}
      <Reveal as="section" id="articles" style={css('padding:clamp(28px,4vw,44px) clamp(20px,5vw,64px) 0')}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={css('display:flex;flex-wrap:wrap;align-items:center;gap:10px;justify-content:space-between')}>
            <div style={css('display:flex;flex-wrap:wrap;gap:10px')}>
              {BLOG_CATS.map((c) => (
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
                placeholder="Rechercher un article..."
                style={css('background:none;border:none;outline:none;color:var(--fg,#fff);font-size:13.5px;width:100%')}
              />
            </div>
          </div>
        </div>
      </Reveal>

      {/* À la une */}
      <Reveal as="section" style={css('padding:clamp(32px,5vw,48px) clamp(20px,5vw,64px) 0')}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={css('display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:22px')}>
            <div style={eyebrow}>À la une</div>
            <div style={css('display:flex;gap:8px')}>
              <button onClick={prevFeatured} aria-label="Article précédent" style={{ transform: 'scaleX(-1)', cursor: 'pointer' }}>
                <ArrowCircle />
              </button>
              <button onClick={nextFeatured} aria-label="Article suivant" style={css('cursor:pointer')}>
                <ArrowCircle />
              </button>
            </div>
          </div>

          <div data-featgrid="" style={css('display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:16px')}>
            <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', gridRow: 'span 2', minHeight: 360 }}>
              <ImageSlot placeholder="Article à la une" src={stockPhoto(ARTICLE_CAT_PHOTO[featured[0].cat] || 'fitnessMen', featured[0].id, '900x900')} />
              <div
                style={css(
                  'position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.88) 0%,rgba(0,0,0,.15) 55%,rgba(0,0,0,.05) 100%);pointer-events:none'
                )}
              />
              <div
                style={css(
                  'position:absolute;left:20px;top:20px;padding:6px 14px;border-radius:20px;background:rgba(0,0,0,.55);backdrop-filter:blur(4px);font-size:11px;letter-spacing:1px;text-transform:uppercase;font-weight:700;color:var(--lime,#C6F202)'
                )}
              >
                {featured[0].cat} · {featured[0].read}
              </div>
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 'clamp(20px,3vw,30px)' }}>
                <div style={css("font-family:'Broaven';font-weight:700;font-size:clamp(19px,2.6vw,26px);line-height:1.25;margin-bottom:10px;max-width:22ch")}>
                  {featured[0].title}
                </div>
                <p style={css('font-size:14px;color:rgba(255,255,255,.8);line-height:1.5;max-width:46ch;margin-bottom:18px')}>{featured[0].excerpt}</p>
                <div style={css('display:flex;align-items:center;gap:10px;font-size:14px;font-weight:700')}>
                  <ArrowCircle size={34} />
                  Lire l&apos;article
                </div>
              </div>
            </div>

            {featured.slice(1).map((a) => (
              <div
                key={a.id}
                className="hover-card"
                style={css('display:flex;gap:14px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.09));overflow:hidden')}
              >
                <div style={{ position: 'relative', width: 'clamp(90px,26vw,150px)', flex: '0 0 auto' }}>
                  <ImageSlot placeholder="Visuel article" src={stockPhoto(ARTICLE_CAT_PHOTO[a.cat] || 'fitnessMen', a.id, '400x400')} />
                </div>
                <div style={{ padding: '16px 18px 16px 0', minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={css('font-size:11px;letter-spacing:1px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600')}>
                    {a.cat} · {a.read}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 15.5, margin: '6px 0 4px', lineHeight: 1.3 }}>{a.title}</div>
                  <div style={css('font-size:13px;color:var(--muted,#8a8a8a);line-height:1.5;margin-bottom:8px')}>{a.excerpt}</div>
                  <div style={css('font-size:12.5px;font-weight:700;color:var(--lime,#C6F202)')}>Lire l&apos;article →</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Derniers articles */}
      <Reveal as="section" style={css('padding:clamp(40px,6vw,60px) clamp(20px,5vw,64px) clamp(64px,9vw,110px)')}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={css('display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:22px')}>
            <div style={eyebrow}>Derniers articles</div>
            <button
              onClick={() => {
                setActiveFilter('Tous');
                setSearch('');
              }}
              style={css('font-size:13px;font-weight:700;color:var(--lime,#C6F202);cursor:pointer')}
            >
              Voir tous les articles →
            </button>
          </div>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fill,minmax(min(260px,100%),1fr));gap:16px')}>
            {filteredArticles.map((a, i) => (
              <ArticleCard key={a.id} a={a} i={i} />
            ))}
          </div>
          {filteredArticles.length === 0 && (
            <div style={css('padding:32px;text-align:center;color:var(--muted,#8a8a8a);font-size:14.5px')}>Aucun article ne correspond pour l&apos;instant.</div>
          )}
        </div>
      </Reveal>

      {/* Newsletter */}
      <Reveal as="section" style={css('padding:0 clamp(20px,5vw,64px) clamp(64px,9vw,110px)')}>
        <div
          style={css(
            'position:relative;overflow:hidden;max-width:1200px;margin:0 auto;border-radius:28px;border:1px solid var(--border,rgba(255,255,255,.1))'
          )}
        >
          <div style={css('position:relative;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))')}>
            <div style={{ position: 'relative', minHeight: 220 }}>
              <ImageSlot placeholder="Restons en mouvement" src={stockPhoto('fitnessMen', 'newsletter-cta', '900x700')} />
              <div
                style={css(
                  'position:absolute;inset:0;background:linear-gradient(90deg,rgba(5,5,5,.35) 0%,rgba(5,5,5,.8) 100%),linear-gradient(0deg,rgba(5,5,5,.6) 0%,rgba(5,5,5,0) 55%)'
                )}
              />
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 'clamp(24px,4vw,36px)' }}>
                <div style={css("font-family:'Broaven';font-weight:700;font-size:clamp(20px,2.8vw,28px);line-height:1.2")}>
                  RESTONS
                  <br />
                  EN <span style={{ color: 'var(--lime,#C6F202)' }}>MOUVEMENT.</span>
                </div>
              </div>
            </div>
            <div style={css('padding:clamp(32px,5vw,56px);background:var(--surface,#0c0c0c)')}>
              <div style={{ ...eyebrow, color: 'var(--lime,#C6F202)', marginBottom: 12 }}>Newsletter</div>
              <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(22px,3.2vw,28px);letter-spacing:-1px;margin-bottom:14px")}>
                Recevez nos meilleurs contenus
              </h2>
              <p style={css('font-size:14.5px;color:var(--muted,#8a8a8a);line-height:1.6')}>
                Conseils, analyses, actualités et initiatives pour faire avancer le sport en Afrique.
              </p>
              <form onSubmit={submitNewsletter} style={css('display:flex;gap:10px;flex-wrap:wrap;margin-top:22px')}>
                <input
                  required
                  type="email"
                  name="email"
                  value={nlEmail}
                  onChange={(e) => setNlEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  style={css(
                    'flex:1 1 220px;min-width:0;padding:14px 18px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.16));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:14.5px'
                  )}
                />
                <Honeypot />
                <button
                  type="submit"
                  disabled={nlSubmitting}
                  className="btn-cta"
                  style={css(
                    `flex:0 0 auto;padding:14px 24px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:14.5px;white-space:nowrap;opacity:${nlSubmitting ? 0.6 : 1}`
                  )}
                >
                  {nlSubmitting ? 'Envoi…' : "S'inscrire →"}
                </button>
              </form>
              <div style={css('display:flex;align-items:center;gap:8px;margin-top:16px;font-size:12.5px;color:var(--muted,#8a8a8a)')}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="10" width="16" height="10" rx="2" />
                  <path d="M8 10V7a4 4 0 018 0v3" />
                </svg>
                Pas de spam. Désinscription à tout moment.
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
