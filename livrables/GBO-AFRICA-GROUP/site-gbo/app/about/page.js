import Link from 'next/link';
import { css } from '../../lib/css.js';
import ImageSlot from '../../components/ImageSlot.js';
import Reveal from '../../components/Reveal.js';
import GlowBlobs from '../../components/GlowBlobs.js';
import { stockPhoto } from '../../lib/stockPhoto.js';

export const metadata = { title: 'À propos — GBÔ AFRICA GROUP' };

const ABOUT_VALUES = [
  {
    title: 'Accessibilité',
    desc: 'Rendre les solutions plus accessibles et adaptées aux réalités des publics.',
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
      </>
    ),
  },
  {
    title: 'Excellence',
    desc: 'Rechercher un niveau de qualité dans nos services et notre manière de travailler.',
    icon: <path d="M4 19V9M11 19V4M18 19v-7" />,
  },
  {
    title: 'Communauté',
    desc: 'Créer des liens autour du sport et favoriser une dynamique collective.',
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
    title: 'Écoute',
    desc: 'Comprendre les besoins avant de construire les solutions.',
    icon: (
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    ),
  },
];

export default function AboutPage() {
  return (
    <div>
      <section
        style={css(
          'position:relative;overflow:hidden;padding:clamp(48px,12vw,140px) clamp(20px,5vw,64px) clamp(32px,8vw,90px);border-bottom:1px solid var(--border,rgba(255,255,255,.08))'
        )}
      >
        <div style={{ position: 'absolute', inset: 0 }}>
          <ImageSlot placeholder="Visuel équipe GBÔ" src={stockPhoto('fitnessWomen', 'about-hero', '1600x900')} />
        </div>
        <div
          style={css(
            'position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.85) 0%,rgba(0,0,0,.6) 45%,rgba(0,0,0,.3) 75%),linear-gradient(180deg,rgba(0,0,0,.5) 0%,rgba(0,0,0,.35) 45%,rgba(0,0,0,.85) 100%);pointer-events:none'
          )}
        />
        <GlowBlobs />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
          <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,6vw,54px);letter-spacing:-1.5px;line-height:1.02;max-width:14ch")}>
            NOUS FAISONS
            <br />
            <span style={{ color: 'var(--lime,#C6F202)' }}>AVANCER LE SPORT.</span>
          </h1>
          <p style={css('font-size:clamp(16px,2.2vw,20px);color:var(--muted,#c8c8c8);max-width:56ch;margin-top:20px;line-height:1.5')}>
            GBÔ AFRICA GROUP est une entreprise spécialisée dans le développement de solutions dans le sport et le bien-être en Afrique.
          </p>
          <Link
            href="/"
            className="btn-cta"
            style={css('margin-top:28px;display:inline-block;padding:16px 30px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:16px')}
          >
            Découvrir nos activités →
          </Link>
        </div>
      </section>

      <Reveal as="section" style={css('padding:clamp(56px,9vw,100px) clamp(20px,5vw,64px)')}>
        <div style={css('max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(360px,100%),1fr));gap:clamp(32px,5vw,56px);align-items:center')}>
          <div>
            <div style={css('display:flex;align-items:center;gap:10px;margin-bottom:16px')}>
              <span style={css("font-family:'Broaven';font-weight:700;font-size:15px;color:var(--lime,#C6F202)")}>01</span>
              <span style={{ width: 22, height: 2, background: '#C6F202', display: 'inline-block' }} />
            </div>
            <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,4vw,36px);letter-spacing:-1px;margin-bottom:18px")}>Qui sommes-nous ?</h2>
            <p style={css('font-size:16px;color:var(--muted,#c8c8c8);line-height:1.65')}>
              GBÔ AFRICA GROUP est un acteur intégré du sport et du bien-être. Nous développons des solutions pour accompagner les pratiquants, les
              entreprises, les salles de sport et les autres acteurs du secteur.
              <br />
              <br />
              Notre <strong style={{ color: '#fff' }}>objectif</strong> est de rendre la pratique sportive plus accessible et de contribuer à la
              structuration de l&apos;écosystème sportif en Afrique.
            </p>
          </div>
          <div style={{ position: 'relative', aspectRatio: '4/3', borderRadius: 24, overflow: 'hidden', border: '1px solid var(--border,rgba(255,255,255,.1))' }}>
            <ImageSlot placeholder="Équipe GBÔ" src={stockPhoto('team', 'about-qui-sommes-nous', '1000x750')} />
            <div style={css('position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.75) 0%,rgba(0,0,0,.2) 55%,transparent 100%);pointer-events:none')} />
            <div
              style={css(
                "position:absolute;top:18px;right:18px;left:18px;text-align:right;font-family:'Broaven';font-weight:700;font-size:clamp(11px,1.3vw,14px);color:rgba(255,255,255,.9);line-height:1.35"
              )}
            >
              DES INDIVIDUS PLUS FORTS, DES COMMUNAUTÉS PLUS SOLIDES, UNE AFRIQUE PLUS ACTIVE.
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(56px,9vw,100px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b);border-top:1px solid var(--border,rgba(255,255,255,.08));border-bottom:1px solid var(--border,rgba(255,255,255,.08))')}>
        <div style={css('max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(360px,100%),1fr));gap:clamp(32px,5vw,56px);align-items:center')}>
          <div>
            <div style={css('display:flex;align-items:center;gap:10px;margin-bottom:16px')}>
              <span style={css("font-family:'Broaven';font-weight:700;font-size:15px;color:var(--lime,#C6F202)")}>02</span>
              <span style={{ width: 22, height: 2, background: '#C6F202', display: 'inline-block' }} />
            </div>
            <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,4vw,36px);letter-spacing:-1px;margin-bottom:18px")}>Notre mission</h2>
            <p style={css('font-size:16px;color:var(--muted,#c8c8c8);line-height:1.65')}>
              Développer des solutions accessibles et adaptées qui contribuent à la pratique, à la professionnalisation et au développement du sport en
              Afrique.
            </p>
          </div>
          <div style={{ position: 'relative', paddingLeft: 24, borderLeft: '2px solid var(--lime,#C6F202)' }}>
            <span style={css("font-family:'Broaven';font-weight:700;font-size:clamp(40px,6vw,64px);color:var(--lime,#C6F202);line-height:1;display:block;margin-bottom:8px")}>
              &ldquo;
            </span>
            <p style={css("font-family:'Broaven';font-weight:700;font-size:clamp(22px,3.2vw,32px);letter-spacing:-0.5px;line-height:1.2")}>
              LE SPORT AU SERVICE D&apos;UN MEILLEUR DEMAIN.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(56px,9vw,100px) clamp(20px,5vw,64px)')}>
        <div style={css('max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(360px,100%),1fr));gap:clamp(32px,5vw,56px);align-items:center')}>
          <div>
            <div style={css('display:flex;align-items:center;gap:10px;margin-bottom:16px')}>
              <span style={css("font-family:'Broaven';font-weight:700;font-size:15px;color:var(--lime,#C6F202)")}>03</span>
              <span style={{ width: 22, height: 2, background: '#C6F202', display: 'inline-block' }} />
            </div>
            <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,4vw,36px);letter-spacing:-1px;margin-bottom:18px")}>Notre vision</h2>
            <p style={css('font-size:16px;color:var(--muted,#c8c8c8);line-height:1.65')}>Devenir un acteur de référence du sport et du bien-être en Afrique.</p>
          </div>
          <div style={{ position: 'relative', aspectRatio: '4/3', borderRadius: 24, overflow: 'hidden', border: '1px solid var(--border,rgba(255,255,255,.1))' }}>
            <ImageSlot placeholder="Vision GBÔ" src={stockPhoto('fitnessMen', 'about-vision', '1000x750')} />
            <div style={css('position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.75) 0%,rgba(0,0,0,.2) 55%,transparent 100%);pointer-events:none')} />
            <div
              style={css(
                "position:absolute;top:18px;right:18px;text-align:right;font-family:'Broaven';font-weight:700;font-size:clamp(11px,1.3vw,14px);color:rgba(255,255,255,.9);line-height:1.35"
              )}
            >
              PLUS LOIN
              <br />
              POUR L&apos;AFRIQUE.
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(56px,9vw,100px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b);border-top:1px solid var(--border,rgba(255,255,255,.08));border-bottom:1px solid var(--border,rgba(255,255,255,.08))')}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={css('display:flex;align-items:center;gap:10px;margin-bottom:32px')}>
            <span style={css("font-family:'Broaven';font-weight:700;font-size:15px;color:var(--lime,#C6F202)")}>04</span>
            <span style={{ width: 22, height: 2, background: '#C6F202', display: 'inline-block' }} />
            <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,4vw,36px);letter-spacing:-1px")}>Nos valeurs</h2>
          </div>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr));gap:14px')}>
            {ABOUT_VALUES.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 60}
                className="hover-card hover-card-lime"
                style={css('padding:24px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.09));background:var(--glass,rgba(255,255,255,.02))')}
              >
                <div
                  style={css(
                    'width:40px;height:40px;border-radius:11px;background:rgba(198,242,2,.1);color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center;margin-bottom:16px'
                  )}
                >
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {v.icon}
                  </svg>
                </div>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{v.title}</div>
                <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a);line-height:1.55')}>{v.desc}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(56px,9vw,100px) clamp(20px,5vw,64px)')}>
        <div style={css('max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(360px,100%),1fr));gap:clamp(32px,5vw,56px);align-items:center')}>
          <div>
            <div style={css('display:flex;align-items:center;gap:10px;margin-bottom:16px')}>
              <span style={css("font-family:'Broaven';font-weight:700;font-size:15px;color:var(--lime,#C6F202)")}>05</span>
              <span style={{ width: 22, height: 2, background: '#C6F202', display: 'inline-block' }} />
            </div>
            <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,4vw,36px);letter-spacing:-1px;margin-bottom:18px")}>Notre engagement</h2>
            <p style={css('font-size:16px;color:var(--muted,#c8c8c8);line-height:1.65;margin-bottom:22px')}>
              Nous croyons en un sport plus accessible, plus structuré et plus présent dans la vie des individus et des communautés. C&apos;est cet
              engagement qui guide chacune de nos actions.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 26, height: 2, background: '#C6F202', display: 'inline-block' }} />
              <span style={css("font-family:'Broaven';font-weight:700;font-size:14px;letter-spacing:.5px;text-transform:uppercase")}>Nous faisons avancer le sport.</span>
            </div>
          </div>
          <div style={{ position: 'relative', aspectRatio: '4/3', borderRadius: 24, overflow: 'hidden', border: '1px solid var(--border,rgba(255,255,255,.1))' }}>
            <ImageSlot placeholder="Engagement GBÔ" src={stockPhoto('fitnessMen', 'about-engagement', '1000x750')} />
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('position:relative;overflow:hidden;padding:clamp(64px,10vw,120px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b);border-top:1px solid var(--border,rgba(255,255,255,.08))')}>
        <div
          aria-hidden="true"
          style={css(
            "position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:'Broaven';font-weight:700;font-size:clamp(120px,22vw,320px);color:rgba(255,255,255,.03);white-space:nowrap;pointer-events:none;user-select:none"
          )}
        >
          GBÔ
        </div>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px')}>
            Envie d&apos;en savoir plus ?
          </div>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(30px,5vw,48px);letter-spacing:-1.5px;margin-bottom:28px")}>Parlons-en.</h2>
          <Link
            href="/contact"
            className="btn-cta"
            style={css('display:inline-block;padding:16px 32px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:15px')}
          >
            Nous contacter →
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
