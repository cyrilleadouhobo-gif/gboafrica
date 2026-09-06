import Link from 'next/link';
import { css } from '../../lib/css.js';
import ImageSlot from '../../components/ImageSlot.js';
import Reveal from '../../components/Reveal.js';
import GlowBlobs from '../../components/GlowBlobs.js';
import HeroCarousel from '../../components/HeroCarousel.js';
import { stockPhoto } from '../../lib/stockPhoto.js';
import { METHOD_STEPS } from '../../data/content.js';

export const metadata = {
  title: 'GBÔ Fitness — Un accompagnement sportif, pensé pour vous.',
};

// Carrousel du hero Fitness — visuels GBÔ fournis par Cyrille (Documents/hero fitness).
// Casting mixte et bannière floutée assumés par Cyrille sur 2 des 4 photos (voir échange
// du jour) ; `position` recadre les 2 photos carrées sur mobile (cover coupe sinon le sujet).
const FITNESS_HERO_SLIDES = [
  { src: '/images/hero-fitness/fitness-1.jpg', position: '72% 55%' }, // développé couché, salle moderne
  { src: '/images/hero-fitness/fitness-2.jpg' }, // ambiance salle, dumbbells
  { src: '/images/hero-fitness/fitness-3.jpg', position: '35% center' }, // cours collectif en extérieur
  { src: '/images/hero-fitness/fitness-4.jpg', position: '60% 55%' }, // étirements en extérieur
];

const TRUST_ITEMS = [
  {
    label: 'Des coachs qualifiés',
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
      </>
    ),
  },
  {
    label: 'Partout à Abidjan',
    icon: (
      <>
        <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
        <circle cx="12" cy="9" r="2.5" />
      </>
    ),
  },
  {
    label: 'Un suivi personnalisé',
    icon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 8h6M9 12h6M9 16h3" />
      </>
    ),
  },
];

// Bandeaux des cartes offres (voir section « Choisissez votre accompagnement »).
const PARTICULIER_BANNER = 'https://images.pexels.com/photos/34043589/pexels-photo-34043589.jpeg?auto=compress&cs=tinysrgb&w=1200'; // effort individuel
const ENTREPRISE_BANNER = 'https://images.pexels.com/photos/30688593/pexels-photo-30688593.jpeg?auto=compress&cs=tinysrgb&w=1200'; // équipe de professionnels, Lagos — code vestimentaire entreprise

// Icônes des 4 étapes (voir section « Notre approche »).
const STEP_ICONS = [
  // Évaluer — loupe
  <>
    <circle cx="10" cy="10" r="6" />
    <path d="M21 21l-5-5" />
  </>,
  // Construire — plan / document
  <>
    <path d="M6 3h9l4 4v14H6z" />
    <path d="M9 12h6M9 16h6" />
  </>,
  // Accompagner — haltère
  <>
    <path d="M4 9v6M20 9v6" />
    <path d="M2 8v8M22 8v8" />
    <path d="M7 12h10" />
  </>,
  // Suivre — courbe de progression
  <>
    <path d="M4 19V9M11 19V4M18 19v-7" />
  </>,
];

// Profils provisoires (noms/photos placeholder), en attendant que Cyrille fournisse les
// vraies fiches coachs pour cette section — même logique que COACHES_PREVIEW sur l'accueil.
const FITNESS_COACHES = [
  { name: 'Koffi A.', spec: 'Renforcement musculaire', level: 'Expert', zone: 'Cocody', photo: 'https://images.pexels.com/photos/4908557/pexels-photo-4908557.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Awa D.', spec: 'Perte de poids', level: 'Confirmé', zone: 'Plateau', photo: 'https://images.pexels.com/photos/6455796/pexels-photo-6455796.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Moussa T.', spec: 'Préparation physique', level: 'Expert', zone: 'Marcory', photo: 'https://images.pexels.com/photos/5878697/pexels-photo-5878697.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Sarah K.', spec: 'Remise en forme', level: 'Confirmé', zone: 'Yopougon', photo: 'https://images.pexels.com/photos/7113554/pexels-photo-7113554.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

// Icônes des objectifs (voir section « Quel est votre objectif ? »).
const GOALS = [
  {
    label: 'Perte de poids',
    icon: (
      <>
        <path d="M12 3v3M5 8l2 2M19 8l-2 2" />
        <circle cx="12" cy="15" r="6" />
        <path d="M12 15l3-3" />
      </>
    ),
  },
  {
    label: 'Remise en forme',
    icon: <path d="M20.8 8.6c0 5-8.8 10-8.8 10s-8.8-5-8.8-10a4.6 4.6 0 018.8-1.8A4.6 4.6 0 0120.8 8.6z" />,
  },
  {
    label: 'Renforcement musculaire',
    icon: (
      <>
        <path d="M4 9v6M20 9v6" />
        <path d="M2 8v8M22 8v8" />
        <path d="M7 12h10" />
      </>
    ),
  },
  {
    label: 'Prise de masse musculaire',
    icon: (
      <>
        <path d="M6.5 7c-2 1-3 3-2 5.5C3.5 14 4 17 7 18c2 3 8 3 10 0 3-1 3.5-4 2.5-5.5 1-2.5 0-4.5-2-5.5-1-2-4-3-5.5-1.5C10.5 4 7.5 5 6.5 7z" />
      </>
    ),
  },
  {
    label: 'Préparation physique',
    icon: (
      <>
        <circle cx="13" cy="5" r="2" />
        <path d="M6 21l3-6 3 2 2-5 4 3M9 15l-3-3 2-4" />
      </>
    ),
  },
  {
    label: 'Amélioration de la condition physique',
    icon: <path d="M4 19V9M11 19V4M18 19v-7" />,
  },
  {
    label: 'Besoins spécifiques',
    icon: (
      <>
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </>
    ),
  },
];

export default function FitnessPage() {
  return (
    <div>
      <section
        style={css(
          'position:relative;overflow:hidden;padding:clamp(48px,10vw,120px) clamp(20px,5vw,64px) clamp(24px,5vw,56px);border-bottom:1px solid var(--border,rgba(255,255,255,.08))'
        )}
      >
        <HeroCarousel slides={FITNESS_HERO_SLIDES} dotsBottom={20} />
        <div
          style={css(
            'position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.85) 0%,rgba(0,0,0,.6) 45%,rgba(0,0,0,.3) 75%),linear-gradient(180deg,rgba(0,0,0,.5) 0%,rgba(0,0,0,.35) 45%,rgba(0,0,0,.85) 100%);pointer-events:none'
          )}
        />
        <GlowBlobs />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
          <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,6vw,54px);letter-spacing:-1.5px;line-height:1.02;max-width:14ch")}>
            BOUGEZ.
            <br />
            PROGRESSEZ.
            <br />
            À VOTRE RYTHME.
          </h1>
          <p style={css('font-size:clamp(16px,2.2vw,20px);color:var(--muted,#c8c8c8);max-width:56ch;margin-top:20px;line-height:1.5')}>
            Un accompagnement sportif adapté à vos objectifs, votre niveau et votre quotidien.
          </p>
          <Link
            href="#accompagnement"
            className="btn-cta"
            style={css('margin-top:28px;display:inline-block;padding:16px 30px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:16px')}
          >
            Commencer maintenant →
          </Link>
          <div style={css('display:flex;flex-wrap:wrap;gap:clamp(18px,3vw,34px);margin-top:34px')}>
            {TRUST_ITEMS.map((t) => (
              <div key={t.label} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--lime,#C6F202)" strokeWidth="2">
                  {t.icon}
                </svg>
                <span style={css('font-size:13.5px;font-weight:600;color:rgba(255,255,255,.85)')}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Reveal as="section" id="accompagnement" style={css('padding:clamp(40px,6vw,72px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div
            style={css(
              'display:flex;flex-wrap:wrap;gap:24px;justify-content:space-between;align-items:flex-end;margin-bottom:34px'
            )}
          >
            <div>
              <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:10px')}>
                Deux façons de vous accompagner
              </div>
              <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,4vw,36px);letter-spacing:-1px")}>Choisissez votre accompagnement.</h2>
            </div>
            <p style={css('font-size:14.5px;color:var(--muted,#8a8a8a);max-width:38ch;line-height:1.6')}>
              Que vous soyez un particulier ou une entreprise, GBÔ vous propose des solutions adaptées à vos besoins.
            </p>
          </div>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:18px')}>
            <Reveal
              className="hover-card"
              style={css(
                'border-radius:24px;border:1px solid var(--border,rgba(255,255,255,.12));background:var(--glass,rgba(255,255,255,.03));display:flex;flex-wrap:wrap;overflow:hidden'
              )}
            >
              <div style={{ position: 'relative', flex: '1 1 220px', minHeight: 220 }}>
                <ImageSlot placeholder="Accompagnement individuel GBÔ" src={PARTICULIER_BANNER} />
              </div>
              <div style={css('padding:clamp(24px,4vw,32px);display:flex;flex-direction:column;flex:2 1 300px')}>
                <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:600;margin-bottom:8px')}>Pour moi</div>
                <h2 style={css("font-family:'Broaven';font-weight:700;font-size:26px;margin-bottom:10px")}>Particulier</h2>
                <p style={css('font-size:15px;color:var(--muted,#8a8a8a);line-height:1.5;margin-bottom:18px')}>
                  Un coaching adapté à votre objectif, votre niveau et votre rythme.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 8, flex: 1 }}>
                  {[
                    'Coaching à domicile',
                    'Coaching en salle partenaire',
                    'Suivi de progression',
                    'Option suivi nutritionnel',
                  ].map((f) => (
                    <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--lime,#C6F202)" strokeWidth="3" style={{ flex: '0 0 auto', marginTop: 2 }}>
                        <path d="M5 12l5 5L20 6" />
                      </svg>
                      <span style={css('font-size:14px;color:var(--muted,#8a8a8a);line-height:1.45')}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/deux-seances-gratuites"
                  className="btn-cta"
                  style={css('margin-top:18px;padding:15px 26px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:15px;display:inline-block;text-align:center')}
                >
                  Commencer mon accompagnement →
                </Link>
              </div>
            </Reveal>
            <Reveal
              delay={80}
              className="hover-card"
              style={css(
                'border-radius:24px;border:1px solid var(--border,rgba(255,255,255,.12));background:var(--glass,rgba(255,255,255,.03));display:flex;flex-wrap:wrap;overflow:hidden'
              )}
            >
              <div style={{ position: 'relative', flex: '1 1 220px', minHeight: 220 }}>
                <ImageSlot placeholder="Programme entreprise GBÔ" src={ENTREPRISE_BANNER} />
              </div>
              <div style={css('padding:clamp(24px,4vw,32px);display:flex;flex-direction:column;flex:2 1 300px')}>
                <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:600;margin-bottom:8px')}>Pour mes équipes</div>
                <h2 style={css("font-family:'Broaven';font-weight:700;font-size:26px;margin-bottom:10px")}>Entreprise</h2>
                <p style={css('font-size:15px;color:var(--muted,#8a8a8a);line-height:1.5;margin-bottom:18px')}>
                  Des séances collectives encadrées pour intégrer davantage d&apos;activité physique dans la vie de vos collaborateurs.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 8, flex: 1 }}>
                  {['Séances collectives', 'Programme adapté à votre entreprise'].map((f) => (
                    <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--lime,#C6F202)" strokeWidth="3" style={{ flex: '0 0 auto', marginTop: 2 }}>
                        <path d="M5 12l5 5L20 6" />
                      </svg>
                      <span style={css('font-size:14px;color:var(--muted,#8a8a8a);line-height:1.45')}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/corporate"
                  className="btn-cta"
                  style={css('margin-top:18px;padding:15px 26px;border-radius:12px;border:1px solid var(--fg,#fff);color:var(--fg,#fff);font-weight:700;font-size:15px;background:transparent;display:inline-block;text-align:center')}
                >
                  Découvrir nos solutions →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(56px,9vw,110px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b);border-top:1px solid var(--border,rgba(255,255,255,.08))')}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:10px')}>Notre approche</div>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,4.5vw,44px);letter-spacing:-1px;margin-bottom:40px")}>
            Un accompagnement qui s&apos;adapte à vous.
          </h2>
          <div data-stepsrow="" style={css('display:flex;align-items:flex-start;gap:10px')}>
            {METHOD_STEPS.flatMap((m, i) => [
              i > 0 && (
                <svg
                  key={`arrow-${m.n}`}
                  data-hidemobile=""
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--border,rgba(255,255,255,.25))"
                  strokeWidth="2"
                  style={{ flex: '0 0 auto', marginTop: 12 }}
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              ),
              <div key={m.n} style={{ flex: '1 1 0', minWidth: 140 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div
                    style={css(
                      "width:38px;height:38px;border-radius:50%;background:var(--lime,#C6F202);color:#000;display:flex;align-items:center;justify-content:center;font-family:'Broaven';font-weight:700;font-size:14px;flex:0 0 auto"
                    )}
                  >
                    {m.n}
                  </div>
                  <div
                    style={css(
                      'width:44px;height:44px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.14));display:flex;align-items:center;justify-content:center;flex:0 0 auto'
                    )}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lime,#C6F202)" strokeWidth="2">
                      {STEP_ICONS[i]}
                    </svg>
                  </div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{m.title}</div>
                <div style={css('font-size:14px;color:var(--muted,#8a8a8a);line-height:1.55')}>{m.desc}</div>
              </div>,
            ])}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(56px,9vw,110px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div
            style={css('display:flex;flex-wrap:wrap;gap:16px;justify-content:space-between;align-items:flex-end;margin-bottom:34px')}
          >
            <div>
              <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:10px')}>
                Des coachs pour vos objectifs
              </div>
              <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,4vw,36px);letter-spacing:-1px")}>
                Le bon accompagnement commence par le bon coach.
              </h2>
            </div>
            <Link href="/coachs" style={css('font-size:14px;font-weight:700;color:var(--lime,#C6F202);white-space:nowrap')}>
              Voir tous nos coachs →
            </Link>
          </div>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px')}>
            {FITNESS_COACHES.map((c, i) => (
              <Reveal key={c.name} delay={i * 60} className="hover-card" style={css('border-radius:18px;overflow:hidden;border:1px solid var(--border,rgba(255,255,255,.09))')}>
                <div style={{ aspectRatio: '4/5', position: 'relative' }}>
                  <ImageSlot placeholder={`Photo de ${c.name}`} src={c.photo} />
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{c.name}</div>
                  <div style={css('font-size:13px;color:var(--muted,#8a8a8a);margin-top:4px;line-height:1.4')}>{c.spec}</div>
                  <div style={css('display:flex;gap:8px;margin-top:10px')}>
                    <span style={css('padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;background:rgba(198,242,2,.12);color:var(--lime,#C6F202);border:1px solid rgba(198,242,2,.3)')}>
                      {c.level}
                    </span>
                    <span style={css('padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;color:var(--muted,#8a8a8a);border:1px solid var(--border,rgba(255,255,255,.14))')}>
                      {c.zone}
                    </span>
                  </div>
                  <Link href="/coachs" style={css('margin-top:14px;font-size:13px;font-weight:700;color:var(--lime,#C6F202);display:inline-block')}>
                    Voir le profil →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(40px,6vw,72px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b);border-top:1px solid var(--border,rgba(255,255,255,.08))')}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={css('text-align:center;max-width:640px;margin:0 auto 34px')}>
            <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:10px')}>
              Votre objectif. Notre accompagnement.
            </div>
            <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,4vw,36px);letter-spacing:-1px")}>Quel est votre objectif ?</h2>
          </div>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px')}>
            {GOALS.map((g, i) => (
              <Link key={g.label} href="/fitness/tunnel" style={{ color: 'inherit', textDecoration: 'none' }}>
                <Reveal
                  delay={i * 40}
                  className="hover-card"
                  style={css(
                    'padding:22px 14px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--glass,rgba(255,255,255,.03));display:flex;flex-direction:column;align-items:center;text-align:center;gap:12px'
                  )}
                >
                  <div
                    style={css(
                      'width:42px;height:42px;border-radius:12px;background:rgba(198,242,2,.1);color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center'
                    )}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {g.icon}
                    </svg>
                  </div>
                  <span style={css('font-size:13px;font-weight:600;color:rgba(255,255,255,.85);line-height:1.3')}>{g.label}</span>
                </Reveal>
              </Link>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(56px,9vw,110px) clamp(20px,5vw,64px)')}>
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
          <ImageSlot placeholder="Des personnes plus fortes, un quotidien plus beau" src={stockPhoto('gymInterior', 'fitness-final-cta', '1600x600')} />
          <div
            style={css(
              'position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.9) 0%,rgba(0,0,0,.75) 50%,rgba(0,0,0,.35) 100%);pointer-events:none'
            )}
          />
          <div style={css('position:relative;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:24px;padding:clamp(32px,5vw,56px)')}>
            <div style={{ maxWidth: 480 }}>
              <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:10px')}>
                Prêt à commencer ?
              </div>
              <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,3.6vw,36px);letter-spacing:-1px;line-height:1.1;margin-bottom:14px")}>
                Transformez vos objectifs en réalité.
              </h2>
              <p style={css('font-size:15px;color:rgba(255,255,255,.75);line-height:1.55;margin-bottom:22px')}>
                Choisissez votre accompagnement et présentez-nous votre objectif. GBÔ vous orientera vers la formule et le coach adaptés.
              </p>
              <Link
                href="/fitness/tunnel"
                className="btn-cta"
                style={css('display:inline-block;padding:16px 30px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:15px')}
              >
                Commencer maintenant →
              </Link>
            </div>
            <Link href="/deux-seances-gratuites" style={css('font-size:13.5px;font-weight:600;color:rgba(255,255,255,.8);text-align:right;max-width:220px;line-height:1.5')}>
              Deux séances gratuites pour découvrir l&apos;expérience GBÔ
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
