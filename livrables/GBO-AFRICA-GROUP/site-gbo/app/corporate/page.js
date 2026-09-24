'use client';

import { useState } from 'react';
import Link from 'next/link';
import { css } from '../../lib/css.js';
import ImageSlot from '../../components/ImageSlot.js';
import Reveal from '../../components/Reveal.js';
import Honeypot from '../../components/Honeypot.js';
import { chip } from '../../lib/styleHelpers.js';

const fieldStyle = css(
  "width:100%;padding:15px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.14));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:15px"
);
const labelStyle = css('font-size:13px;font-weight:600;color:var(--muted,#8a8a8a);display:block;margin-bottom:6px');
const eyebrow = css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px');

const ICONS = {
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="8" r="2.5" />
      <path d="M2 21c0-3.5 3-6 7-6s7 2.5 7 6" />
      <path d="M16.5 15.2c2.6.5 4.5 2.7 4.5 5.8" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M9 21v-4h6v4M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-7.5 7-12a7 7 0 10-14 0c0 4.5 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  briefcase: (
    <>
      <rect x="2" y="7" width="20" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9l-2 6-6 2 2-6 6-2z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  bolt: <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />,
  headset: (
    <>
      <path d="M4 13a8 8 0 0116 0" />
      <rect x="2" y="13" width="4" height="7" rx="1.5" />
      <rect x="18" y="13" width="4" height="7" rx="1.5" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 6h16M4 12h16M4 18h16" />
      <circle cx="9" cy="6" r="2" />
      <circle cx="16" cy="12" r="2" />
      <circle cx="7" cy="18" r="2" />
    </>
  ),
  chart: <path d="M4 19V9M11 19V4M18 19v-7" />,
  check: <path d="M5 12l5 5L20 6" />,
};

function Icon({ name, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}

const PROMISE_STEPS = [
  { n: '01', t: 'Identifier', d: 'Comprendre vos effectifs, vos besoins, vos objectifs, vos disponibilités et vos contraintes.' },
  { n: '02', t: 'Organiser', d: 'Définir le format, la fréquence, les horaires, le lieu et les modalités des séances.' },
  { n: '03', t: 'Encadrer', d: 'Un coach prépare et anime les séances collectives en tenant compte du niveau des participants.' },
  { n: '04', t: 'Suivre', d: 'Nous suivons la réalisation des séances, recueillons les retours et établissons un bilan de la période.' },
];

const ADAPTED_FEATURES = [
  { t: 'Séances collectives', d: 'Pour différents niveaux et profils de collaborateurs.', icon: 'people' },
  { t: 'Sur site', d: 'Les séances peuvent être organisées directement dans l’environnement de l’entreprise lorsque les conditions le permettent.', icon: 'building' },
  { t: 'Dans un lieu convenu', d: 'Lorsque l’entreprise ne dispose pas d’un espace adapté, un autre lieu peut être défini avec GBÔ.', icon: 'pin' },
  { t: 'Rythme adapté', d: 'Une organisation selon les disponibilités et le rythme convenu avec l’entreprise.', icon: 'clock' },
];

const AUDIENCES = [
  { t: 'DRH', d: 'Mettre en place une initiative sportive simple à intégrer dans la vie de l’entreprise.', icon: 'briefcase' },
  { t: 'Direction', d: 'Structurer une démarche de bien-être et de cohésion autour d’une activité concrète.', icon: 'compass' },
  { t: 'QHSE / Responsables concernés', d: 'Organiser des activités physiques adaptées au cadre de l’entreprise.', icon: 'shield' },
  { t: 'Collaborateurs', d: 'Pratiquer une activité physique collective dans un cadre encadré.', icon: 'people' },
];

const INCLUDED_ITEMS = [
  'Analyse du besoin',
  'Définition du format',
  'Planification des séances',
  'Affectation d’un coach',
  'Animation des séances',
  'Encadrement des participants',
  'Suivi de l’activité',
  'Bilan de fin de période',
];

const HOW_STEPS = [
  { n: '01', t: 'Vous nous présentez votre besoin' },
  { n: '02', t: 'Nous définissons le dispositif' },
  { n: '03', t: 'Nous vous transmettons une proposition' },
  { n: '04', t: 'Nous préparons les séances' },
  { n: '05', t: 'Le coach intervient' },
  { n: '06', t: 'Nous suivons et faisons le bilan' },
];

const WHY_GBO = [
  { t: 'Simplicité', d: 'Vous n’avez pas à construire vous-même le programme.', icon: 'bolt' },
  { t: 'Encadrement', d: 'Les séances sont préparées et animées par un coach.', icon: 'headset' },
  { t: 'Adaptation', d: 'Le dispositif est construit en fonction de votre entreprise et de vos collaborateurs.', icon: 'sliders' },
  { t: 'Suivi', d: 'L’activité est suivie pendant toute la période d’accompagnement.', icon: 'chart' },
];

const TIERS = [
  { effectif: '1–10 collaborateurs', format: 'Séance collective' },
  { effectif: '11–20 collaborateurs', format: 'Séance collective' },
  { effectif: '21–30 collaborateurs', format: 'Séance collective' },
  { effectif: '31+ collaborateurs', format: 'Dispositif sur proposition' },
];

const LIEU_OPTIONS = ['Dans nos locaux', 'Dans un autre lieu', 'À définir'];
const FREQUENCE_OPTIONS = ['1 fois/semaine', '2 fois/semaine', 'À définir'];
const PERIODE_OPTIONS = ['Ponctuelle', '1 mois', 'Plusieurs mois', 'À définir'];

export default function CorporatePage() {
  const [lieu, setLieu] = useState('');
  const [frequence, setFrequence] = useState('');
  const [periode, setPeriode] = useState('');
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const submitCompany = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!lieu) {
      setErrorMsg('Merci de préciser le lieu souhaité.');
      return;
    }
    setSubmitting(true);
    const f = new FormData(e.target);

    try {
      const res = await fetch('/api/leads/company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entreprise: f.get('entreprise'),
          contact: f.get('contact'),
          tel: f.get('tel'),
          email: f.get('email'),
          effectifConcerne: f.get('effectifConcerne'),
          lieu,
          frequence,
          periode,
          message: f.get('message'),
          consent: f.get('consent') === 'on',
          website: f.get('website'),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Une erreur est survenue, réessayez.');
        return;
      }
      setDone(true);
    } catch {
      setErrorMsg('Connexion impossible. Vérifiez votre réseau et réessayez.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden', ...css('padding:clamp(90px,13vw,150px) clamp(20px,5vw,64px) clamp(56px,8vw,90px)') }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <ImageSlot placeholder="Coach GBÔ en séance" src="/images/hero-fitness/corporate-hero.jpg" />
        </div>
        <div
          style={css('position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,5,5,.58) 0%,rgba(5,5,5,.82) 55%,rgba(5,5,5,.94) 100%)')}
        />
        <div style={{ maxWidth: 900, marginLeft: 'clamp(0px,5vw,56px)', position: 'relative' }}>
          <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(26px,5.5vw,50px);letter-spacing:-1.5px;line-height:1.02;max-width:20ch")}>
            FAITES BOUGER VOS ÉQUIPES
          </h1>
          <p style={css('font-size:clamp(16px,2.2vw,20px);color:rgba(255,255,255,.85);max-width:60ch;margin-top:20px;line-height:1.5')}>
            Une solution sportive collective, simple à mettre en place et adaptée à votre environnement de travail
          </p>
          <div style={css('display:flex;flex-wrap:wrap;gap:14px;margin-top:32px')}>
            <a
              href="#proposition"
              className="btn-cta"
              style={css('padding:16px 28px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:15.5px')}
            >
              Demander une proposition
            </a>
            <Link
              href="/contact"
              className="btn-cta"
              style={css('padding:16px 28px;border-radius:12px;border:1px solid rgba(255,255,255,.3);color:#fff;font-weight:700;font-size:15.5px')}
            >
              Parler à GBÔ
            </Link>
          </div>
        </div>
      </section>

      {/* Constat */}
      <Reveal as="section" style={css('padding:clamp(56px,8vw,96px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,3.8vw,36px);letter-spacing:-1px;line-height:1.15;margin-bottom:22px")}>
            Vos équipes passent beaucoup de temps au travail.
          </h2>
          <p style={css('font-size:16px;color:var(--muted,#8a8a8a);line-height:1.65;margin-bottom:16px')}>
            Entre réunions, déplacements et journées de travail, intégrer régulièrement une activité physique peut être difficile pour les
            collaborateurs.
          </p>
          <p style={css('font-size:16px;color:var(--muted,#8a8a8a);line-height:1.65')}>
            Nous permettons aux entreprises d’intégrer simplement des séances sportives dans leur environnement de travail, sans avoir à gérer
            elles-mêmes leur organisation et leur encadrement.
          </p>
        </div>
      </Reveal>

      {/* Promesse */}
      <Reveal as="section" style={css('padding:clamp(40px,6vw,64px) clamp(20px,5vw,64px) clamp(56px,8vw,96px);background:var(--surface,#0b0b0b)')}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={eyebrow}>Notre promesse</div>
          <h2
            style={css(
              "font-family:'Broaven';font-weight:700;font-size:clamp(24px,3.8vw,36px);letter-spacing:-1px;line-height:1.15;max-width:22ch;margin-bottom:36px"
            )}
          >
            Une solution sportive, de l’organisation à la séance.
          </h2>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr));gap:16px')}>
            {PROMISE_STEPS.map((s, i) => (
              <Reveal
                key={s.n}
                delay={i * 70}
                style={css('padding:26px;border-radius:20px;border:1px solid var(--border,rgba(255,255,255,.09));background:var(--glass,rgba(255,255,255,.02))')}
              >
                <div style={css("font-family:'Broaven';font-weight:700;font-size:26px;color:rgba(198,242,2,.5);margin-bottom:14px")}>{s.n}</div>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{s.t}</div>
                <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a);line-height:1.55')}>{s.d}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Séances adaptées */}
      <Reveal as="section" style={css('padding:clamp(56px,8vw,96px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={eyebrow}>Le format</div>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,3.8vw,36px);letter-spacing:-1px;margin-bottom:36px")}>
            Des séances adaptées à votre entreprise.
          </h2>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr));gap:16px')}>
            {ADAPTED_FEATURES.map((f) => (
              <div
                key={f.t}
                className="hover-card"
                style={css('padding:26px;border-radius:20px;border:1px solid var(--border,rgba(255,255,255,.09))')}
              >
                <span
                  style={css(
                    'width:42px;height:42px;border-radius:12px;background:rgba(198,242,2,.1);color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center;margin-bottom:16px'
                  )}
                >
                  <Icon name={f.icon} />
                </span>
                <div style={{ fontWeight: 700, fontSize: 16.5, marginBottom: 8 }}>{f.t}</div>
                <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a);line-height:1.55')}>{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Pour qui */}
      <Reveal as="section" style={css('padding:clamp(56px,8vw,96px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b)')}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={eyebrow}>Pour qui ?</div>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,3.8vw,36px);letter-spacing:-1px;margin-bottom:36px")}>
            Une solution pensée pour vos collaborateurs.
          </h2>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr));gap:16px')}>
            {AUDIENCES.map((a) => (
              <div
                key={a.t}
                style={css('padding:26px;border-radius:20px;border:1px solid var(--border,rgba(255,255,255,.09));background:var(--glass,rgba(255,255,255,.02))')}
              >
                <span
                  style={css(
                    'width:42px;height:42px;border-radius:50%;background:rgba(198,242,2,.1);color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center;margin-bottom:16px'
                  )}
                >
                  <Icon name={a.icon} />
                </span>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{a.t}</div>
                <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a);line-height:1.55')}>{a.d}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Ce que comprend l'accompagnement */}
      <Reveal as="section" style={css('padding:clamp(56px,8vw,96px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={eyebrow}>L’accompagnement</div>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,3.8vw,36px);letter-spacing:-1px;margin-bottom:36px;max-width:22ch")}>
            Nous prenons en charge l’organisation sportive.
          </h2>
          <div
            style={css(
              'padding:clamp(24px,4vw,36px);border-radius:22px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--glass,rgba(255,255,255,.02));display:grid;grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr));gap:14px 28px'
            )}
          >
            {INCLUDED_ITEMS.map((item) => (
              <div key={item} style={css('display:flex;align-items:center;gap:12px;font-size:15px;font-weight:600')}>
                <span
                  style={css(
                    'width:24px;height:24px;flex:0 0 auto;border-radius:50%;background:rgba(198,242,2,.12);color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center'
                  )}
                >
                  <Icon name="check" size={13} />
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Comment ça fonctionne */}
      <Reveal as="section" style={css('padding:clamp(56px,8vw,96px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b)')}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ ...eyebrow, textAlign: 'center' }}>Le déroulé</div>
          <h2
            style={css(
              "font-family:'Broaven';font-weight:700;font-size:clamp(24px,3.8vw,36px);letter-spacing:-1px;margin-bottom:48px;text-align:center"
            )}
          >
            Comment ça fonctionne ?
          </h2>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 23, top: 24, bottom: 24, width: 1, background: 'var(--border,rgba(255,255,255,.14))' }} />
            {HOW_STEPS.map((s, i) => (
              <Reveal
                key={s.n}
                delay={i * 70}
                style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 18, marginBottom: i === HOW_STEPS.length - 1 ? 0 : 30 }}
              >
                <span
                  style={css(
                    "font-family:'Broaven';flex:0 0 auto;width:46px;height:46px;border-radius:50%;background:var(--bg,#000);border:1px solid var(--lime,#C6F202);color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;position:relative;z-index:1"
                  )}
                >
                  {s.n}
                </span>
                <div style={{ fontWeight: 600, fontSize: 15.5 }}>{s.t}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Pourquoi GBÔ */}
      <Reveal as="section" style={css('padding:clamp(56px,8vw,96px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={eyebrow}>Pourquoi GBÔ ?</div>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,3.8vw,36px);letter-spacing:-1px;margin-bottom:36px;max-width:24ch")}>
            Vous avez le besoin, nous avons la réponse  
          </h2>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr));gap:16px;margin-bottom:32px')}>
            {WHY_GBO.map((w) => (
              <div key={w.t} style={css('display:flex;flex-direction:column;gap:14px')}>
                <span
                  style={css(
                    'width:42px;height:42px;border-radius:12px;background:rgba(198,242,2,.1);color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center'
                  )}
                >
                  <Icon name={w.icon} />
                </span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{w.t}</div>
                  <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a);line-height:1.55')}>{w.d}</div>
                </div>
              </div>
            ))}
          </div>
          <div
            style={css(
              'padding:clamp(22px,3vw,30px);border-radius:18px;border-left:3px solid var(--lime,#C6F202); background:var(--glass,rgba(255,255,255,.02));border-right:3px solid var(--lime,#C6F202)',
            )}
          >
            <p style={css('font-size:14.5px;color:rgba(255,255,255,.8);line-height:1.65;font-style:italic;margin-bottom:10px')}>
              « Un programme de santé physique au travail doit tenir compte des besoins de l’organisation et des employés, être porté par des
              professionnels qualifiés et disposer d’un fonctionnement organisé. »
            </p>
            <div style={css('font-size:12.5px;color:var(--muted,#8a8a8a);font-weight:600')}>Source: Organisation mondiale de la Santé (OMS)</div>
          </div>
        </div>
      </Reveal>

      {/* Formules */}
      <Reveal as="section" style={css('padding:clamp(56px,8vw,96px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b)')}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <div style={eyebrow}>Les formules</div>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,3.8vw,36px);letter-spacing:-1px;margin-bottom:36px;max-width:22ch")}>
            Nos formats disponibles selon vos effectifs.
          </h2>
          <div style={css('border-radius:20px;border:1px solid var(--border,rgba(255,255,255,.1));overflow:hidden')}>
            <div
              style={css(
                'display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:16px 24px;background:var(--glass,rgba(255,255,255,.03));font-size:12px;letter-spacing:1px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:700'
              )}
            >
              <div>Effectif</div>
              <div>Format</div>
            </div>
            {TIERS.map((t, i) => {
              const last = i === TIERS.length - 1;
              return (
                <div
                  key={t.effectif}
                  style={css(
                    `display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:18px 24px;align-items:center;${
                      i > 0 ? 'border-top:1px solid var(--border,rgba(255,255,255,.08));' : ''
                    }${last ? 'background:rgba(198,242,2,.05);' : ''}`
                  )}
                >
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{t.effectif}</div>
                  <div style={css(`font-size:14px;font-weight:600;color:${last ? 'var(--lime,#C6F202)' : 'var(--muted,#8a8a8a)'}`)}>{t.format}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Formulaire */}
      <Reveal as="section" id="proposition" style={css('padding:clamp(20px,3vw,40px) clamp(20px,5vw,64px) clamp(64px,9vw,110px)')}>
        <div
          style={css(
            'max-width:760px;margin:0 auto;padding:clamp(28px,4vw,44px);border-radius:24px;border:1px solid var(--border,rgba(255,255,255,.12));background:var(--surface,#0c0c0c)'
          )}
        >
          {done ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div
                style={css(
                  'width:70px;height:70px;border-radius:50%;background:var(--lime,#C6F202);color:#000;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;animation:pop .5s both'
                )}
              >
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 12l5 5L20 6" />
                </svg>
              </div>
              <h3 style={css("font-family:'Broaven';font-weight:700;font-size:26px;margin-bottom:10px")}>Demande envoyée !</h3>
              <p style={css('color:var(--muted,#8a8a8a);font-size:15.5px;line-height:1.6;max-width:44ch;margin:0 auto')}>
                Un conseiller Entreprise GBÔ vous recontacte pour établir une proposition sur mesure. Confirmation par e-mail et WhatsApp.
              </p>
              <Link href="/" style={css('margin-top:24px;padding:14px 26px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.2));color:var(--fg,#fff);font-weight:700;display:inline-block')}>
                Retour à l&apos;accueil
              </Link>
            </div>
          ) : (
            <form onSubmit={submitCompany}>
              <h2 style={css("font-family:'Broaven';font-weight:700;font-size:26px;margin-bottom:6px")}>Parlons de votre projet sportif</h2>
              <p style={css('color:var(--muted,#8a8a8a);font-size:14.5px;margin-bottom:24px;line-height:1.5')}>
                Quelques informations pour comprendre votre organisation et vous proposer un dispositif adapté.
              </p>
              <div style={css('display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px')}>
                <label style={{ display: 'block' }}>
                  <span style={labelStyle}>Entreprise *</span>
                  <input required name="entreprise" style={fieldStyle} />
                </label>
                <label style={{ display: 'block' }}>
                  <span style={labelStyle}>Nom et fonction du contact *</span>
                  <input required name="contact" style={fieldStyle} />
                </label>
                <label style={{ display: 'block' }}>
                  <span style={labelStyle}>Téléphone *</span>
                  <input required name="tel" type="tel" placeholder="+225…" style={fieldStyle} />
                </label>
                <label style={{ display: 'block' }}>
                  <span style={labelStyle}>E-mail *</span>
                  <input required name="email" type="email" style={fieldStyle} />
                </label>
                <label style={{ display: 'block', gridColumn: '1 / -1' }}>
                  <span style={labelStyle}>Nombre de collaborateurs concernés *</span>
                  <input required name="effectifConcerne" placeholder="Ex. 25" style={fieldStyle} />
                </label>
              </div>

              <div style={{ marginTop: 20 }}>
                <span style={labelStyle}>Lieu souhaité *</span>
                <div style={css('display:flex;flex-wrap:wrap;gap:10px;margin-top:6px')}>
                  {LIEU_OPTIONS.map((o) => (
                    <button key={o} type="button" onClick={() => setLieu(o)} style={{ ...css(chip(lieu === o)), padding: '11px 18px', width: 'auto' }}>
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 20 }}>
                <span style={labelStyle}>Fréquence souhaitée</span>
                <div style={css('display:flex;flex-wrap:wrap;gap:10px;margin-top:6px')}>
                  {FREQUENCE_OPTIONS.map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => setFrequence((prev) => (prev === o ? '' : o))}
                      style={{ ...css(chip(frequence === o)), padding: '11px 18px', width: 'auto' }}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 20 }}>
                <span style={labelStyle}>Période souhaitée</span>
                <div style={css('display:flex;flex-wrap:wrap;gap:10px;margin-top:6px')}>
                  {PERIODE_OPTIONS.map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => setPeriode((prev) => (prev === o ? '' : o))}
                      style={{ ...css(chip(periode === o)), padding: '11px 18px', width: 'auto' }}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              <label style={{ display: 'block', marginTop: 20 }}>
                <span style={labelStyle}>Message / besoins particuliers</span>
                <textarea name="message" rows={4} style={{ ...fieldStyle, resize: 'vertical' }} />
              </label>

              <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginTop: 20, cursor: 'pointer' }}>
                <input required name="consent" type="checkbox" style={{ marginTop: 3, width: 18, height: 18, accentColor: '#C6F202', flex: '0 0 auto' }} />
                <span style={css('font-size:13.5px;color:var(--muted,#8a8a8a);line-height:1.5')}>J&apos;accepte que GBÔ traite ces données pour répondre à ma demande.</span>
              </label>
              <Honeypot />
              {errorMsg && (
                <div style={css('margin-top:14px;padding:12px 16px;border-radius:10px;background:rgba(248,113,113,.1);border:1px solid rgba(248,113,113,.3);color:#f87171;font-size:13.5px')}>
                  {errorMsg}
                </div>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="btn-cta"
                style={css(
                  `margin-top:24px;width:100%;padding:17px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:16px;opacity:${submitting ? 0.6 : 1}`
                )}
              >
                {submitting ? 'Envoi en cours…' : 'Demander une proposition'}
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </div>
  );
}
