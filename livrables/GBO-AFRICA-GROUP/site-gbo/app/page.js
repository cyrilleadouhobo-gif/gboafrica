'use client';

import Link from 'next/link';
import { css } from '../lib/css.js';
import ImageSlot from '../components/ImageSlot.js';
import Reveal from '../components/Reveal.js';
import GlowBlobs from '../components/GlowBlobs.js';
import VideoIntro from '../components/VideoIntro.js';
import HeroCarousel from '../components/HeroCarousel.js';
import { stockPhoto } from '../lib/stockPhoto.js';
import { PARTNERS } from '../data/content.js';

// Carrousel plein écran du hero : vrais visuels GBÔ fournis par Cyrille (Documents/Hero
// accueil), mis à jour le 02/09. Casting et logos de marques tierces visibles sur les 2
// dernières photos assumés par Cyrille (voir échange du jour).
const HERO_SLIDES = [
  { src: '/images/hero/hero-salle.jpg' }, // salle bien équipée
  { src: '/images/hero/hero-coaching.jpg', position: '68% 30%' }, // coach guidant un exercice, recentré sur le sportif au premier plan pour les écrans étroits
  { src: '/images/hero/hero-group.jpg', position: '50% 25%' }, // trio à l'entraînement, recentré sur les visages pour les écrans étroits
];

// Bandeaux photo des sections Valeurs / Méthode / Pôles — même collection Accra que le hero
// (même photographe, casting confirmé visuellement), pour casser les blocs 100% texte.

// Aperçu de 6 coachs sur la home (liste complète et à jour sur /coachs, alimentée par la
// base). Photos Pexels choisies et vérifiées individuellement (sujets noirs/africains,
// tenue sport, pas de logo de marque tierce visible) — provisoire, à remplacer par les
// vraies photos des coachs GBÔ dès que Cyrille les fournit.
const COACHES_PREVIEW = [
  { name: 'Coach Awa', spec: 'Prénatal / Postnatal', photo: 'https://images.pexels.com/photos/6455796/pexels-photo-6455796.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Coach Yao', spec: 'Perte de poids, Renfo', photo: 'https://images.pexels.com/photos/8612491/pexels-photo-8612491.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Coach Grace', spec: 'Sport santé, Senior', photo: 'https://images.pexels.com/photos/6390235/pexels-photo-6390235.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Coach Ibrahim', spec: 'Prise de masse, Perf', photo: 'https://images.pexels.com/photos/5878697/pexels-photo-5878697.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Coach Fatou', spec: 'Bien-être & mobilité', photo: 'https://images.pexels.com/photos/7113554/pexels-photo-7113554.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Coach Kouassi', spec: 'Préparation physique', photo: 'https://images.pexels.com/photos/4908557/pexels-photo-4908557.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

// Avatars de la rangée de confiance du hero — réutilise 4 photos déjà vérifiées (coachs).
const TRUST_AVATARS = COACHES_PREVIEW.slice(0, 4).map((c) => c.photo);

// Bandeau de segments juste sous le hero (qui fait quoi chez GBÔ, en un coup d'œil).
const SEGMENTS = [
  {
    label: 'Pratiquants',
    sub: 'Forme & bien-être',
    href: '/fitness',
    icon: (
      <>
        <path d="M2 10v4M22 10v4M6 9v6M18 9v6" />
        <path d="M6 12h12" />
      </>
    ),
  },
  {
    label: 'Formation',
    sub: 'Compétences & carrière',
    href: '/poles/academy',
    icon: (
      <>
        <path d="M2 9l10-5 10 5-10 5-10-5z" />
        <path d="M6 11v4c0 1.5 2.7 3 6 3s6-1.5 6-3v-4" />
      </>
    ),
  },
  {
    label: 'Événements',
    sub: 'Expériences sportives',
    href: '/poles/events',
    icon: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
  },
  {
    label: 'Entreprises',
    sub: 'Performance & QVT',
    href: '/pour-les-salles',
    icon: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="8" r="2.5" />
        <path d="M2 21c0-3.5 3-6 7-6s7 2.5 7 6" />
        <path d="M16.5 15.2c2.6.5 4.5 2.7 4.5 5.8" />
      </>
    ),
  },
  {
    label: 'Sécurité',
    sub: 'Des espaces plus sûrs',
    href: '/poles/security',
    icon: (
      <>
        <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
      </>
    ),
  },
];

// Aperçu de 4 des 6 pôles GBÔ sur la home. Photos Pexels vérifiées individuellement
// (sujets noirs/africains, pas de logo de marque tierce visible).
const HOME_POLES = [
  {
    accent: 'FITNESS',
    desc: 'Coaching, suivi et solutions pour une meilleure pratique.',
    href: '/fitness',
    photo: 'https://images.pexels.com/photos/34043595/pexels-photo-34043595.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    accent: 'ACADEMY',
    desc: 'Formations pour développer les compétences du secteur.',
    href: '/poles/academy',
    photo: 'https://images.pexels.com/photos/6740171/pexels-photo-6740171.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    accent: 'EVENTS',
    desc: "Organisation d'événements sportifs et expérientiels.",
    href: '/poles/events',
    photo: 'https://images.pexels.com/photos/30278406/pexels-photo-30278406.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    accent: 'SECURITY',
    desc: 'Des solutions pour des espaces sportifs plus sûrs.',
    href: '/poles/security',
    photo: 'https://images.pexels.com/photos/34585117/pexels-photo-34585117.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

// Chiffres réels communiqués par Cyrille (pas d'estimation) — à mettre à jour à mesure
// que l'activité grandit.
const HOME_STATS = [
  { n: '200+', l: 'Participants' },
  { n: '3+', l: 'Événements réalisés' },
  { n: '5+', l: 'Entreprises partenaires' },
  { n: '4', l: "Pôles d'expertise" },
];

const GYM_SOLUTION_POINTS = [
  {
    t: 'Membres',
    d: 'Suivi complet',
    icon: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="8" r="2.5" />
        <path d="M2 21c0-3.5 3-6 7-6s7 2.5 7 6" />
        <path d="M16.5 15.2c2.6.5 4.5 2.7 4.5 5.8" />
      </>
    ),
  },
  {
    t: 'Paiements',
    d: 'Sécurisés',
    icon: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </>
    ),
  },
  {
    t: 'Statistiques',
    d: 'En temps réel',
    icon: (
      <>
        <path d="M4 19V9M11 19V4M18 19v-7" />
      </>
    ),
  },
  {
    t: 'Accessible',
    d: 'Web & mobile',
    icon: (
      <>
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path d="M11 18h2" />
      </>
    ),
  },
];

export default function HomePage() {
  return (
    <div>
      <section style={css('position:relative;min-height:calc(100vh - 68px);display:flex;align-items:flex-end;overflow:hidden;background:#050505')}>
        <HeroCarousel slides={HERO_SLIDES} />
        <div
          style={css(
            'position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.48) 0%,rgba(0,0,0,.52) 30%,rgba(0,0,0,.68) 55%,rgba(0,0,0,.94) 100%);pointer-events:none'
          )}
        />
        <div
          style={css(
            'position:absolute;top:-140px;left:-100px;width:380px;height:380px;border-radius:50%;background:radial-gradient(circle,rgba(198,242,2,.15),transparent 70%);mix-blend-mode:screen;pointer-events:none'
          )}
        />
        <div
          style={css(
            'position:absolute;bottom:-160px;right:-120px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(198,242,2,.13),transparent 70%);mix-blend-mode:screen;pointer-events:none'
          )}
        />
        <div style={css('position:relative;max-width:1200px;margin:0 auto;width:100%;padding:0 clamp(20px,5vw,64px) clamp(56px,9vw,110px);pointer-events:none')}>
          <div style={{ pointerEvents: 'auto' }}>
            <div
              style={css(
                'display:flex;align-items:center;gap:10px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-top:clamp(16px,4vw,44px);margin-bottom:16px;animation:fadeUp .7s both'
              )}
            >
              GBÔ AFRICA GROUP <span style={{ width: 26, height: 2, background: '#C6F202', display: 'inline-block' }} />
            </div>
            <h1 style={css("font-family:'Broaven',sans-serif;font-weight:700;font-size:clamp(30px,6.5vw,68px);line-height:1;letter-spacing:-2px;color:#fff;max-width:14ch;animation:fadeUp .7s .05s both")}>
              NOUS FAISONS AVANCER <span style={{ color: '#C6F202' }}>LE SPORT.</span>
            </h1>
            <p style={css("font-size:clamp(16px,2.2vw,21px);color:rgba(255,255,255,.82);max-width:56ch;margin-top:22px;line-height:1.5;animation:fadeUp .7s .12s both")}>
              Nous développons des solutions dans le sport et le bien-être pour accompagner les pratiquants, les entreprises et les acteurs du secteur.
            </p>
            <div style={css('display:flex;flex-wrap:wrap;gap:14px;margin-top:34px;animation:fadeUp .7s .2s both')}>
              <Link
                href="/about"
                className="btn-cta"
                style={css('padding:16px 30px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:16px')}
              >
                Découvrir GBÔ →
              </Link>
              <Link
                href="/contact"
                className="btn-cta"
                style={css('padding:16px 30px;border-radius:12px;border:1px solid rgba(255,255,255,.3);color:#fff;font-weight:700;font-size:16px;background:rgba(255,255,255,.05)')}
              >
                Nous contacter →
              </Link>
            </div>
            <div style={css('display:flex;align-items:center;gap:14px;margin-top:40px;animation:fadeUp .7s .26s both')}>
              <div style={css('display:flex')}>
                {TRUST_AVATARS.map((src, i) => (
                  <div
                    key={src}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      position: 'relative',
                      border: '2px solid #000',
                      marginLeft: i === 0 ? 0 : -12,
                    }}
                  >
                    <ImageSlot placeholder="Pratiquant GBÔ" src={src} />
                  </div>
                ))}
              </div>
              <div style={css('font-size:13.5px;color:rgba(255,255,255,.75);line-height:1.35')}>
                <span style={{ color: '#fff', fontWeight: 700 }}>+200</span> pratiquants nous font confiance
              </div>
            </div>
          </div>
        </div>
      </section>

      <Reveal as="section" style={css('padding:clamp(56px,9vw,110px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 40px' }}>
            <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(26px,4vw,40px);letter-spacing:-1px;margin-bottom:16px")}>
              Découvrez GBÔ en images.
            </h2>
            <p style={css('font-size:16px;color:var(--muted,#8a8a8a);line-height:1.55')}>
              Une minute pour se donner envie de bouger et d&apos;offrir à votre corps ce qu&apos;il mérite.
            </p>
          </div>
          <div data-video-shrink="">
            <VideoIntro src="/videos/gbo-intro.mp4" />
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(28px,4vw,44px) clamp(20px,5vw,64px);border-top:1px solid var(--border,rgba(255,255,255,.08));border-bottom:1px solid var(--border,rgba(255,255,255,.08))')}>
        <div style={css('max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(160px,100%),1fr));gap:22px')}>
          {SEGMENTS.map((s) => (
            <Link key={s.label} href={s.href} style={css('display:flex;flex-direction:column;align-items:center;text-align:center;gap:10px;color:#fff')}>
              <span
                style={css(
                  'width:44px;height:44px;border-radius:50%;background:rgba(198,242,2,.1);color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center'
                )}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  {s.icon}
                </svg>
              </span>
              <span style={{ fontWeight: 700, fontSize: 14.5 }}>{s.label}</span>
              <span style={css('font-size:12px;color:var(--muted,#8a8a8a)')}>{s.sub}</span>
            </Link>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(56px,9vw,110px) clamp(20px,5vw,64px) clamp(14px,2vw,24px)')}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr));gap:clamp(20px,4vw,40px);align-items:end;margin-bottom:34px')}>
            <div>
              <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px')}>
                Nos pôles d&apos;activité
              </div>
              <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,4.5vw,44px);letter-spacing:-1px;line-height:1.1")}>
                Un écosystème pour faire avancer <span style={{ color: 'var(--lime,#C6F202)' }}>le sport.</span>
              </h2>
            </div>
            <div>
              <p style={css('font-size:15.5px;color:var(--muted,#8a8a8a);line-height:1.6;margin-bottom:14px')}>
                GBÔ AFRICA GROUP réunit des solutions complémentaires pour rendre le sport plus accessible, plus professionnel et plus impactant en Afrique.
              </p>
              <Link href="/about" style={css('font-weight:700;font-size:14px;color:var(--lime,#C6F202)')}>
                En savoir plus →
              </Link>
            </div>
          </div>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr));gap:16px')}>
            {HOME_POLES.map((p, i) => (
              <Reveal
                key={p.accent}
                as={Link}
                href={p.href}
                delay={i * 60}
                className="hover-card hover-card-lime"
                style={css(
                  'display:block;border-radius:18px;overflow:hidden;border:1px solid var(--border,rgba(255,255,255,.09));background:var(--glass,rgba(255,255,255,.02))'
                )}
              >
                <div style={{ position: 'relative', aspectRatio: '4/3' }}>
                  <ImageSlot placeholder={`GBÔ ${p.accent}`} src={p.photo} />
                </div>
                <div style={{ padding: 18 }}>
                  <div style={css("font-family:'Broaven';font-weight:700;font-size:17px;letter-spacing:-0.5px")}>
                    GBÔ<br />
                    <span style={{ color: 'var(--lime,#C6F202)' }}>{p.accent}</span>
                  </div>
                  <div style={css('font-size:13px;color:var(--muted,#8a8a8a);line-height:1.5;margin:8px 0 14px')}>{p.desc}</div>
                  <div style={css('font-size:12.5px;font-weight:700;color:var(--lime,#C6F202)')}>Découvrir →</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(14px,2vw,24px) clamp(20px,5vw,64px) 0')}>
        <div
          style={{
            position: 'relative',
            maxWidth: 1200,
            margin: '0 auto',
            borderRadius: 24,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,.1)',
          }}
        >
          <ImageSlot placeholder="L'Afrique en mouvement" src={stockPhoto('fitnessMen', 'home-stats', '1600x500')} />
          <div
            style={css(
              'position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.92) 0%,rgba(0,0,0,.85) 55%,rgba(0,0,0,.35) 100%);pointer-events:none'
            )}
          />
          <div
            data-statsrow=""
            style={css(
              'position:relative;display:flex;align-items:center;justify-content:space-between;gap:28px;padding:clamp(28px,4vw,44px)'
            )}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(14px,2vw,32px)', minWidth: 0, flex: '1 1 auto' }}>
              {HOME_STATS.flatMap((s, i) => [
                i > 0 && (
                  <span key={`sep-${s.l}`} aria-hidden="true" data-statsep="" style={{ background: 'rgba(255,255,255,.25)', flex: '0 0 auto' }} />
                ),
                <div key={s.l}>
                  <div style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,4vw,40px);color:var(--lime,#C6F202)")}>{s.n}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,.75)', whiteSpace: 'nowrap' }}>{s.l}</div>
                </div>,
              ])}
            </div>
            <div style={{ textAlign: 'right', flex: '0 0 auto' }}>
              <div style={css("font-family:'Broaven';font-weight:700;font-size:clamp(11px,1.1vw,15px);color:#fff;line-height:1.25")}>
                L&apos;AFRIQUE
                <br />
                EN MOUVEMENT.
              </div>
              <span style={{ display: 'inline-block', width: 22, height: 2, background: '#C6F202', marginTop: 6 }} />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(14px,2vw,24px) clamp(20px,5vw,64px) clamp(56px,9vw,110px)')}>
        <div
          style={css(
            'max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(360px,100%),1fr));gap:clamp(32px,5vw,56px);align-items:center'
          )}
        >
          <div style={{ position: 'relative', aspectRatio: '4/3', borderRadius: 24, overflow: 'hidden', border: '1px solid var(--border,rgba(255,255,255,.1))' }}>
            <ImageSlot placeholder="Salle GBÔ équipée" src={stockPhoto('gymInterior', 'home-gym-solution', '1000x750')} />
            <div style={css('position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 55%,rgba(0,0,0,.6) 100%);pointer-events:none')} />
            <div
              style={css(
                'position:absolute;left:16px;bottom:16px;right:16px;padding:14px 16px;border-radius:14px;background:rgba(10,10,10,.85);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;gap:12px'
              )}
            >
              <span style={{ width: 34, height: 34, flex: '0 0 auto', borderRadius: 9, overflow: 'hidden', position: 'relative' }}>
                <ImageSlot placeholder="E-Gym" src="/images/logos/egym-logo.jpg" />
              </span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13.5, color: '#fff' }}>E-Gym</div>
                <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,.7)' }}>La gestion de votre salle en toute simplicité.</div>
              </div>
            </div>
          </div>
          <div>
            <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px')}>
              Solution pour les salles
            </div>
            <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(26px,4.5vw,42px);letter-spacing:-1px;line-height:1.1;margin-bottom:16px")}>
              Gérer votre salle <span style={{ color: 'var(--lime,#C6F202)' }}>plus simplement.</span>
            </h2>
            <p style={css('font-size:15.5px;color:var(--muted,#8a8a8a);line-height:1.6;margin-bottom:24px')}>
              E-Gym est une solution complète pour gérer vos membres, vos abonnements, vos paiements et bien plus encore.
            </p>
            <div style={css('display:flex;flex-wrap:wrap;gap:12px;margin-bottom:32px')}>
              <Link
                href="/devenir-salle-partenaire"
                className="btn-cta"
                style={css('padding:15px 26px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:14.5px')}
              >
                Découvrir E-Gym →
              </Link>
              <Link
                href="/contact"
                className="btn-cta"
                style={css('padding:15px 26px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.2));color:#fff;font-weight:700;font-size:14.5px')}
              >
                Demander une démo →
              </Link>
            </div>
            <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(120px,100%),1fr));gap:16px')}>
              {GYM_SOLUTION_POINTS.map((p) => (
                <div key={p.t} style={css('display:flex;align-items:center;gap:10px')}>
                  <span
                    style={css(
                      'width:34px;height:34px;flex:0 0 auto;border-radius:10px;background:rgba(198,242,2,.1);color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center'
                    )}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {p.icon}
                    </svg>
                  </span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13.5 }}>{p.t}</div>
                    <div style={css('font-size:11.5px;color:var(--muted,#8a8a8a)')}>{p.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(40px,6vw,72px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b);overflow:hidden')}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:600;margin-bottom:26px')}>Ils nous font confiance</div>

          {/* Desktop/tablette : grille classique. Remplacée sous 680px par un bandeau
              défilant en boucle (liste dupliquée + animation marquee de globals.css) plutôt
              que de laisser les logos se chevaucher en s'empilant. */}
          <div data-partners-grid="" style={css('display:flex;gap:24px;flex-wrap:wrap;justify-content:center;align-items:center')}>
            {PARTNERS.map((p) => (
              <div
                key={p.name}
                title={p.name}
                style={{
                  width: 140,
                  height: 90,
                  borderRadius: 14,
                  background: '#fff',
                  position: 'relative',
                  overflow: 'hidden',
                  flex: '0 0 auto',
                }}
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', padding: 12 }}
                />
              </div>
            ))}
          </div>

          <div data-partners-marquee="" style={{ overflow: 'hidden' }}>
            <div className="partners-marquee-track" style={css('display:flex;gap:24px;width:max-content')}>
              {[...PARTNERS, ...PARTNERS].map((p, i) => (
                <div
                  key={`${p.name}-${i}`}
                  title={p.name}
                  style={{
                    width: 140,
                    height: 90,
                    borderRadius: 14,
                    background: '#fff',
                    position: 'relative',
                    overflow: 'hidden',
                    flex: '0 0 auto',
                  }}
                >
                  <img
                    src={p.logo}
                    alt={p.name}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', padding: 12 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(64px,10vw,130px) clamp(20px,5vw,64px);background:var(--lime,#C6F202);color:#000')}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(34px,6vw,64px);letter-spacing:-2px;line-height:1")}>Prêt à commencer ?</h2>
          <p style={css('font-size:clamp(16px,2.2vw,20px);margin:18px auto 32px;max-width:52ch;opacity:.85;line-height:1.5')}>
            Votre premier bilan est offert. Un conseiller GBÔ vous accompagne pas à pas.
          </p>
          <Link
            href="/fitness"
            className="btn-cta"
            style={css('padding:18px 40px;border-radius:14px;background:#000;color:#C6F202;font-weight:700;font-size:17px;display:inline-block')}
          >
            Démarrer mon accompagnement
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
