'use client';

import { useState } from 'react';
import { css } from '../../lib/css.js';
import { useAppData } from '../../context/AppData.js';
import Honeypot from '../../components/Honeypot.js';
import { PARTNER_TYPES } from '../../data/content.js';

const fieldStyle = css(
  "padding:15px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.14));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:15px"
);

export default function PartnersPage() {
  const { showToast } = useAppData();
  const [submitting, setSubmitting] = useState(false);

  const submitPartner = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const f = new FormData(e.target);
    try {
      const res = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ org: f.get('org'), email: f.get('email'), msg: f.get('msg'), website: f.get('website') }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Une erreur est survenue, réessayez.');
        return;
      }
      e.target.reset();
      showToast('Demande de partenariat envoyée.');
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
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px')}>Partenaires</div>
          <h1 style={css("font-family:'Big Shoulders Display';font-weight:700;font-size:clamp(34px,6vw,60px);letter-spacing:-1.5px;max-width:16ch")}>Grandissons ensemble.</h1>
          <p style={css('font-size:clamp(16px,2.2vw,20px);color:var(--muted,#8a8a8a);max-width:58ch;margin-top:20px;line-height:1.5')}>
            Salles, marques, entreprises, institutions et professionnels de santé : construisons l&apos;écosystème du mouvement.
          </p>
        </div>
      </section>
      <section style={css('padding:clamp(20px,3vw,40px) clamp(20px,5vw,64px) clamp(40px,6vw,70px)')}>
        <div style={css('max-width:1000px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px')}>
          {PARTNER_TYPES.map((p) => (
            <div key={p.t} style={css('padding:26px;border-radius:18px;border:1px solid var(--border,rgba(255,255,255,.09))')}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{p.t}</div>
              <div style={css('font-size:14px;color:var(--muted,#8a8a8a);line-height:1.55')}>{p.d}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={css('padding:clamp(20px,3vw,40px) clamp(20px,5vw,64px) clamp(64px,9vw,110px)')}>
        <div
          style={css(
            'max-width:640px;margin:0 auto;padding:clamp(28px,4vw,44px);border-radius:24px;border:1px solid var(--border,rgba(255,255,255,.12));background:var(--surface,#0c0c0c)'
          )}
        >
          <h2 style={css("font-family:'Big Shoulders Display';font-weight:700;font-size:24px;margin-bottom:18px")}>Devenir partenaire</h2>
          <form onSubmit={submitPartner} style={{ display: 'grid', gap: 12 }}>
            <input required name="org" placeholder="Organisation *" style={fieldStyle} />
            <input required name="email" type="email" placeholder="E-mail *" style={fieldStyle} />
            <textarea name="msg" rows={3} placeholder="Votre proposition de partenariat" style={{ ...fieldStyle, resize: 'vertical' }} />
            <Honeypot />
            <button
              type="submit"
              disabled={submitting}
              style={css(`padding:16px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:16px;opacity:${submitting ? 0.6 : 1}`)}
            >
              {submitting ? 'Envoi…' : 'Envoyer'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
