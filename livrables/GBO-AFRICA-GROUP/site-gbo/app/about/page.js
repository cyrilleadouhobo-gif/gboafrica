import { css } from '../../lib/css.js';
import ImageSlot from '../../components/ImageSlot.js';
import Reveal from '../../components/Reveal.js';
import GlowBlobs from '../../components/GlowBlobs.js';
import { stockPhoto } from '../../lib/stockPhoto.js';

export const metadata = { title: 'À propos — GBÔ AFRICA GROUP' };

// Valeurs propres à la page À propos (distinctes de VALUES dans data/content.js, toujours
// utilisé pour la section « Ce qui nous tient debout » de la page d'accueil).
const ABOUT_VALUES = [
  { n: '01', title: 'Accessibilité', desc: 'Rendre le sport et le bien-être accessibles au plus grand nombre, avec des solutions adaptées aux réalités locales et aux besoins de chacun.' },
  { n: '02', title: 'Excellence', desc: 'Rechercher la qualité dans chaque expérience et chaque service, avec des standards élevés et une volonté d’amélioration continue.' },
  { n: '03', title: 'Communauté', desc: 'Créer des connexions, fédérer les acteurs et faire grandir le mouvement autour du sport et du bien-être.' },
  { n: '04', title: 'Focus client', desc: 'Comprendre les besoins et apporter des solutions réellement utiles, personnalisées et adaptées aux attentes.' },
];

const MISSION_VISION = [
  {
    title: 'Notre mission',
    desc: 'Promouvoir et développer le sport en Afrique, tout en offrant à chacun l’opportunité de vivre pleinement l’expérience du sport et du bien-être grâce à des solutions accessibles, innovantes et adaptées aux besoins de chacun.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
      </>
    ),
  },
  {
    title: 'Notre vision',
    desc: 'Devenir un acteur de référence en Afrique dans le domaine du sport et du bien-être, en construisant un écosystème inclusif qui inspire, transforme et améliore la qualité de vie des communautés.',
    icon: (
      <>
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
];

export default function AboutPage() {
  return (
    <div>
      <section style={css('position:relative;padding:clamp(80px,10vw,130px) clamp(20px,5vw,64px) clamp(40px,5vw,60px)')}>
        <GlowBlobs />
        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative' }}>
          <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,6.5vw,62px);letter-spacing:-2px;line-height:1;max-width:18ch")}>
            QUI SOMMES-NOUS ?
          </h1>
          <p style={css('font-size:clamp(17px,2.4vw,22px);color:var(--muted,#8a8a8a);max-width:62ch;margin-top:22px;line-height:1.5')}>
            GBÔ AFRICA GROUP est une entreprise ivoirienne spécialisée dans la promotion du sport et du bien-être. À travers un écosystème intégré, nous
            développons des solutions destinées aux particuliers, aux entreprises, aux salles de sport, aux professionnels et aux organisations, en plaçant
            l&apos;humain, la qualité de service et la performance au cœur de notre action.
          </p>
        </div>
      </section>

      <Reveal as="section" style={css('padding:0 clamp(20px,5vw,64px) clamp(48px,7vw,90px)')}>
        <div style={{ maxWidth: 1100, margin: '0 auto', aspectRatio: '21/9', borderRadius: 24, overflow: 'hidden', border: '1px solid var(--border,rgba(255,255,255,.1))', position: 'relative' }}>
          <ImageSlot placeholder="Visuel équipe / communauté GBÔ" src={stockPhoto('team', 'about-hero', '1600x700')} />
        </div>
      </Reveal>

      <Reveal
        as="section"
        style={css(
          'position:relative;padding:clamp(48px,7vw,90px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b);border-top:1px solid var(--border,rgba(255,255,255,.08));overflow:hidden'
        )}
      >
        <GlowBlobs compact />
        <div
          style={css(
            'position:relative;max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr));gap:clamp(20px,3vw,28px)'
          )}
        >
          {MISSION_VISION.map((m, i) => (
            <Reveal
              key={m.title}
              delay={i * 120}
              className="hover-card hover-card-lime"
              style={css(
                'padding:clamp(28px,4vw,40px);border-radius:24px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--glass,rgba(255,255,255,.03))'
              )}
            >
              <div
                style={css(
                  "width:52px;height:52px;border-radius:14px;background:rgba(198,242,2,.12);color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center;margin-bottom:20px"
                )}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {m.icon}
                </svg>
              </div>
              <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(22px,3vw,28px);letter-spacing:-0.5px;margin-bottom:14px")}>{m.title}</h2>
              <p style={{ fontSize: 16.5, lineHeight: 1.6, color: 'var(--muted,#c8c8c8)' }}>{m.desc}</p>
            </Reveal>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(48px,7vw,90px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,3.5vw,34px);letter-spacing:-1px;margin-bottom:28px")}>Nos valeurs</h2>

          {/* Desktop/tablette : grille classique. Masquée sous 680px (voir globals.css). */}
          <div data-values-grid="" style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr));gap:14px')}>
            {ABOUT_VALUES.map((v, i) => (
              <Reveal
                key={v.n}
                delay={i * 70}
                className="hover-card hover-card-lime"
                style={css('padding:24px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.09));background:var(--glass,rgba(255,255,255,.02))')}
              >
                <div style={css("color:var(--lime,#C6F202);font-family:'Broaven';font-weight:700;font-size:20px;margin-bottom:10px")}>{v.n}</div>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{v.title}</div>
                <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a);line-height:1.55')}>{v.desc}</div>
              </Reveal>
            ))}
          </div>

          {/* Mobile (<680px) : les 4 cartes restent sur une seule ligne et défilent en
              boucle de la droite vers la gauche (liste dupliquée + animation marquee de
              globals.css), plutôt que d'empiler verticalement. */}
          <div data-values-marquee="" style={{ overflow: 'hidden' }}>
            <div className="values-marquee-track" style={css('display:flex;gap:14px;width:max-content')}>
              {[...ABOUT_VALUES, ...ABOUT_VALUES].map((v, i) => (
                <div
                  key={`${v.n}-${i}`}
                  className="hover-card hover-card-lime"
                  style={css(
                    'flex:0 0 220px;padding:22px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.09));background:var(--glass,rgba(255,255,255,.02))'
                  )}
                >
                  <div style={css("color:var(--lime,#C6F202);font-family:'Broaven';font-weight:700;font-size:20px;margin-bottom:10px")}>{v.n}</div>
                  <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{v.title}</div>
                  <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a);line-height:1.55')}>{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:0 clamp(20px,5vw,64px) clamp(64px,9vw,110px)')}>
        <div
          style={css(
            'max-width:1100px;margin:0 auto;padding:clamp(30px,5vw,56px);border-radius:24px;background:var(--lime,#C6F202);color:#000;display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:24px;text-align:center'
          )}
        >
          <div>
            <div style={css("font-family:'Broaven';font-weight:700;font-size:clamp(30px,5vw,48px)")}>6</div>
            <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.75 }}>pôles dans l&apos;écosystème</div>
          </div>
          <div>
            <div style={css("font-family:'Broaven';font-weight:700;font-size:clamp(30px,5vw,48px)")}>5</div>
            <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.75 }}>étapes de la Méthode GBÔ</div>
          </div>
          <div>
            <div style={css("font-family:'Broaven';font-weight:700;font-size:clamp(30px,5vw,48px)")}>Abidjan</div>
            <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.75 }}>Côte d&apos;Ivoire · UEMOA demain</div>
          </div>
          <div>
            <div style={css("font-family:'Broaven';font-weight:700;font-size:clamp(30px,5vw,48px)")}>2 000</div>
            <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.75 }}>FCFA/mois · Club Premium</div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
