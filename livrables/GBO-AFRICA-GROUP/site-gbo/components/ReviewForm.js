'use client';

import { useState } from 'react';
import { css } from '../lib/css.js';
import { useAppData } from '../context/AppData.js';
import Honeypot from './Honeypot.js';

const fieldStyle = css(
  "padding:15px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.14));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:15px"
);

export default function ReviewForm() {
  const { showToast } = useAppData();
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const f = new FormData(e.target);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorName: f.get('authorName'),
          context: f.get('context'),
          rating,
          comment: f.get('comment'),
          website: f.get('website'),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Une erreur est survenue, réessayez.');
        return;
      }
      e.target.reset();
      setRating(5);
      setSent(true);
    } catch {
      showToast('Connexion impossible. Réessayez.');
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div style={css('padding:24px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.12));text-align:center')}>
        <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>Merci pour votre avis !</div>
        <div style={css('font-size:14px;color:var(--muted,#8a8a8a)')}>
          Il sera visible sur cette page après validation par l&apos;équipe GBÔ.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <div style={css('display:flex;gap:6px;margin-bottom:14px')}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setRating(n)}
            aria-label={`${n} étoile${n > 1 ? 's' : ''}`}
            style={css(`font-size:26px;line-height:1;color:${n <= rating ? 'var(--lime,#C6F202)' : 'var(--border,rgba(255,255,255,.2))'}`)}
          >
            ★
          </button>
        ))}
      </div>
      <div style={css('display:grid;grid-template-columns:1fr 1fr;gap:12px')}>
        <input required name="authorName" placeholder="Votre nom *" maxLength={80} style={fieldStyle} />
        <input name="context" placeholder="Ex. Membre · Cocody" maxLength={80} style={fieldStyle} />
        <textarea
          required
          name="comment"
          rows={4}
          maxLength={1000}
          placeholder="Votre expérience avec GBÔ…"
          style={{ ...fieldStyle, gridColumn: '1/-1', resize: 'vertical' }}
        />
      </div>
      <Honeypot />
      <button
        type="submit"
        disabled={submitting}
        style={css(`margin-top:16px;width:100%;padding:16px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:16px;opacity:${submitting ? 0.6 : 1}`)}
      >
        {submitting ? 'Envoi…' : 'Publier mon avis'}
      </button>
    </form>
  );
}
