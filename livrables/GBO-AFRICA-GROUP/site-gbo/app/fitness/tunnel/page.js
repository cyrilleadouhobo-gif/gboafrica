'use client';

import { useState } from 'react';
import Link from 'next/link';
import { css } from '../../../lib/css.js';
import { chip } from '../../../lib/styleHelpers.js';
import { useAppData } from '../../../context/AppData.js';
import { PROFILE_CARDS, NUTRITION_OBJECTIVES, NEXT_STEPS, objectivesFor, profileLabel } from '../../../data/content.js';

const fieldStyle = css(
  "width:100%;padding:15px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.14));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:15px"
);
const labelStyle = css('font-size:13px;font-weight:600;color:var(--muted,#8a8a8a);display:block;margin-bottom:6px');

export default function TunnelPage() {
  const { addLead, nextLeadId, leads } = useAppData();
  const [tStep, setTStep] = useState(1);
  const [profile, setProfile] = useState(null);
  const [objective, setObjective] = useState(null);
  const [objOther, setObjOther] = useState('');
  const [nutrition, setNutrition] = useState(null);
  const [nutritionObj, setNutritionObj] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const goNext = () => {
    if (tStep === 1 && !profile) return setErrorMsg('Sélectionnez un profil pour continuer.');
    if (tStep === 2 && !objective) return setErrorMsg('Sélectionnez un objectif.');
    if (tStep === 2 && objective === 'Autre' && !objOther.trim()) return setErrorMsg('Précisez votre objectif.');
    if (tStep === 3 && !nutrition) return setErrorMsg('Indiquez votre choix pour la nutrition.');
    setErrorMsg('');
    setTStep((s) => s + 1);
  };
  const goBack = () => setTStep((s) => Math.max(1, s - 1));

  const selectProfile = (key) => {
    setProfile(key);
    setObjective(null);
    setObjOther('');
    setErrorMsg('');
  };
  const selectObjective = (label) => {
    setObjective(label);
    if (label !== 'Autre') setObjOther('');
    setErrorMsg('');
  };
  const selectNutrition = (val) => {
    setNutrition(val);
    if (val === 'non') setNutritionObj(null);
    setErrorMsg('');
  };

  const submitTunnel = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const obj = objective === 'Autre' ? objOther || 'Autre' : objective;
    const particuliersCount = leads.filter((l) => l.type === 'Particulier').length;
    const lead = {
      id: 'L-' + (1043 + particuliersCount),
      name: `${f.get('prenom') || ''} ${f.get('nom') || ''}`.trim(),
      type: 'Particulier',
      objective: obj,
      profile: profileLabel(profile),
      source: 'Tunnel Particulier',
      status: 'Nouveau',
      commune: f.get('commune') || '—',
      date: new Date().toLocaleDateString('fr-FR'),
      coach: null,
      nutrition: nutrition === 'oui',
    };
    addLead(lead);
    setTStep(5);
  };

  const progressPct = Math.min(100, Math.round((tStep / 4) * 100)) + '%';
  const stepLabel = `Étape ${Math.min(tStep, 4)}/4`;
  const objectiveOptions = objectivesFor(profile);

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(30px,6vw,64px) clamp(20px,5vw,40px) 90px', minHeight: 'calc(100vh - 68px)' }}>
      {tStep === 5 && (
        <div style={{ textAlign: 'center', paddingTop: 20, animation: 'fadeUp .5s both' }}>
          <div
            style={css(
              'width:88px;height:88px;border-radius:50%;background:var(--lime,#C6F202);color:#000;display:flex;align-items:center;justify-content:center;margin:0 auto 26px;animation:pop .5s both'
            )}
          >
            <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 12l5 5L20 6" />
            </svg>
          </div>
          <h1 style={css("font-family:'Space Grotesk';font-weight:700;font-size:clamp(28px,5vw,40px);letter-spacing:-1px;margin-bottom:14px")}>
            Merci ! Votre demande est enregistrée.
          </h1>
          <p style={css('font-size:16.5px;color:var(--muted,#8a8a8a);line-height:1.6;max-width:48ch;margin:0 auto 14px')}>
            Un conseiller GBÔ AFRICA GROUP vous contactera rapidement afin de préparer votre premier bilan.
          </p>
          <div style={css('display:inline-flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-bottom:34px')}>
            <span style={css("padding:8px 14px;border-radius:20px;border:1px solid var(--border,rgba(255,255,255,.14));font-size:13px;font-weight:600;display:inline-flex;gap:7px;align-items:center")}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--lime,#C6F202)" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              E-mail de confirmation envoyé
            </span>
            <span style={css("padding:8px 14px;border-radius:20px;border:1px solid var(--border,rgba(255,255,255,.14));font-size:13px;font-weight:600;display:inline-flex;gap:7px;align-items:center")}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="var(--lime,#C6F202)">
                <path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.4A10 10 0 1012 2z" />
              </svg>
              WhatsApp de confirmation envoyé
            </span>
          </div>
          <div style={css('text-align:left;max-width:520px;margin:0 auto 34px;padding:24px;border-radius:18px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--glass,rgba(255,255,255,.02))')}>
            <div style={css('font-size:12px;letter-spacing:1px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:16px')}>Les prochaines étapes</div>
            {NEXT_STEPS.map((ns) => (
              <div key={ns.n} style={css('display:flex;gap:14px;padding:10px 0;border-bottom:1px solid var(--border,rgba(255,255,255,.06))')}>
                <div
                  style={css(
                    'width:26px;height:26px;flex:0 0 auto;border-radius:50%;border:1px solid var(--lime,#C6F202);color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700'
                  )}
                >
                  {ns.n}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14.5 }}>{ns.t}</div>
                  <div style={css('font-size:13px;color:var(--muted,#8a8a8a)')}>{ns.d}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={css('display:flex;gap:12px;justify-content:center;flex-wrap:wrap')}>
            <Link href="/" style={css('padding:15px 28px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700')}>
              Retour à l&apos;accueil
            </Link>
            <Link href="/admin" style={css('padding:15px 28px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.2));color:var(--fg,#fff);font-weight:700')}>
              Voir le prospect dans le CRM →
            </Link>
          </div>
        </div>
      )}

      {tStep >= 1 && tStep <= 4 && (
        <div style={{ marginBottom: 34 }}>
          <div style={css('display:flex;justify-content:space-between;align-items:center;margin-bottom:12px')}>
            <button onClick={goBack} style={css('font-size:14px;font-weight:600;color:var(--muted,#8a8a8a);display:inline-flex;align-items:center;gap:6px')}>
              ‹ Retour
            </button>
            <span style={css('font-size:13px;font-weight:700;color:var(--lime,#C6F202)')}>{stepLabel}</span>
          </div>
          <div style={css('height:6px;border-radius:6px;background:var(--surface2,#1a1a1a);overflow:hidden')}>
            <div style={{ height: '100%', width: progressPct, background: 'var(--lime,#C6F202)', borderRadius: 6, transition: 'width .4s' }} />
          </div>
        </div>
      )}

      {tStep === 1 && (
        <div style={{ animation: 'slideIn .35s both' }}>
          <h1 style={css("font-family:'Space Grotesk';font-weight:700;font-size:clamp(26px,4.5vw,36px);letter-spacing:-1px;margin-bottom:8px")}>Qui êtes-vous ?</h1>
          <p style={css('color:var(--muted,#8a8a8a);font-size:15.5px;margin-bottom:26px')}>Sélectionnez le profil qui vous correspond — la suite s&apos;adapte automatiquement.</p>
          <div style={css('display:grid;gap:12px')}>
            {PROFILE_CARDS.map((p) => (
              <button key={p.key} onClick={() => selectProfile(p.key)} style={css(chip(profile === p.key))}>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 4 }}>{p.label}</div>
                <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a);font-weight:400;line-height:1.5')}>{p.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {tStep === 2 && (
        <div style={{ animation: 'slideIn .35s both' }}>
          <h1 style={css("font-family:'Space Grotesk';font-weight:700;font-size:clamp(26px,4.5vw,36px);letter-spacing:-1px;margin-bottom:8px")}>Quel est votre objectif ?</h1>
          <p style={css('color:var(--muted,#8a8a8a);font-size:15.5px;margin-bottom:26px')}>
            Les objectifs proposés s&apos;adaptent à votre profil : <strong style={{ color: 'var(--fg,#fff)' }}>{profileLabel(profile) || '—'}</strong>.
          </p>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px')}>
            {objectiveOptions.map((o) => (
              <button key={o} onClick={() => selectObjective(o)} style={css(chip(objective === o))}>
                {o}
              </button>
            ))}
          </div>
          {objective === 'Autre' && (
            <input
              placeholder="Précisez votre objectif…"
              value={objOther}
              onChange={(e) => setObjOther(e.target.value)}
              style={css(
                'margin-top:14px;width:100%;padding:16px;border-radius:12px;border:1px solid var(--lime,#C6F202);background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:15px'
              )}
            />
          )}
        </div>
      )}

      {tStep === 3 && (
        <div style={{ animation: 'slideIn .35s both' }}>
          <h1 style={css("font-family:'Space Grotesk';font-weight:700;font-size:clamp(26px,4.5vw,36px);letter-spacing:-1px;margin-bottom:8px")}>Renforcez votre accompagnement</h1>
          <p style={css('color:var(--muted,#8a8a8a);font-size:15.5px;margin-bottom:26px')}>
            En complément de votre coaching sportif, bénéficiez d&apos;un suivi nutritionnel personnalisé assuré par un nutritionniste partenaire de GBÔ.
          </p>
          <div style={{ display: 'grid', gap: 12, marginBottom: 8 }}>
            <button onClick={() => selectNutrition('oui')} style={css(chip(nutrition === 'oui'))}>
              Oui, je souhaite ajouter un suivi nutritionnel.
            </button>
            <button onClick={() => selectNutrition('non')} style={css(chip(nutrition === 'non'))}>
              Non, uniquement un accompagnement sportif.
            </button>
          </div>
          {nutrition === 'oui' && (
            <div style={{ marginTop: 22, animation: 'fadeIn .3s both' }}>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12 }}>Quel est votre objectif nutritionnel ?</div>
              <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px')}>
                {NUTRITION_OBJECTIVES.map((o) => (
                  <button key={o} onClick={() => setNutritionObj(o)} style={css(chip(nutritionObj === o))}>
                    {o}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {tStep === 4 && (
        <form onSubmit={submitTunnel} style={{ animation: 'slideIn .35s both' }}>
          <h1 style={css("font-family:'Space Grotesk';font-weight:700;font-size:clamp(26px,4.5vw,36px);letter-spacing:-1px;margin-bottom:8px")}>Vos informations</h1>
          <p style={css('color:var(--muted,#8a8a8a);font-size:15.5px;margin-bottom:26px')}>Dernière étape — un conseiller vous recontacte rapidement.</p>
          <div style={css('display:grid;grid-template-columns:1fr 1fr;gap:12px')}>
            <label style={{ display: 'block' }}>
              <span style={labelStyle}>Prénom *</span>
              <input required name="prenom" style={fieldStyle} />
            </label>
            <label style={{ display: 'block' }}>
              <span style={labelStyle}>Nom *</span>
              <input required name="nom" style={fieldStyle} />
            </label>
            <label style={{ display: 'block' }}>
              <span style={labelStyle}>Téléphone / WhatsApp *</span>
              <input required name="tel" type="tel" placeholder="+225 07 00 00 00 00" style={fieldStyle} />
            </label>
            <label style={{ display: 'block' }}>
              <span style={labelStyle}>E-mail *</span>
              <input required name="email" type="email" style={fieldStyle} />
            </label>
            <label style={{ display: 'block', gridColumn: '1/-1' }}>
              <span style={labelStyle}>Commune / lieu souhaité</span>
              <input name="commune" placeholder="Cocody, Marcory, Plateau…" style={fieldStyle} />
            </label>
            <label style={{ display: 'block', gridColumn: '1/-1' }}>
              <span style={labelStyle}>Commentaires (disponibilités, précisions…)</span>
              <textarea name="comment" rows={3} style={{ ...fieldStyle, resize: 'vertical' }} />
            </label>
          </div>
          <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginTop: 18, cursor: 'pointer' }}>
            <input required type="checkbox" style={{ marginTop: 3, width: 18, height: 18, accentColor: '#C6F202', flex: '0 0 auto' }} />
            <span style={css('font-size:13.5px;color:var(--muted,#8a8a8a);line-height:1.5')}>
              J&apos;accepte que GBÔ AFRICA GROUP traite mes données personnelles afin de répondre à ma demande, conformément à la{' '}
              <Link href="/legal/privacy" style={{ color: 'var(--lime,#C6F202)' }}>
                politique de confidentialité
              </Link>
              .
            </span>
          </label>
          <button type="submit" style={css('margin-top:26px;width:100%;padding:17px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:16px')}>
            Envoyer ma demande
          </button>
        </form>
      )}

      {errorMsg && (
        <div style={css('margin-top:14px;padding:12px 16px;border-radius:10px;background:rgba(248,113,113,.1);border:1px solid rgba(248,113,113,.3);color:#f87171;font-size:13.5px')}>
          {errorMsg}
        </div>
      )}

      {tStep >= 1 && tStep <= 3 && (
        <button onClick={goNext} style={css('margin-top:30px;width:100%;padding:17px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:16px')}>
          Continuer ▸
        </button>
      )}
    </div>
  );
}
