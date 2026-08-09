'use client';

import { useState } from 'react';
import { css } from '../../lib/css.js';
import { useAppData } from '../../context/AppData.js';
import Honeypot from '../../components/Honeypot.js';
import { JOBS } from '../../data/content.js';

const fieldStyle = css(
  "padding:15px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.14));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:15px"
);

export default function CareersPage() {
  const { showToast } = useAppData();
  const [submitting, setSubmitting] = useState(false);

  const submitCareer = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const f = new FormData(e.target);
    try {
      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom: f.get('nom'), tel: f.get('tel'), email: f.get('email'), spec: f.get('spec'), msg: f.get('msg'), website: f.get('website') }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Une erreur est survenue, réessayez.');
        return;
      }
      e.target.reset();
      showToast('Candidature reçue. Merci de votre intérêt pour GBÔ.');
    } catch {
      showToast('Connexion impossible. Réessayez.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <section style={css('padding:clamp(80px,10vw,120px) clamp(20px,5vw,64px) clamp(30px,4vw,50px)')}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px')}>Carrières</div>
          <h1 style={css("font-family:'Big Shoulders Display';font-weight:700;font-size:clamp(34px,6vw,60px);letter-spacing:-1.5px;max-width:16ch")}>
            Construisez le mouvement avec nous.
          </h1>
          <p style={css('font-size:clamp(16px,2.2vw,20px);color:var(--muted,#8a8a8a);max-width:58ch;margin-top:20px;line-height:1.5')}>
            Rejoignez GBÔ en interne ou intégrez notre réseau de coachs partenaires certifiés.
          </p>
        </div>
      </section>
      <section style={css('padding:clamp(20px,3vw,40px) clamp(20px,5vw,64px) clamp(40px,6vw,70px)')}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gap: 12 }}>
          {JOBS.map((j) => (
            <div
              key={j.t}
              style={css('display:flex;justify-content:space-between;align-items:center;gap:16px;padding:22px 24px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.09));flex-wrap:wrap')}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{j.t}</div>
                <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a);margin-top:3px')}>
                  {j.loc} · {j.type}
                </div>
              </div>
              <a
                href="#apply"
                style={css('padding:11px 20px;border-radius:11px;border:1px solid var(--border,rgba(255,255,255,.2));font-weight:700;font-size:14px;color:var(--fg,#fff)')}
              >
                Postuler →
              </a>
            </div>
          ))}
        </div>
      </section>
      <section id="apply" style={css('padding:clamp(20px,3vw,40px) clamp(20px,5vw,64px) clamp(64px,9vw,110px)')}>
        <div
          style={css(
            'max-width:760px;margin:0 auto;padding:clamp(28px,4vw,44px);border-radius:24px;border:1px solid var(--border,rgba(255,255,255,.12));background:var(--surface,#0c0c0c)'
          )}
        >
          <div style={css('display:inline-block;padding:5px 12px;border-radius:20px;background:var(--lime,#C6F202);color:#000;font-size:12px;font-weight:700;margin-bottom:14px')}>
            Passerelle réseau
          </div>
          <h2 style={css("font-family:'Big Shoulders Display';font-weight:700;font-size:26px;margin-bottom:6px")}>Devenir coach GBÔ</h2>
          <p style={css('color:var(--muted,#8a8a8a);font-size:14.5px;margin-bottom:24px;line-height:1.5')}>Candidature spontanée — rejoignez le référentiel qualité GBÔ.</p>
          <form onSubmit={submitCareer}>
            <div style={css('display:grid;grid-template-columns:1fr 1fr;gap:12px')}>
              <input required name="nom" placeholder="Nom complet *" style={fieldStyle} />
              <input required name="tel" type="tel" placeholder="Téléphone *" style={fieldStyle} />
              <input required name="email" type="email" placeholder="E-mail *" style={fieldStyle} />
              <input name="spec" placeholder="Spécialité (ex. prénatal, senior…)" style={fieldStyle} />
              <textarea name="msg" rows={3} placeholder="Parlez-nous de vous" style={{ ...fieldStyle, gridColumn: '1/-1', resize: 'vertical' }} />
            </div>
            <Honeypot />
            <button
              type="submit"
              disabled={submitting}
              style={css(`margin-top:20px;width:100%;padding:16px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:16px;opacity:${submitting ? 0.6 : 1}`)}
            >
              {submitting ? 'Envoi…' : 'Envoyer ma candidature'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
