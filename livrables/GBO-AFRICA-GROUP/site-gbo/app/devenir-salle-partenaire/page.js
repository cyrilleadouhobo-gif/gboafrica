'use client';

import { useState } from 'react';
import { css } from '../../lib/css.js';
import { chip } from '../../lib/styleHelpers.js';
import { useAppData } from '../../context/AppData.js';
import Honeypot from '../../components/Honeypot.js';
import { GYM_MANAGER_BENEFITS } from '../../data/content.js';
import { GYM_PARTNER_REASONS } from '../../lib/constants.js';

const fieldStyle = css(
  "width:100%;padding:15px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.14));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:15px"
);
const labelStyle = css('font-size:13px;font-weight:600;color:var(--muted,#8a8a8a);display:block;margin-bottom:6px');

export default function DevenirSallePartenairePage() {
  const { showToast } = useAppData();
  const [hasSoftware, setHasSoftware] = useState(null);
  const [reasons, setReasons] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const toggleReason = (r) => {
    setReasons((prev) => (prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!hasSoftware) {
      showToast('Merci de préciser si vous utilisez déjà un logiciel de gestion.');
      return;
    }
    setSubmitting(true);
    const f = new FormData(e.target);
    try {
      const res = await fetch('/api/gym-partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gymName: f.get('gymName'),
          managerName: f.get('managerName'),
          phone: f.get('phone'),
          whatsapp: f.get('whatsapp'),
          email: f.get('email'),
          commune: f.get('commune'),
          address: f.get('address'),
          memberCount: f.get('memberCount'),
          hasSoftware,
          reasons,
          website: f.get('website'),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Une erreur est survenue, réessayez.');
        return;
      }
      setDone(true);
    } catch {
      showToast('Connexion impossible. Réessayez.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <section style={css('padding:clamp(80px,10vw,120px) clamp(20px,5vw,64px) clamp(30px,4vw,50px);border-bottom:1px solid var(--border,rgba(255,255,255,.08))')}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px')}>
            GBÔ Partner Gym
          </div>
          <h1 style={css("font-family:'Braven';font-weight:700;font-size:clamp(30px,5.5vw,52px);letter-spacing:-1.5px;max-width:18ch")}>
            Vous êtes gérant d&apos;une salle de sport ?
          </h1>
          <p style={css('font-size:clamp(16px,2.2vw,20px);color:var(--muted,#8a8a8a);max-width:58ch;margin-top:20px;line-height:1.5')}>
            Et si votre salle faisait partie de l&apos;écosystème GBÔ ? Nous construisons un réseau de salles partenaires permettant aux acteurs
            du fitness de développer leur activité, de renforcer leur visibilité et d&apos;accéder à des solutions adaptées à leurs besoins.
          </p>
        </div>
      </section>

      <section style={css('padding:clamp(48px,7vw,80px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={css("font-family:'Big Shoulders Display';font-weight:700;font-size:26px;margin-bottom:22px")}>Ce que GBÔ vous apporte</h2>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px')}>
            {GYM_MANAGER_BENEFITS.map((b) => (
              <div key={b.n} style={css('padding:24px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.09))')}>
                <div
                  style={css(
                    "width:36px;height:36px;border-radius:10px;background:var(--lime,#C6F202);color:#000;display:flex;align-items:center;justify-content:center;font-family:'Big Shoulders Display';font-weight:700;margin-bottom:14px"
                  )}
                >
                  {b.n}
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{b.t}</div>
                <div style={css('font-size:14px;color:var(--muted,#8a8a8a);line-height:1.55')}>{b.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={css('padding:clamp(20px,3vw,40px) clamp(20px,5vw,64px) clamp(64px,9vw,110px)')}>
        <div
          style={css(
            'max-width:700px;margin:0 auto;padding:clamp(28px,4vw,44px);border-radius:24px;border:1px solid var(--border,rgba(255,255,255,.12));background:var(--surface,#0c0c0c)'
          )}
        >
          {done ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div
                style={css(
                  'width:72px;height:72px;border-radius:50%;background:var(--lime,#C6F202);color:#000;display:flex;align-items:center;justify-content:center;margin:0 auto 22px'
                )}
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 12l5 5L20 6" />
                </svg>
              </div>
              <h2 style={css("font-family:'Big Shoulders Display';font-weight:700;font-size:24px;margin-bottom:10px")}>Candidature envoyée.</h2>
              <p style={css('font-size:14.5px;color:var(--muted,#8a8a8a);line-height:1.55')}>
                Merci ! Un conseiller GBÔ étudie votre candidature et vous recontacte prochainement.
              </p>
            </div>
          ) : (
            <>
              <h2 style={css("font-family:'Big Shoulders Display';font-weight:700;font-size:24px;margin-bottom:18px")}>Devenir partenaire GBÔ</h2>
              <form onSubmit={submitForm} style={{ display: 'grid', gap: 12 }}>
                <label>
                  <span style={labelStyle}>Nom de la salle *</span>
                  <input required name="gymName" style={fieldStyle} />
                </label>
                <label>
                  <span style={labelStyle}>Nom du responsable *</span>
                  <input required name="managerName" style={fieldStyle} />
                </label>
                <div style={css('display:grid;grid-template-columns:1fr 1fr;gap:12px')}>
                  <label>
                    <span style={labelStyle}>Téléphone *</span>
                    <input required name="phone" type="tel" placeholder="+225 07 00 00 00 00" style={fieldStyle} />
                  </label>
                  <label>
                    <span style={labelStyle}>WhatsApp</span>
                    <input name="whatsapp" type="tel" style={fieldStyle} />
                  </label>
                </div>
                <label>
                  <span style={labelStyle}>Email *</span>
                  <input required name="email" type="email" style={fieldStyle} />
                </label>
                <div style={css('display:grid;grid-template-columns:1fr 1fr;gap:12px')}>
                  <label>
                    <span style={labelStyle}>Commune *</span>
                    <input required name="commune" style={fieldStyle} />
                  </label>
                  <label>
                    <span style={labelStyle}>Nombre approximatif d&apos;adhérents</span>
                    <input name="memberCount" style={fieldStyle} />
                  </label>
                </div>
                <label>
                  <span style={labelStyle}>Adresse *</span>
                  <input required name="address" style={fieldStyle} />
                </label>

                <div style={{ marginTop: 6 }}>
                  <span style={labelStyle}>Utilisez-vous déjà un logiciel de gestion ? *</span>
                  <div style={css('display:flex;gap:10px;margin-top:6px')}>
                    <button type="button" onClick={() => setHasSoftware('oui')} style={{ ...css(chip(hasSoftware === 'oui')), padding: '11px 18px', width: 'auto' }}>
                      Oui
                    </button>
                    <button type="button" onClick={() => setHasSoftware('non')} style={{ ...css(chip(hasSoftware === 'non')), padding: '11px 18px', width: 'auto' }}>
                      Non
                    </button>
                  </div>
                </div>

                <div style={{ marginTop: 6 }}>
                  <span style={labelStyle}>Pourquoi souhaitez-vous rejoindre GBÔ ?</span>
                  <div style={{ display: 'grid', gap: 8, marginTop: 6 }}>
                    {GYM_PARTNER_REASONS.map((r) => (
                      <label key={r} style={{ display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer', fontSize: 14 }}>
                        <input
                          type="checkbox"
                          checked={reasons.includes(r)}
                          onChange={() => toggleReason(r)}
                          style={{ width: 17, height: 17, accentColor: '#C6F202', flex: '0 0 auto' }}
                        />
                        {r}
                      </label>
                    ))}
                  </div>
                </div>

                <Honeypot />
                <button
                  type="submit"
                  disabled={submitting}
                  style={css(`margin-top:10px;padding:16px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:16px;opacity:${submitting ? 0.6 : 1}`)}
                >
                  {submitting ? 'Envoi…' : 'Devenir partenaire'}
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
