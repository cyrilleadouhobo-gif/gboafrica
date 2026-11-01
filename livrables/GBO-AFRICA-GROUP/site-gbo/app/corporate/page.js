'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { css } from '../../lib/css.js';
import ImageSlot from '../../components/ImageSlot.js';
import Reveal from '../../components/Reveal.js';
import Honeypot from '../../components/Honeypot.js';
import { chip } from '../../lib/styleHelpers.js';

const WHATSAPP_LINK = 'https://wa.me/2250103161415';

const fieldStyle = css(
  "width:100%;padding:15px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.14));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:15px"
);
const labelStyle = css('font-size:13px;font-weight:600;color:var(--muted,#8a8a8a);display:block;margin-bottom:6px');
const eyebrow = css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px');

const ICONS = {
  heart: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />,
  activity: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
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
  bolt: <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />,
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
  check: <path d="M5 12l5 5L20 6" />,
  whatsapp: <path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.4A10 10 0 1012 2z" />,
};

function Icon({ name, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}

const BENEFITS = [
  { t: 'Une culture du bien-être', d: 'Inscrire le sport dans les habitudes de l’entreprise, comme une pratique régulière plutôt qu’un évènement isolé.', icon: 'heart' },
  { t: 'Un mouvement accessible', d: 'Donner à chaque collaborateur l’occasion de bouger, dans un cadre encadré et accessible à tous les niveaux.', icon: 'activity' },
  { t: 'Des moments de détente', d: 'Des séances pour décompresser, travailler la mobilité et relâcher la tension accumulée.', icon: 'clock' },
  { t: 'Une cohésion renforcée', d: 'Des expériences collectives qui créent des liens au-delà des échanges habituels de bureau.', icon: 'people' },
  { t: 'Une dynamique d’équipe', d: 'Une énergie qui se propage dans les équipes et nourrit l’engagement au quotidien.', icon: 'bolt' },
];

const ACTIVITY_CATEGORIES = [
  {
    t: 'Fitness & cardio',
    list: 'Cardio training, Bodycombat, Zumba, Djembola, Taebo, Tabata, Fitdance…',
    d: 'Des séances dynamiques pour bouger, développer l’endurance et partager une expérience sportive en groupe.',
  },
  {
    t: 'Renforcement & mobilité',
    list: 'Yoga, Pilates, Bodybalance…',
    d: 'Des exercices ciblés pour développer la force, entretenir les capacités physiques et améliorer la mobilité au quotidien.',
  },
];

const ADAPTED_FEATURES = [
  { t: 'Séances collectives', d: 'Des activités réunissant les collaborateurs dans un cadre encadré.', icon: 'people' },
  { t: 'Sur site', d: 'Des séances organisées dans les locaux de l’entreprise lorsque les conditions le permettent.', icon: 'building' },
  { t: 'Dans un lieu convenu', d: 'Une autre localisation peut être définie avec GBÔ.', icon: 'pin' },
  { t: 'Rythme adapté', d: 'Une fréquence et des horaires définis selon les disponibilités de l’entreprise.', icon: 'clock' },
];

const OPERATIONAL_STEPS = [
  { n: '01', t: 'Analyse du besoin', d: 'Comprendre vos effectifs, vos objectifs, le profil des participants et vos contraintes.' },
  { n: '02', t: 'Définition du programme', d: 'Choisir les activités, la fréquence, les horaires, le lieu et les modalités d’intervention.' },
  { n: '03', t: 'Planification et affectation des coachs', d: 'Organiser le calendrier et mobiliser les coachs adaptés aux disciplines retenues.' },
  { n: '04', t: 'Animation des séances', d: 'Préparer et encadrer les activités sportives collectives.' },
  { n: '05', t: 'Suivi et bilan', d: 'Suivre la réalisation des séances, recueillir les retours et établir un bilan de période.' },
];

const AUDIENCES = [
  { t: 'DRH', d: 'Mettre en place une initiative sportive destinée aux collaborateurs.', icon: 'briefcase' },
  { t: 'Direction générale', d: 'Structurer une démarche de bien-être et de cohésion autour d’une activité concrète.', icon: 'compass' },
  { t: 'Responsables QHSE', d: 'Organiser des activités physiques adaptées au cadre de l’entreprise.', icon: 'shield' },
  { t: 'Responsables de site', d: 'Coordonner une activité compatible avec les contraintes opérationnelles.', icon: 'building' },
  { t: 'Collaborateurs', d: 'Participer à des séances sportives collectives et encadrées.', icon: 'people' },
];

const PRICING_TIERS = [
  {
    name: 'Essentiel',
    freq: '1 séance / semaine',
    detail: '4 séances par mois',
    price: '120 000',
    d: 'Pour instaurer une routine sportive régulière et accessible à vos collaborateurs.',
  },
  {
    name: 'Performance',
    freq: '2 séances / semaine',
    detail: '8 séances par mois',
    price: '228 000',
    d: 'Pour renforcer la régularité de la pratique et la dynamique collective.',
    featured: true,
  },
  {
    name: 'Excellence',
    freq: '3 séances / semaine',
    detail: '12 séances par mois',
    price: '324 000',
    d: 'Pour une pratique sportive plus soutenue, intégrée à l’organisation de l’entreprise.',
  },
];

const INCLUDED_ITEMS = [
  'Bilan initial de chaque collaborateur',
  'Encadrement professionnel par des coachs sélectionnés',
  'Plusieurs activités intégrées au programme',
  'Organisation et planification des séances',
  'Suivi de la réalisation des séances',
  'Bilan périodique de chaque collaborateur',
];

const JOURNEY_STEPS = [
  { n: '01', t: 'Vous nous présentez votre besoin', d: 'Vous nous communiquez votre effectif, vos objectifs et vos contraintes.' },
  { n: '02', t: 'Nous étudions votre demande', d: 'Nous définissons le format d’intervention et les activités adaptées.' },
  { n: '03', t: 'Vous recevez une proposition commerciale', d: 'Nous vous transmettons une offre précisant le programme, les modalités et le budget.' },
  { n: '04', t: 'Nous lançons les séances', d: 'Après validation, nous préparons et organisons les interventions.' },
];

const CORPORATE_FAQ = [
  { q: 'À quelles entreprises s’adresse GBÔ ?', a: 'À toute entreprise qui souhaite proposer des activités sportives encadrées à ses collaborateurs.' },
  {
    q: 'Les séances peuvent-elles être organisées dans nos locaux ?',
    a: 'Oui, lorsque les conditions d’accueil et de sécurité le permettent. Sinon, un autre lieu peut être défini avec GBÔ.',
  },
  { q: 'Faut-il avoir une expérience sportive pour participer ?', a: 'Non, les activités et leur niveau sont adaptés au profil des participants.' },
  { q: 'Peut-on choisir les activités ?', a: 'Oui, elles sont sélectionnées avec l’entreprise selon ses objectifs et les modalités de la prestation.' },
  {
    q: 'Comment obtenir un tarif personnalisé ?',
    a: 'Transmettez-nous l’effectif et les besoins de votre entreprise via le formulaire ci-dessus, vous recevrez une proposition adaptée.',
  },
  { q: 'Comment démarrer une prestation ?', a: 'Une première prise de contact permet d’analyser le besoin et de définir une proposition commerciale.' },
];

const EFFECTIF_OPTIONS = ['1 à 10', '11 à 20', '21 à 30', 'Plus de 30'];
const FREQUENCE_OPTIONS = ['À définir', '1 séance/semaine', '2 séances/semaine', '3 séances/semaine'];

function StepTimeline({ steps }) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', left: 23, top: 24, bottom: 24, width: 1, background: 'var(--border,rgba(255,255,255,.14))' }} />
      {steps.map((s, i) => (
        <Reveal
          key={s.n}
          delay={i * 70}
          style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: 18, marginBottom: i === steps.length - 1 ? 0 : 26 }}
        >
          <span
            style={css(
              "font-family:'Broaven';flex:0 0 auto;width:46px;height:46px;border-radius:50%;background:var(--bg,#000);border:1px solid var(--lime,#C6F202);color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;position:relative;z-index:1"
            )}
          >
            {s.n}
          </span>
          <div style={{ paddingTop: 10 }}>
            <div style={{ fontWeight: 600, fontSize: 15.5, marginBottom: s.d ? 4 : 0 }}>{s.t}</div>
            {s.d && <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a);line-height:1.5')}>{s.d}</div>}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function CorporatePage() {
  const [effectif, setEffectif] = useState('');
  const [frequence, setFrequence] = useState('');
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [hideWhatsapp, setHideWhatsapp] = useState(false);

  // Le bouton WhatsApp flottant chevauche le texte de "Ce qui est inclus" dans cette section
  // sur mobile (coin bas-droit toujours occupé) — on l'efface pendant qu'elle est à l'écran.
  useEffect(() => {
    const el = document.getElementById('offres');
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setHideWhatsapp(entry.isIntersecting), {
      rootMargin: '0px 0px -10% 0px',
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const submitCompany = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!effectif) {
      setErrorMsg('Merci de préciser l’effectif concerné.');
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
          effectifConcerne: effectif,
          lieu: f.get('lieu'),
          frequence,
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
          <div style={{ ...eyebrow, color: 'var(--lime,#C6F202)' }}>Offres entreprises</div>
          <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(26px,5.5vw,50px);letter-spacing:-1.5px;line-height:1.02;max-width:22ch")}>
            FAITES DU SPORT UN ATOUT POUR VOTRE ENTREPRISE.
          </h1>
          <p style={css('font-size:clamp(16px,2.2vw,20px);color:rgba(255,255,255,.85);max-width:60ch;margin-top:20px;line-height:1.5')}>
            Des séances de coaching sportif collectives, encadrées par nos coachs et adaptées à votre organisation. Des moments dédiés au
            mouvement, au bien-être et à la cohésion de vos collaborateurs.
          </p>
          <div style={css('display:flex;flex-wrap:wrap;gap:14px;margin-top:32px')}>
            <a
              href="#proposition"
              className="btn-cta"
              style={css(
                'display:inline-block;min-width:0;padding:16px 28px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:clamp(13.5px,3.8vw,15.5px);text-align:center'
              )}
            >
              Demander une proposition
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta"
              style={css('padding:16px 28px;border-radius:12px;border:1px solid rgba(255,255,255,.3);color:#fff;font-weight:700;font-size:clamp(13.5px,3.8vw,15.5px);white-space:nowrap')}
            >
              Parler à GBÔ
            </a>
          </div>
        </div>
      </section>

      {/* Bénéfices */}
      <Reveal as="section" style={css('padding:clamp(56px,8vw,96px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={eyebrow}>Pourquoi le sport en entreprise ?</div>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,3.8vw,36px);letter-spacing:-1px;margin-bottom:36px;max-width:26ch")}>
            Des bénéfices concrets pour vos équipes.
          </h2>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr));gap:16px')}>
            {BENEFITS.map((b) => (
              <div key={b.t} style={css('display:flex;flex-direction:column;gap:14px')}>
                <span
                  style={css(
                    'width:42px;height:42px;border-radius:12px;background:rgba(198,242,2,.1);color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center'
                  )}
                >
                  <Icon name={b.icon} />
                </span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{b.t}</div>
                  <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a);line-height:1.55')}>{b.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Nos activités */}
      <Reveal as="section" id="activites" style={{ scrollMarginTop: 90, ...css('padding:clamp(56px,8vw,96px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b)') }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={eyebrow}>Nos activités</div>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,3.8vw,36px);letter-spacing:-1px;margin-bottom:16px;max-width:24ch")}>
            Des activités variées pour faire bouger vos équipes.
          </h2>
          <p style={css('font-size:15px;color:var(--muted,#8a8a8a);line-height:1.6;max-width:70ch;margin-bottom:36px')}>
            Un encadrement assuré par des coachs sélectionnés, expérimentés et spécialisés dans leurs disciplines.
          </p>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr));gap:16px;margin-bottom:24px')}>
            {ACTIVITY_CATEGORIES.map((c) => (
              <div
                key={c.t}
                style={css('padding:clamp(24px,4vw,32px);border-radius:20px;border:1px solid var(--border,rgba(255,255,255,.09));background:var(--glass,rgba(255,255,255,.02))')}
              >
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 10 }}>{c.t}</div>
                <div style={css('font-size:13px;color:var(--lime,#C6F202);font-weight:600;line-height:1.5;margin-bottom:14px')}>{c.list}</div>
                <div style={css('font-size:14px;color:var(--muted,#8a8a8a);line-height:1.6')}>{c.d}</div>
              </div>
            ))}
          </div>
          <p style={css('font-size:13px;color:var(--muted,#8a8a8a);line-height:1.5;max-width:70ch')}>
            Les activités proposées sont sélectionnées selon les objectifs de l’entreprise, le profil des participants et les conditions de
            réalisation.
          </p>
        </div>
      </Reveal>

      {/* Organisation flexible */}
      <Reveal as="section" style={css('padding:clamp(56px,8vw,96px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={eyebrow}>Une organisation flexible</div>
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

      {/* Photo — casse le rythme après 2 grilles de cartes d'affilée */}
      <Reveal as="section" style={css('padding:clamp(24px,4vw,40px) clamp(20px,5vw,64px) clamp(24px,4vw,40px)')}>
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', aspectRatio: '21/8', borderRadius: 24, overflow: 'hidden', border: '1px solid var(--border,rgba(255,255,255,.1))' }}>
          <ImageSlot placeholder="Accompagnement GBÔ" src="/images/corporate-accompagnement.jpg" style={{ objectPosition: 'center 15%' }} />
          <div style={css('position:absolute;inset:0;background:linear-gradient(90deg,rgba(5,5,5,.75) 0%,rgba(5,5,5,.15) 55%,rgba(5,5,5,0) 100%)')} />
          <div style={{ position: 'absolute', left: 'clamp(20px,4vw,40px)', top: '50%', transform: 'translateY(-50%)', maxWidth: 340 }}>
            <div style={css("font-family:'Broaven';font-weight:700;font-size:clamp(17px,2.2vw,22px);line-height:1.25")}>
              Un accompagnement assuré par des coachs certifiés, passionnés et expérimentés.
            </div>
          </div>
        </div>
      </Reveal>

      {/* Notre engagement opérationnel */}
      <Reveal as="section" style={css('padding:clamp(56px,8vw,96px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b)')}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={eyebrow}>Notre engagement opérationnel</div>
          <h2
            style={css(
              "font-family:'Broaven';font-weight:700;font-size:clamp(24px,3.8vw,36px);letter-spacing:-1px;line-height:1.15;max-width:24ch;margin-bottom:36px"
            )}
          >
            Nous prenons en charge l’organisation sportive.
          </h2>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr));gap:16px')}>
            {OPERATIONAL_STEPS.map((s, i) => (
              <Reveal
                key={s.n}
                delay={i * 70}
                style={css('padding:26px;border-radius:20px;border:1px solid var(--border,rgba(255,255,255,.09));background:var(--glass,rgba(255,255,255,.02))')}
              >
                <div style={css("font-family:'Broaven';font-weight:700;font-size:26px;color:rgba(198,242,2,.5);margin-bottom:14px")}>{s.n}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{s.t}</div>
                <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a);line-height:1.55')}>{s.d}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Nos interlocuteurs */}
      <Reveal as="section" style={css('padding:clamp(56px,8vw,96px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={eyebrow}>Nos interlocuteurs</div>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,3.8vw,36px);letter-spacing:-1px;margin-bottom:36px;max-width:28ch")}>
            Une solution pensée pour les entreprises et leurs collaborateurs.
          </h2>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr));gap:16px')}>
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

      {/* Nos offres commerciales */}
      <Reveal as="section" id="offres" style={css('padding:clamp(56px,8vw,96px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b)')}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={eyebrow}>Nos offres commerciales</div>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,3.8vw,36px);letter-spacing:-1px;margin-bottom:36px;max-width:28ch")}>
            Des formules pour intégrer progressivement le sport dans votre entreprise.
          </h2>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr));gap:16px;margin-bottom:28px')}>
            {PRICING_TIERS.map((t) => (
              <div
                key={t.name}
                style={css(
                  `padding:clamp(24px,4vw,30px);border-radius:20px;border:1px solid ${t.featured ? 'var(--lime,#C6F202)' : 'var(--border,rgba(255,255,255,.1))'};background:var(--glass,rgba(255,255,255,.02))`
                )}
              >
                <div style={css("font-family:'Broaven';font-weight:700;font-size:19px;margin-bottom:4px")}>{t.name}</div>
                <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a);margin-bottom:18px')}>
                  {t.freq} · {t.detail}
                </div>
                <div style={{ marginBottom: 14 }}>
                  <span style={css("font-family:'Broaven';font-weight:700;font-size:24px;color:var(--lime,#C6F202)")}>{t.price} F CFA</span>
                  <span style={css('font-size:13px;color:var(--muted,#8a8a8a)')}> / mois</span>
                </div>
                <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a);line-height:1.55')}>{t.d}</div>
              </div>
            ))}
          </div>
          <div
            style={css(
              'padding:clamp(24px,4vw,32px);border-radius:20px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--glass,rgba(255,255,255,.02));margin-bottom:20px'
            )}
          >
            <div style={css('font-size:13px;letter-spacing:1px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:700;margin-bottom:16px')}>
              Ce qui est inclus
            </div>
            <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr));gap:14px 28px')}>
              {INCLUDED_ITEMS.map((item) => (
                <div key={item} style={css('display:flex;align-items:center;gap:12px;font-size:14.5px;font-weight:600')}>
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
          <p style={css('font-size:12.5px;color:var(--muted,#8a8a8a);margin-bottom:24px')}>
            Tarifs indicatifs, variables selon l’effectif et les modalités de la prestation.
          </p>
          <a
            href="#proposition"
            className="btn-cta"
            style={css('display:inline-block;padding:16px 28px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:15px')}
          >
            Obtenir un devis personnalisé
          </a>
        </div>
      </Reveal>

      {/* Le déroulé */}
      <Reveal as="section" style={css('padding:clamp(56px,8vw,96px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ ...eyebrow, textAlign: 'center' }}>Le déroulé</div>
          <h2
            style={css(
              "font-family:'Broaven';font-weight:700;font-size:clamp(24px,3.8vw,36px);letter-spacing:-1px;margin-bottom:48px;text-align:center"
            )}
          >
            Votre projet sportif en 4 étapes.
          </h2>
          <StepTimeline steps={JOURNEY_STEPS} />
        </div>
      </Reveal>

      {/* Formulaire */}
      <Reveal as="section" id="proposition" style={{ scrollMarginTop: 90, ...css('padding:clamp(20px,3vw,40px) clamp(20px,5vw,64px) clamp(64px,9vw,110px);background:var(--surface,#0b0b0b)') }}>
        <div
          style={css(
            'max-width:760px;margin:0 auto;padding:clamp(28px,4vw,44px);border-radius:24px;border:1px solid var(--border,rgba(255,255,255,.12));background:var(--bg,#000)'
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
              <h2 style={css("font-family:'Broaven';font-weight:700;font-size:26px;margin-bottom:6px")}>Demander une proposition commerciale</h2>
              <p style={css('color:var(--muted,#8a8a8a);font-size:14.5px;margin-bottom:24px;line-height:1.5')}>
                Quelques informations pour comprendre votre organisation et vous proposer un dispositif adapté.
              </p>
              <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr));gap:12px')}>
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
                  <span style={labelStyle}>E-mail professionnel *</span>
                  <input required name="email" type="email" style={fieldStyle} />
                </label>
                <label style={{ display: 'block', gridColumn: '1 / -1' }}>
                  <span style={labelStyle}>Lieu d’intervention envisagé *</span>
                  <input required name="lieu" placeholder="Commune, site ou adresse" style={fieldStyle} />
                </label>
              </div>

              <div style={{ marginTop: 20 }}>
                <span style={labelStyle}>Effectif concerné *</span>
                <div style={css('display:flex;flex-wrap:wrap;gap:10px;margin-top:6px')}>
                  {EFFECTIF_OPTIONS.map((o) => (
                    <button key={o} type="button" onClick={() => setEffectif(o)} style={{ ...css(chip(effectif === o)), padding: '11px 18px', width: 'auto' }}>
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

              <label style={{ display: 'block', marginTop: 20 }}>
                <span style={labelStyle}>Votre besoin</span>
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
                {submitting ? 'Envoi en cours…' : 'Préparer ma demande'}
              </button>
            </form>
          )}
        </div>
      </Reveal>

      {/* FAQ */}
      <Reveal as="section" style={css('padding:clamp(56px,8vw,96px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={eyebrow}>FAQ</div>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,3.8vw,36px);letter-spacing:-1px;margin-bottom:36px")}>
            Vos questions, nos réponses.
          </h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {CORPORATE_FAQ.map((f) => (
              <div
                key={f.q}
                className="hover-card"
                style={css('padding:22px;border-radius:14px;border:1px solid var(--border,rgba(255,255,255,.09));background:var(--glass,rgba(255,255,255,.02))')}
              >
                <div style={{ fontWeight: 700, fontSize: 15.5, marginBottom: 8 }}>{f.q}</div>
                <div style={css('font-size:14px;color:var(--muted,#8a8a8a);line-height:1.55')}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Bouton WhatsApp flottant — masqué pendant que la section Offres (#offres) est à
          l'écran, voir l'IntersectionObserver plus haut */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter GBÔ sur WhatsApp"
        style={css(
          `position:fixed;right:20px;bottom:20px;z-index:40;width:54px;height:54px;border-radius:50%;background:#25D366;color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 20px rgba(0,0,0,.35);transition:opacity .2s,transform .2s;opacity:${hideWhatsapp ? 0 : 1};transform:scale(${hideWhatsapp ? 0.8 : 1});pointer-events:${hideWhatsapp ? 'none' : 'auto'}`
        )}
      >
        <Icon name="whatsapp" size={26} />
      </a>
    </div>
  );
}
