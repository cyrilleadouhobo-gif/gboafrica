'use client';

import { useState } from 'react';
import { css } from '../lib/css.js';
import { useAppData } from '../context/AppData.js';
import Honeypot from './Honeypot.js';

const fieldStyle = css(
  "padding:15px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.14));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:15px"
);

// Shared by /careers (generic jobs board) and /devenir-coach (dedicated coach pitch) —
// both post to the same /api/careers endpoint, which stores every submission as a
// Message (type CAREER) for the admin to review. No dedicated Coach-application table:
// a coach only becomes a Coach record once GBÔ actually onboards them.
export default function CoachApplicationForm({ jobTitle }) {
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
    <form onSubmit={submitCareer}>
      <div style={css('display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px')}>
        <input required name="nom" placeholder="Nom complet *" style={fieldStyle} />
        <input required name="tel" type="tel" placeholder="Téléphone *" style={fieldStyle} />
        <input required name="email" type="email" placeholder="E-mail *" style={fieldStyle} />
        <input name="spec" placeholder="Spécialité (ex. prénatal, senior…)" style={fieldStyle} />
        <textarea
          name="msg"
          rows={3}
          placeholder="Parlez-nous de vous, vos certifications, vos zones"
          defaultValue={jobTitle ? `Poste souhaité : ${jobTitle}\n` : undefined}
          style={{ ...fieldStyle, gridColumn: '1/-1', resize: 'vertical' }}
        />
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
  );
}
