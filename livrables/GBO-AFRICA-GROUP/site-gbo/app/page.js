'use client';

import Link from 'next/link';
import { css } from '../lib/css.js';
import { useAppData } from '../context/AppData.js';
import ImageSlot from '../components/ImageSlot.js';
import Honeypot from '../components/Honeypot.js';
import Reveal from '../components/Reveal.js';
import GlowBlobs from '../components/GlowBlobs.js';
import VideoIntro from '../components/VideoIntro.js';
import HeroCarousel from '../components/HeroCarousel.js';
import { stockPhoto } from '../lib/stockPhoto.js';
import { POLES, badgeStyle } from '../data/poles.js';
import { VALUES, METHOD_STEPS, TESTIMONIALS, PARTNERS } from '../data/content.js';

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
const VALUES_BANNER = 'https://images.pexels.com/photos/34043568/pexels-photo-34043568.jpeg?auto=compress&cs=tinysrgb&w=1600'; // groupe posé, esprit d'équipe
const METHODE_BANNER = 'https://images.pexels.com/photos/34043577/pexels-photo-34043577.jpeg?auto=compress&cs=tinysrgb&w=1600'; // développé couché, rigueur technique
const POLES_BANNER = 'https://images.pexels.com/photos/34043595/pexels-photo-34043595.jpeg?auto=compress&cs=tinysrgb&w=1600'; // squat, énergie, diversité des pratiques

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

export default function HomePage() {
  const { showToast } = useAppData();

  const submitNewsletter = async (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: f.get('email'), website: f.get('website') }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Une erreur est survenue, réessayez.');
        return;
      }
      e.target.reset();
      showToast("Presque terminé — confirmez via l'e-mail (double opt-in).");
    } catch {
      showToast('Connexion impossible. Réessayez.');
    }
  };

  const poles = POLES.map((p) => ({ ...p, statusLabel: p.status === 'op' ? 'Disponible' : 'Bientôt' }));

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
            <h1 style={css("font-family:'Broaven',sans-serif;font-weight:700;font-size:clamp(26px,6vw,74px);line-height:.98;letter-spacing:-2px;color:#fff;white-space:nowrap;margin-top:clamp(16px,4vw,44px);animation:fadeUp .7s .05s both")}>
              GBÔ AFRICA <span style={{ color: '#C6F202' }}>GROUP</span>
            </h1>
            <p style={css("font-size:clamp(16px,2.2vw,21px);color:rgba(255,255,255,.82);max-width:64ch;margin-top:22px;line-height:1.5;animation:fadeUp .7s .12s both")}>
              Construire un écosystème sportif plus accessible, plus structuré et plus performant.
            </p>
            <p style={css("font-style:italic;font-size:clamp(16px,2.2vw,21px);color:rgba(255,255,255,.82);max-width:64ch;margin-top:22px;line-height:1.5;animation:fadeUp .7s .16s both")}>
              Nous développons des solutions pour permettre aux particuliers, aux entreprises et aux acteurs du sport de mieux pratiquer, progresser et se développer.
            </p>
            <div style={css('display:flex;justify-content:center;flex-wrap:wrap;gap:14px;margin-top:34px;animation:fadeUp .7s .2s both')}>
              <Link
                href="/fitness"
                className="btn-cta"
                style={css('padding:16px 30px;border-radius:12px;border:1px solid rgba(255,255,255,.3);color:#fff;font-weight:700;font-size:16px;background:rgba(255,255,255,.05)')}
              >
                Découvrir GBÔ Fitness
              </Link>
            </div>
          </div>
        </div>
        <div
          style={css(
            'position:absolute;bottom:22px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:6px;color:rgba(255,255,255,.5);font-size:11px;letter-spacing:1px;animation:pulse 2s infinite'
          )}
        >
          SCROLL
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
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

      <Reveal as="section" style={css('position:relative;padding:clamp(64px,11vw,140px) clamp(20px,5vw,64px);text-align:center')} data-anchor="mission">
        <GlowBlobs />
        <div style={{ maxWidth: 960, margin: '0 auto', position: 'relative' }}>
          <p style={css("font-size:clamp(26px,4.4vw,46px);font-family:'Broaven';font-weight:500;line-height:1.25;letter-spacing:-1px")}>
            GBÔ est un <span style={{ color: 'var(--lime,#C6F202)' }}>écosystème du mouvement</span> — sport, bien-être, communauté et formation réunis sous une même
            exigence : l&apos;excellence accessible.
          </p>
        </div>
      </Reveal>

      <Reveal
        as="section"
        style={css(
          'padding:clamp(56px,9vw,120px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b);border-top:1px solid var(--border,rgba(255,255,255,.08));border-bottom:1px solid var(--border,rgba(255,255,255,.08))'
        )}
      >
        <div style={css('max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:clamp(32px,5vw,72px)')}>
          <div>
            <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:16px')}>Notre mission</div>
            <p style={css('font-size:clamp(18px,2.4vw,24px);line-height:1.5;font-weight:500')}>
              Développer des solutions innovantes permettant à chaque individu et à chaque organisation d&apos;intégrer durablement le sport, l&apos;activité
              physique et le bien-être dans leur quotidien.
            </p>
          </div>
          <div>
            <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:16px')}>Notre vision</div>
            <p style={css('font-size:clamp(18px,2.4vw,24px);line-height:1.5;font-weight:500')}>
              Devenir la référence africaine du sport, du fitness et du bien-être accessible à tous.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(56px,9vw,120px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={css('position:relative;height:260px;border-radius:24px;overflow:hidden;margin-bottom:34px')}>
            <ImageSlot src={VALUES_BANNER} placeholder="Esprit d'équipe GBÔ" />
            <div style={css('position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.88) 0%,rgba(0,0,0,.45) 55%,rgba(0,0,0,.15) 100%)')} />
            <div style={css('position:relative;height:100%;display:flex;flex-direction:column;justify-content:center;padding:clamp(24px,4vw,48px)')}>
              <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:10px')}>Nos valeurs</div>
              <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,4.5vw,44px);letter-spacing:-1px;color:#fff")}>Ce qui nous tient debout.</h2>
            </div>
          </div>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px')}>
            {VALUES.map((v, i) => (
              <Reveal
                key={v.n}
                delay={i * 70}
                className="hover-card"
                style={css(
                  'padding:24px;border-radius:18px;border:1px solid var(--border,rgba(255,255,255,.09));background:var(--glass,rgba(255,255,255,.02))'
                )}
              >
                <div
                  style={css(
                    "width:44px;height:44px;border-radius:12px;background:rgba(198,242,2,.12);color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center;margin-bottom:16px;font-family:'Broaven';font-weight:700;font-size:18px"
                  )}
                >
                  {v.n}
                </div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{v.title}</div>
                <div style={css('font-size:14px;color:var(--muted,#8a8a8a);line-height:1.5')}>{v.desc}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(56px,9vw,120px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b)')}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={css('position:relative;height:260px;border-radius:24px;overflow:hidden;margin-bottom:38px')}>
            <ImageSlot src={METHODE_BANNER} placeholder="Rigueur technique en salle" />
            <div style={css('position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.88) 0%,rgba(0,0,0,.4) 60%,rgba(0,0,0,.1) 100%)')} />
            <div style={css('position:relative;height:100%;display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:16px;padding:clamp(24px,4vw,48px)')}>
              <div>
                <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:10px')}>Actif de marque</div>
                <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,4.5vw,44px);letter-spacing:-1px;color:#fff")}>La Méthode GBÔ</h2>
              </div>
              <Link href="/fitness" style={css('padding:12px 22px;border-radius:11px;border:1px solid rgba(255,255,255,.4);font-weight:700;font-size:14px;color:#fff;background:rgba(0,0,0,.3)')}>
                En savoir plus →
              </Link>
            </div>
          </div>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px')}>
            {METHOD_STEPS.map((m, i) => (
              <Reveal
                key={m.n}
                delay={i * 70}
                className="hover-card"
                style={css('padding:22px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.09));position:relative;overflow:hidden')}
              >
                <div style={css("font-family:'Broaven';font-weight:700;font-size:40px;color:rgba(198,242,2,.22);line-height:1")}>{m.n}</div>
                <div style={{ fontWeight: 700, fontSize: 17, margin: '8px 0 6px' }}>{m.title}</div>
                <div style={css('font-size:13px;color:var(--muted,#8a8a8a);line-height:1.5')}>{m.desc}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(56px,9vw,120px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={css('position:relative;height:260px;border-radius:24px;overflow:hidden;margin-bottom:34px')}>
            <ImageSlot src={POLES_BANNER} placeholder="Diversité des pratiques GBÔ" />
            <div style={css('position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.88) 0%,rgba(0,0,0,.45) 55%,rgba(0,0,0,.15) 100%)')} />
            <div style={css('position:relative;height:100%;display:flex;flex-direction:column;justify-content:center;padding:clamp(24px,4vw,48px)')}>
              <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:10px')}>L&apos;écosystème</div>
              <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,4.5vw,44px);letter-spacing:-1px;color:#fff")}>Six pôles, une marque.</h2>
            </div>
          </div>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px')}>
            {poles.map((p, i) => (
              <Reveal
                as={Link}
                key={p.key}
                href={p.key === 'fitness' ? '/fitness' : `/poles/${p.key}`}
                delay={i * 60}
                className="hover-card"
                style={css('display:block;padding:26px;border-radius:20px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--glass,rgba(255,255,255,.02));cursor:pointer')}
              >
                <div style={css('display:flex;align-items:center;justify-content:space-between;margin-bottom:18px')}>
                  <div
                    style={css(
                      "width:48px;height:48px;border-radius:13px;background:var(--lime,#C6F202);color:#000;display:flex;align-items:center;justify-content:center;font-family:'Broaven';font-weight:700;font-size:20px"
                    )}
                  >
                    {p.mono}
                  </div>
                  <span style={css(badgeStyle(p.status))}>{p.statusLabel}</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 6 }}>{p.name}</div>
                <div style={css('font-size:14px;color:var(--muted,#8a8a8a);line-height:1.5')}>{p.tagline}</div>
                <div style={css('margin-top:18px;font-size:13px;font-weight:700;color:var(--lime,#C6F202)')}>{p.cta} →</div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(56px,9vw,120px) clamp(20px,5vw,64px)')}>
        <div
          style={css(
            'max-width:1200px;margin:0 auto;padding:clamp(40px,6vw,64px);border-radius:28px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--glass,rgba(255,255,255,.03));text-align:center'
          )}
        >
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:600;margin-bottom:14px')}>
            Vous êtes un professionnel du fitness ?
          </div>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,5vw,48px);letter-spacing:-1px;margin-bottom:18px")}>
            GBÔ vous accompagne aussi.
          </h2>
          <p style={css('font-size:15px;color:var(--muted,#8a8a8a);font-weight:600;letter-spacing:.5px;margin-bottom:30px')}>
            Digitalisation · Talents · Acquisition · Animation
          </p>
          <Link
            href="/pour-les-salles"
            className="btn-cta"
            style={css('display:inline-block;padding:16px 30px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:15px')}
          >
            Découvrir les solutions pour les salles →
          </Link>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(56px,9vw,120px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={css('text-align:center;max-width:640px;margin:0 auto 40px')}>
            <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px')}>
              Nos coachs
            </div>
            <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,4.5vw,44px);letter-spacing:-1px;margin-bottom:16px")}>
              Une équipe de coachs certifiés.
            </h2>
            <p style={css('font-size:16px;color:var(--muted,#8a8a8a);line-height:1.55')}>
              Sélectionnés et formés par GBÔ, chaque coach est affecté selon sa spécialité, sa zone et vos disponibilités.
            </p>
          </div>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr));gap:16px')}>
            {COACHES_PREVIEW.map((c, i) => (
              <Reveal key={c.name} delay={i * 50} className="hover-card" style={css('border-radius:18px;overflow:hidden;border:1px solid var(--border,rgba(255,255,255,.09))')}>
                <div style={{ aspectRatio: '4/5', position: 'relative' }}>
                  <ImageSlot placeholder={`Photo de ${c.name}`} src={c.photo} />
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{c.name}</div>
                  <div style={css('font-size:13px;color:var(--muted,#8a8a8a);margin-top:4px;line-height:1.4')}>{c.spec}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link href="/coachs" style={css('font-weight:700;font-size:15px;color:var(--lime,#C6F202)')}>
              Voir tous nos coachs →
            </Link>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(56px,9vw,120px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ position: 'relative' }}>
            <GlowBlobs compact />
            <h2 style={css("position:relative;font-family:'Broaven';font-weight:700;font-size:clamp(28px,4.5vw,44px);letter-spacing:-1px;margin-bottom:34px")}>Ils vivent GBÔ.</h2>
          </div>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px')}>
            {TESTIMONIALS.map((t, i) => (
              <Reveal
                key={t.id}
                delay={i * 70}
                className="hover-card"
                style={css('padding:28px;border-radius:18px;border:1px solid var(--border,rgba(255,255,255,.09));background:var(--glass,rgba(255,255,255,.02))')}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="var(--lime,#C6F202)" style={{ opacity: 0.9 }}>
                  <path d="M10 7H6a3 3 0 00-3 3v7h7v-7H6c0-1 0-3 4-3zm11 0h-4a3 3 0 00-3 3v7h7v-7h-4c0-1 0-3 4-3z" />
                </svg>
                <p style={{ fontSize: 16, lineHeight: 1.55, margin: '14px 0 18px' }}>{t.quote}</p>
                <div style={css('display:flex;align-items:center;gap:12px')}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', flex: '0 0 auto', position: 'relative' }}>
                    <ImageSlot shape="circle" placeholder="Photo" src={stockPhoto('portrait', t.id, '200x200')} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                    <div style={css('font-size:12.5px;color:var(--muted,#8a8a8a)')}>{t.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(40px,6vw,72px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b);overflow:hidden')}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:600;margin-bottom:26px')}>Ils nous font confiance</div>
          <div style={css('display:flex;gap:48px;flex-wrap:wrap;justify-content:center;align-items:center;opacity:.75')}>
            {PARTNERS.map((p, i) => (
              <span key={i} style={css("font-family:'Broaven';font-weight:700;font-size:clamp(16px,2.4vw,24px);color:var(--muted,#8a8a8a)")}>
                {p}
              </span>
            ))}
          </div>
          <div style={css('font-size:11px;color:var(--muted,#8a8a8a);margin-top:22px;opacity:.7')}>Logos réels uniquement — emplacements réservés aux partenaires officiels.</div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('position:relative;padding:clamp(56px,9vw,110px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b)')}>
        <GlowBlobs />
        <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(26px,4vw,40px);letter-spacing:-1px;margin-bottom:12px")}>Restez dans le mouvement.</h2>
          <p style={css('color:var(--muted,#8a8a8a);font-size:16px;margin-bottom:26px;line-height:1.5')}>
            Conseils fitness, nutrition et bien-être, une fois par semaine. Double opt-in, désinscription en un clic.
          </p>
          <form onSubmit={submitNewsletter} style={css('display:flex;flex-wrap:wrap;gap:10px;max-width:520px;margin:0 auto')}>
            <input
              required
              type="email"
              name="email"
              placeholder="Votre e-mail"
              style={css(
                "flex:1;min-width:220px;padding:16px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.16));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:15px"
              )}
            />
            <button type="submit" className="btn-cta" style={css('padding:16px 26px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:15px')}>
              S&apos;inscrire
            </button>
            <Honeypot />
          </form>
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
