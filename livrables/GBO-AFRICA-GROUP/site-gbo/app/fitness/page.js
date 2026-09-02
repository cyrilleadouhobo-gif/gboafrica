import Link from 'next/link';
import { css } from '../../lib/css.js';
import ImageSlot from '../../components/ImageSlot.js';
import Reveal from '../../components/Reveal.js';
import GlowBlobs from '../../components/GlowBlobs.js';
import HeroCarousel from '../../components/HeroCarousel.js';
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

// Bandeaux des cartes offres (voir section « Choisissez votre accompagnement »).
const PARTICULIER_BANNER = 'https://images.pexels.com/photos/34043589/pexels-photo-34043589.jpeg?auto=compress&cs=tinysrgb&w=1200'; // effort individuel
const ENTREPRISE_BANNER = 'https://images.pexels.com/photos/30688593/pexels-photo-30688593.jpeg?auto=compress&cs=tinysrgb&w=1200'; // équipe de professionnels, Lagos — code vestimentaire entreprise

export default function FitnessPage() {
  return (
    <div>
      <section
        style={css(
          'position:relative;overflow:hidden;padding:clamp(80px,10vw,120px) clamp(20px,5vw,64px) clamp(30px,4vw,50px);border-bottom:1px solid var(--border,rgba(255,255,255,.08))'
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
          <span style={css('display:inline-block;padding:5px 12px;border-radius:20px;background:var(--lime,#C6F202);color:#000;font-size:12px;font-weight:700;margin-bottom:16px')}>
            ● Disponible
          </span>
          <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,6vw,54px);letter-spacing:-1.5px;line-height:1;max-width:16ch")}>
            Un accompagnement sportif, pensé pour vous.
          </h1>
          <p style={css('font-size:clamp(16px,2.2vw,20px);color:var(--muted,#c8c8c8);max-width:56ch;margin-top:20px;line-height:1.5')}>
            Choisissez le type d&apos;accompagnement recherché. Aucun compte n&apos;est requis pour démarrer.
          </p>
        </div>
      </section>

      <Reveal as="section" style={css('padding:clamp(40px,6vw,72px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 34 }}>
            <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:10px')}>
              Deux formats, une même exigence
            </div>
            <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,4vw,36px);letter-spacing:-1px")}>Choisissez votre accompagnement.</h2>
          </div>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:18px')}>
            <Reveal
              className="hover-card"
              style={css(
                'border-radius:24px;border:1px solid var(--border,rgba(255,255,255,.12));background:var(--glass,rgba(255,255,255,.03));display:flex;flex-direction:column;overflow:hidden'
              )}
            >
              <div style={{ position: 'relative', height: 150 }}>
                <ImageSlot placeholder="Accompagnement individuel GBÔ" src={PARTICULIER_BANNER} />
                <div style={css('position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.05) 0%,rgba(0,0,0,.55) 75%,rgba(0,0,0,.85) 100%)')} />
                <span
                  style={css(
                    "position:absolute;top:14px;left:14px;padding:5px 12px;border-radius:20px;background:var(--lime,#C6F202);color:#000;font-size:11px;font-weight:700;letter-spacing:.3px"
                  )}
                >
                  Le plus choisi
                </span>
              </div>
              <div style={css('padding:clamp(24px,4vw,32px);display:flex;flex-direction:column;flex:1')}>
                <div
                  style={css(
                    'width:44px;height:44px;border-radius:12px;background:var(--lime,#C6F202);color:#000;display:flex;align-items:center;justify-content:center;margin-bottom:18px'
                  )}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
                  </svg>
                </div>
                <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:600;margin-bottom:8px')}>Pour moi</div>
                <h2 style={css("font-family:'Broaven';font-weight:700;font-size:26px;margin-bottom:10px")}>Particulier</h2>
                <p style={css('font-size:15px;font-weight:600;color:var(--fg,#fff);line-height:1.5;margin-bottom:18px')}>
                  Un coach dédié, un programme qui s&apos;adapte à votre vie — pas l&apos;inverse.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 8, flex: 1 }}>
                  {[
                    'Bilan initial offert',
                    'Coach dédié selon vos objectifs',
                    'Séances à domicile, en salle partenaire ou en extérieur',
                    'Suivi nutritionnel en option',
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
                  href="/fitness/tunnel"
                  className="btn-cta"
                  style={css('margin-top:18px;width:100%;padding:16px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:16px;display:block;text-align:center')}
                >
                  Commencer
                </Link>
                <div style={css('margin-top:10px;text-align:center;font-size:12px;color:var(--muted,#8a8a8a)')}>Sans engagement · Aucun compte requis</div>
              </div>
            </Reveal>
            <Reveal
              delay={80}
              className="hover-card"
              style={css(
                'border-radius:24px;border:1px solid var(--border,rgba(255,255,255,.12));background:var(--glass,rgba(255,255,255,.03));display:flex;flex-direction:column;overflow:hidden'
              )}
            >
              <div style={{ position: 'relative', height: 150 }}>
                <ImageSlot placeholder="Programme entreprise GBÔ" src={ENTREPRISE_BANNER} />
                <div style={css('position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.05) 0%,rgba(0,0,0,.55) 75%,rgba(0,0,0,.85) 100%)')} />
                <span
                  style={css(
                    "position:absolute;top:14px;left:14px;padding:5px 12px;border-radius:20px;border:1px solid rgba(255,255,255,.5);background:rgba(0,0,0,.4);color:#fff;font-size:11px;font-weight:700;letter-spacing:.3px"
                  )}
                >
                  Sur devis
                </span>
              </div>
              <div style={css('padding:clamp(24px,4vw,32px);display:flex;flex-direction:column;flex:1')}>
                <div
                  style={css(
                    'width:44px;height:44px;border-radius:12px;border:1px solid var(--lime,#C6F202);color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center;margin-bottom:18px'
                  )}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 21V7l7-4v6l7-4v16" />
                    <path d="M3 21h18" />
                  </svg>
                </div>
                <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:600;margin-bottom:8px')}>Pour mes équipes</div>
                <h2 style={css("font-family:'Broaven';font-weight:700;font-size:26px;margin-bottom:10px")}>Entreprise</h2>
                <p style={css('font-size:15px;font-weight:600;color:var(--fg,#fff);line-height:1.5;margin-bottom:18px')}>
                  Un collectif plus en forme, plus soudé, moins absent.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 8, flex: 1 }}>
                  {[
                    'Diagnostic santé et bien-être de vos équipes',
                    'Programme sur-mesure (sport, ateliers, événements)',
                    "Suivi d'impact : participation, satisfaction",
                    'Interlocuteur dédié GBÔ Corporate',
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
                  href="/corporate"
                  className="btn-cta"
                  style={css('margin-top:18px;width:100%;padding:16px;border-radius:12px;border:1px solid var(--fg,#fff);color:var(--fg,#fff);font-weight:700;font-size:16px;background:transparent;display:block;text-align:center')}
                >
                  Découvrir nos solutions
                </Link>
                <div style={css('margin-top:10px;text-align:center;font-size:12px;color:var(--muted,#8a8a8a)')}>Devis gratuit sous 48h</div>
              </div>
            </Reveal>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:0 clamp(20px,5vw,64px) clamp(40px,6vw,72px)')}>
        <div
          style={css(
            'max-width:1000px;margin:0 auto;padding:22px 26px;border-radius:18px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--glass,rgba(255,255,255,.03));display:flex;flex-wrap:wrap;align-items:center;gap:14px;justify-content:space-between'
          )}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Vos séances, où vous voulez</div>
            <div style={css('font-size:14px;color:var(--muted,#8a8a8a)')}>À domicile · En salle partenaire · En extérieur</div>
          </div>
          <Link href="/devenir-salle-partenaire" style={css('font-size:13.5px;font-weight:700;color:var(--lime,#C6F202)')}>
            Accédez à un réseau de salles partenaires sélectionnées par GBÔ →
          </Link>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(56px,9vw,110px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b);border-top:1px solid var(--border,rgba(255,255,255,.08))')}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:10px')}>Actif de marque</div>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,4.5vw,44px);letter-spacing:-1px;margin-bottom:8px")}>La Méthode GBÔ</h2>
          <p style={css('color:var(--muted,#8a8a8a);font-size:16px;max-width:60ch;margin-bottom:40px;line-height:1.5')}>
            Cinq étapes pour transformer une intention en mode de vie durable.
          </p>
          <div style={css('position:relative;display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px')}>
            {METHOD_STEPS.map((m, i) => (
              <Reveal key={m.n} delay={i * 70} style={{ position: 'relative', paddingTop: 20 }}>
                <div style={css('position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--lime,#C6F202),transparent)')} />
                <div
                  style={css(
                    "width:46px;height:46px;border-radius:50%;background:var(--lime,#C6F202);color:#000;display:flex;align-items:center;justify-content:center;font-family:'Broaven';font-weight:700;font-size:20px;margin-bottom:16px"
                  )}
                >
                  {m.n}
                </div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{m.title}</div>
                <div style={css('font-size:14px;color:var(--muted,#8a8a8a);line-height:1.55')}>{m.desc}</div>
              </Reveal>
            ))}
          </div>
          <div style={css('margin-top:40px;padding:18px 22px;border-radius:14px;border:1px solid rgba(251,191,36,.3);background:rgba(251,191,36,.06);display:flex;gap:14px;align-items:flex-start')}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" style={{ flex: '0 0 auto', marginTop: 1 }}>
              <path d="M12 9v4M12 17h.01M10.3 3.9L2 18a2 2 0 001.7 3h16.6a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" />
            </svg>
            <p style={css('font-size:13.5px;color:var(--muted,#8a8a8a);line-height:1.55')}>
              Le coach GBÔ n&apos;est ni médecin ni nutritionniste. L&apos;accompagnement complète et ne remplace pas le suivi médical ; une validation médicale
              préalable est recommandée, en particulier pour les programmes prénatal, postnatal et senior.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
