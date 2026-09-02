'use client';

import { useState } from 'react';
import Link from 'next/link';
import { css } from '../../lib/css.js';
import { chip } from '../../lib/styleHelpers.js';
import Reveal from '../../components/Reveal.js';
import GlowBlobs from '../../components/GlowBlobs.js';
import Honeypot from '../../components/Honeypot.js';

// Page d'atterrissage du CTA header "Deux séances gratuites". Structure et logique éditoriale
// reprises de https://www.domicilgym.fr/contactez-nous/ (hero + formulaire en 2 colonnes,
// "comment ça marche" en 3 étapes, atouts, FAQ), adaptées au contexte GBÔ / Abidjan :
// - Pas de "crédit d'impôt" (dispositif fiscal français "services à la personne", sans
//   équivalent ici) ni de chiffres copiés de Domicil'Gym (787 avis, 170 coachs, "depuis
//   1993") : GBÔ étant en phase de lancement, on ne peut pas revendiquer ces chiffres.
// - Le formulaire poste sur /api/leads (même pipeline CRM que /fitness/tunnel) plutôt que
//   de créer un second système de collecte. `profile` n'étant pas demandé sur cette page
//   (contrairement au tunnel), on envoie 'adulte' par défaut — seul champ requis côté API
//   que ce formulaire ne couvre pas.

const OBJECTIVES = ['Perte de poids', 'Remise en forme', 'Renforcement musculaire', 'Préparation physique', 'Bien-être & mobilité', 'Accompagnement spécialisé', 'Autre'];

const TRUST_BADGES = ['Coaching 100 % personnalisé', 'Coachs sélectionnés par GBÔ', 'À domicile, en salle ou en extérieur', 'Sans engagement'];

const PROCESS_STEPS = [
  {
    n: '1',
    title: 'Votre demande est qualifiée',
    desc: 'Vous indiquez votre objectif, votre commune et vos disponibilités. Elle entre directement dans le CRM GBÔ.',
  },
  {
    n: '2',
    title: 'Un conseiller GBÔ vous contacte',
    desc: 'Pour affiner votre besoin et vous proposer un coach sélectionné selon sa compétence et sa zone.',
  },
  {
    n: '3',
    title: 'Vos deux premières séances sont offertes',
    desc: 'Un premier rendez-vous avec bilan complet de votre condition physique, sans engagement.',
  },
];

const WHY_GBO_INTRO = 'Votre objectif, votre niveau et votre rythme sont pris en compte pour construire un accompagnement réellement adapté.';
const WHY_GBO_OUTRO = 'Nous vous aidons à trouver la manière de le pratiquer qui correspond vraiment à vos objectifs, à votre rythme et à votre quotidien.';

const ATOUTS = [
  {
    title: 'Un accompagnement pensé pour vous',
    desc: 'Nous partons de votre objectif et de votre réalité pour construire un accompagnement qui vous correspond réellement.',
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
      </>
    ),
  },
  {
    title: "Une expertise qui s'adapte",
    desc: 'Selon votre objectif, GBÔ peut mobiliser différentes compétences et disciplines pour faire évoluer votre accompagnement.',
    icon: (
      <>
        <path d="M12 2l9 5-9 5-9-5 9-5z" />
        <path d="M3 12l9 5 9-5" />
        <path d="M3 17l9 5 9-5" />
      </>
    ),
  },
  {
    title: 'La liberté de votre cadre',
    desc: 'À domicile ou en salle, choisissez l’environnement dans lequel vous êtes le plus à l’aise pour pratiquer.',
    icon: (
      <>
        <path d="M3 11l9-7 9 7" />
        <path d="M5 10v10h14V10" />
      </>
    ),
  },
  {
    title: 'Un accompagnement dans la durée',
    desc: "L'objectif n'est pas seulement de vous faire commencer, mais de vous aider à progresser et à inscrire le sport dans votre quotidien.",
    icon: (
      <>
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M15 7h6v6" />
      </>
    ),
  },
];

const FAQ = [
  {
    q: 'Dois-je déjà être sportif ?',
    a: "Non, il n'est pas nécessaire d'être sportif. Le plus important, c'est votre envie de changer. Le coach adapte l'accompagnement à votre point de départ, même si vous reprenez après une longue pause.",
  },
  {
    q: 'Où pouvez-vous intervenir ?',
    a: 'GBÔ est actuellement présent à Abidjan. Indiquez votre commune dans le formulaire : nous vérifions la disponibilité d’un coach près de chez vous avant toute mise en relation.',
  },
  {
    q: 'Puis-je choisir mon objectif ?',
    a: 'Oui. Perte de poids, remise en forme, renforcement musculaire, préparation physique, bien-être et mobilité, accompagnement spécialisé : indiquez votre objectif principal dans le formulaire, le coach construit le programme autour de lui.',
  },
  {
    q: 'Puis-je être accompagné à domicile ?',
    a: "Oui. Vous choisissez le cadre qui vous convient : à domicile ou en salle. Précisez votre préférence dans le formulaire, un conseiller confirme la faisabilité selon votre zone.",
  },
  {
    q: "Puis-je m'entraîner avec quelqu'un ?",
    a: "Oui, c'est possible en duo ou en petit groupe (famille, amis, collègues). Signalez-le dans votre demande, le conseiller GBÔ organise la séance en conséquence.",
  },
  {
    q: "L'accompagnement nutritionnel est-il disponible ?",
    a: 'Oui, en option. Indiquez-le dans le formulaire : votre demande est transmise au Centre Médico Nutrition, partenaire nutrition de GBÔ.',
  },
  {
    q: 'Comment est choisi mon coach ?',
    a: 'Un coach est sélectionné par un conseiller GBÔ selon sa compétence, sa zone et ses disponibilités, en fonction de votre objectif et de votre profil.',
  },
  {
    q: 'Comment se déroule la première séance ?',
    a: 'Elle inclut un bilan complet de votre condition physique et un premier échange avec votre coach pour poser les bases de votre programme, sans engagement.',
  },
];

const fieldStyle = css(
  "width:100%;padding:15px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.14));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:15px"
);
const labelStyle = css('font-size:13px;font-weight:600;color:var(--muted,#8a8a8a);display:block;margin-bottom:6px');
const groupLabelStyle = css('font-size:14.5px;font-weight:700;margin-bottom:10px');

// "Nom & prénom" arrive en un seul champ côté formulaire mais l'API (partagée avec le tunnel)
// attend prenom/nom séparés — découpage au premier espace, meilleur effort raisonnable.
function splitName(full) {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return { prenom: parts[0] || '', nom: parts[0] || '' };
  return { prenom: parts[0], nom: parts.slice(1).join(' ') };
}

export default function DeuxSeancesGratuitesPage() {
  const [fullName, setFullName] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [commune, setCommune] = useState('');
  const [objective, setObjective] = useState(null);
  const [objectiveOther, setObjectiveOther] = useState('');
  const [accompaniment, setAccompaniment] = useState(null);
  const [nutrition, setNutrition] = useState(null);
  const [availability, setAvailability] = useState('');
  const [comment, setComment] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!objective) return setErrorMsg('Sélectionnez votre objectif principal.');
    if (objective === 'Autre' && !objectiveOther.trim()) return setErrorMsg('Précisez votre objectif.');
    if (!accompaniment) return setErrorMsg("Indiquez comment vous souhaitez être accompagné.");
    if (!nutrition) return setErrorMsg('Indiquez votre choix pour l’accompagnement nutritionnel.');
    if (!consent) return setErrorMsg('Le consentement est requis pour envoyer votre demande.');

    const { prenom, nom } = splitName(fullName);
    setSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: 'adulte',
          objective: objective === 'Autre' ? objectiveOther.trim() : objective,
          nutrition,
          nutritionObj: null,
          practiceLocation: accompaniment === 'domicile' ? 'domicile' : 'salle_partenaire',
          prenom,
          nom,
          tel,
          email,
          commune,
          availability,
          comment,
          consent: true,
          website: '',
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Une erreur est survenue, réessayez.');
        setSubmitting(false);
        return;
      }
      setSuccess(true);
    } catch {
      setErrorMsg('Connexion impossible. Vérifiez votre réseau et réessayez.');
      setSubmitting(false);
    }
  };

  return (
    <div>
      <section style={css('position:relative;overflow:hidden;padding:clamp(70px,9vw,110px) clamp(20px,5vw,64px) clamp(56px,8vw,90px)')}>
        <GlowBlobs />
        <div style={{ maxWidth: 1160, margin: '0 auto', position: 'relative' }}>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(360px,100%),1fr));gap:clamp(32px,5vw,64px);align-items:center')}>
            <div>
              <span style={css('display:inline-block;padding:5px 12px;border-radius:20px;background:var(--lime,#C6F202);color:#000;font-size:12px;font-weight:700;margin-bottom:18px')}>
                ● Offre de bienvenue
              </span>
              <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,5vw,46px);letter-spacing:-1.5px;line-height:1.05")}>
                Trouvez l&apos;accompagnement GBÔ adapté à votre objectif.
              </h1>
              <p style={css('font-size:clamp(16px,2vw,18px);color:var(--muted,#8a8a8a);margin-top:18px;line-height:1.55;max-width:48ch')}>
                Complétez vos coordonnées, votre commune et votre objectif. Un conseiller vérifie la disponibilité d&apos;un coach près de chez vous et vous
                offre deux premières séances, avec un bilan complet.
              </p>
              <div style={css('display:flex;flex-wrap:wrap;gap:10px;margin-top:30px')}>
                {TRUST_BADGES.map((b) => (
                  <span
                    key={b}
                    style={css(
                      "padding:8px 14px;border-radius:20px;border:1px solid var(--border,rgba(255,255,255,.14));background:var(--glass,rgba(255,255,255,.03));font-size:12.5px;font-weight:600;color:var(--muted,#c8c8c8);display:inline-flex;align-items:center;gap:7px"
                    )}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--lime,#C6F202)" strokeWidth="3">
                      <path d="M5 12l5 5L20 6" />
                    </svg>
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div
              id="formulaire"
              style={css(
                'padding:clamp(24px,4vw,32px);border-radius:24px;border:1px solid var(--border,rgba(255,255,255,.12));background:var(--glass,rgba(255,255,255,.03))'
              )}
            >
              {success ? (
                <div style={{ textAlign: 'center', padding: '20px 4px', animation: 'fadeUp .5s both' }}>
                  <div
                    style={css(
                      'width:64px;height:64px;border-radius:50%;background:var(--lime,#C6F202);color:#000;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;animation:pop .5s both'
                    )}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 12l5 5L20 6" />
                    </svg>
                  </div>
                  <h2 style={css("font-family:'Broaven';font-weight:700;font-size:22px;margin-bottom:10px")}>Merci ! Votre demande est enregistrée.</h2>
                  <p style={css('font-size:14.5px;color:var(--muted,#8a8a8a);line-height:1.55')}>
                    Un conseiller GBÔ AFRICA GROUP vous contactera rapidement afin de préparer vos deux premières séances.
                  </p>
                  <Link
                    href="/"
                    style={css('display:inline-block;margin-top:22px;padding:14px 26px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.2));font-weight:700;font-size:14px;color:var(--fg,#fff)')}
                  >
                    Retour à l&apos;accueil
                  </Link>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <h2 style={css("font-family:'Broaven';font-weight:700;font-size:22px;margin-bottom:20px")}>Parlons de votre objectif</h2>

                  <div style={{ display: 'grid', gap: 16 }}>
                    <label style={{ display: 'block' }}>
                      <span style={labelStyle}>Nom & prénom *</span>
                      <input required value={fullName} onChange={(e) => setFullName(e.target.value)} style={fieldStyle} />
                    </label>
                    <div style={css('display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px')}>
                      <label style={{ display: 'block' }}>
                        <span style={labelStyle}>Téléphone *</span>
                        <input required type="tel" placeholder="+225 07 00 00 00 00" value={tel} onChange={(e) => setTel(e.target.value)} style={fieldStyle} />
                      </label>
                      <label style={{ display: 'block' }}>
                        <span style={labelStyle}>E-mail *</span>
                        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={fieldStyle} />
                      </label>
                    </div>
                    <label style={{ display: 'block' }}>
                      <span style={labelStyle}>Commune / zone</span>
                      <input placeholder="Cocody, Marcory, Plateau…" value={commune} onChange={(e) => setCommune(e.target.value)} style={fieldStyle} />
                    </label>

                    <div>
                      <div style={groupLabelStyle}>Objectif principal</div>
                      <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px')}>
                        {OBJECTIVES.map((o) => (
                          <button key={o} type="button" onClick={() => setObjective(o)} style={css(chip(objective === o) + ';padding:11px 14px;font-size:13.5px')}>
                            {o}
                          </button>
                        ))}
                      </div>
                      {objective === 'Autre' && (
                        <input
                          placeholder="Précisez votre objectif…"
                          value={objectiveOther}
                          onChange={(e) => setObjectiveOther(e.target.value)}
                          style={{ ...fieldStyle, marginTop: 10 }}
                        />
                      )}
                    </div>

                    <div>
                      <div style={groupLabelStyle}>Comment souhaitez-vous être accompagné ?</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        <button type="button" onClick={() => setAccompaniment('domicile')} style={css(chip(accompaniment === 'domicile') + ';padding:12px 14px;font-size:14px')}>
                          À domicile
                        </button>
                        <button type="button" onClick={() => setAccompaniment('salle')} style={css(chip(accompaniment === 'salle') + ';padding:12px 14px;font-size:14px')}>
                          En salle
                        </button>
                      </div>
                    </div>

                    <div>
                      <div style={groupLabelStyle}>Souhaitez-vous un accompagnement nutritionnel ?</div>
                      <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:8px')}>
                        {[
                          ['oui', 'Oui'],
                          ['non', 'Non'],
                          ['plus_infos', 'Je souhaite en savoir plus'],
                        ].map(([val, label]) => (
                          <button key={val} type="button" onClick={() => setNutrition(val)} style={css(chip(nutrition === val) + ';padding:12px 14px;font-size:13.5px')}>
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <label style={{ display: 'block' }}>
                      <span style={labelStyle}>Vos disponibilités</span>
                      <input
                        placeholder="Ex. : en semaine le soir, samedi matin…"
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        style={fieldStyle}
                      />
                    </label>

                    <label style={{ display: 'block' }}>
                      <span style={labelStyle}>Parlez-nous de votre besoin :</span>
                      <textarea rows={3} value={comment} onChange={(e) => setComment(e.target.value)} style={{ ...fieldStyle, resize: 'vertical' }} />
                    </label>

                    <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer' }}>
                      <input
                        required
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        style={{ marginTop: 3, width: 18, height: 18, accentColor: '#C6F202', flex: '0 0 auto' }}
                      />
                      <span style={css('font-size:13px;color:var(--muted,#8a8a8a);line-height:1.5')}>
                        J&apos;accepte que GBÔ AFRICA GROUP traite mes données personnelles afin de répondre à ma demande, conformément à la{' '}
                        <Link href="/legal/privacy" style={{ color: 'var(--lime,#C6F202)' }}>
                          politique de confidentialité
                        </Link>
                        .
                      </span>
                    </label>

                    <Honeypot />

                    {errorMsg && (
                      <div style={css('padding:12px 16px;border-radius:10px;background:rgba(248,113,113,.1);border:1px solid rgba(248,113,113,.3);color:#f87171;font-size:13.5px')}>
                        {errorMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      style={css(
                        `width:100%;padding:17px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:16px;opacity:${submitting ? 0.6 : 1}`
                      )}
                    >
                      {submitting ? 'Envoi en cours…' : 'Demander mon accompagnement →'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Reveal as="section" style={css('padding:clamp(48px,8vw,90px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b)')}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:10px')}>Comment ça marche</div>
            <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,4vw,36px);letter-spacing:-1px")}>Trois étapes, sans engagement.</h2>
          </div>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px')}>
            {PROCESS_STEPS.map((s, i) => (
              <Reveal
                key={s.n}
                delay={i * 80}
                className="hover-card"
                style={css('padding:26px;border-radius:18px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--glass,rgba(255,255,255,.02))')}
              >
                <div style={css("font-family:'Broaven';font-weight:700;font-size:36px;color:rgba(198,242,2,.25);line-height:1;margin-bottom:12px")}>{s.n}</div>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{s.title}</div>
                <div style={css('font-size:14px;color:var(--muted,#8a8a8a);line-height:1.55')}>{s.desc}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(48px,8vw,90px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:10px')}>
              Pourquoi choisir GBÔ Fitness ?
            </div>
            <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,4vw,36px);letter-spacing:-1px;max-width:32ch;margin:0 auto")}>{WHY_GBO_INTRO}</h2>
          </div>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-bottom:30px')}>
            {ATOUTS.map((a, i) => (
              <Reveal
                key={a.title}
                delay={i * 70}
                className="hover-card"
                style={css('padding:24px;border-radius:18px;border:1px solid var(--border,rgba(255,255,255,.09));background:var(--glass,rgba(255,255,255,.02))')}
              >
                <div
                  style={css(
                    "width:40px;height:40px;border-radius:11px;background:rgba(198,242,2,.12);color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center;margin-bottom:14px"
                  )}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {a.icon}
                  </svg>
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{a.title}</div>
                <div style={css('font-size:14px;color:var(--muted,#8a8a8a);line-height:1.5')}>{a.desc}</div>
              </Reveal>
            ))}
          </div>
          <p style={css('text-align:center;max-width:56ch;margin:0 auto;font-size:15.5px;color:var(--muted,#8a8a8a);line-height:1.55')}>{WHY_GBO_OUTRO}</p>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(48px,8vw,90px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b)')}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:10px')}>FAQ</div>
            <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,4vw,36px);letter-spacing:-1px")}>Questions fréquentes.</h2>
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            {FAQ.map((f) => (
              <div key={f.q} className="hover-card" style={css('padding:22px;border-radius:14px;border:1px solid var(--border,rgba(255,255,255,.09));background:var(--glass,rgba(255,255,255,.02))')}>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{f.q}</div>
                <div style={css('font-size:14.5px;color:var(--muted,#8a8a8a);line-height:1.55')}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(56px,9vw,100px) clamp(20px,5vw,64px);background:var(--lime,#C6F202);color:#000;text-align:center')}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(26px,4.5vw,42px);letter-spacing:-1.5px;line-height:1.05;margin-bottom:16px")}>
            Vos deux premières séances, offertes.
          </h2>
          <p style={css('font-size:16px;font-weight:600;margin-bottom:28px;opacity:.85')}>Deux minutes pour transmettre votre demande. Sans engagement.</p>
          <a href="#formulaire" style={css('display:inline-block;padding:17px 32px;border-radius:12px;background:#000;color:#fff;font-weight:700;font-size:16px')}>
            Demander mon accompagnement →
          </a>
        </div>
      </Reveal>
    </div>
  );
}
