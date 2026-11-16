'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { css } from '../lib/css.js';

function toLocalInputValue(date) {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

// Planification d'une séance par le coach, pour un client donné — la page qui l'utilise
// est un Server Component, donc on rafraîchit via router.refresh() plutôt que de lever un
// state local au parent.
export default function PlanifierSeanceForm({ clientAccountId }) {
  const router = useRouter();
  const [date, setDate] = useState('');
  const [lieu, setLieu] = useState('');
  const [contenuPrevu, setContenuPrevu] = useState('');
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/coach/seances', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientAccountId, datePrevue: new Date(date).toISOString(), lieu, contenuPrevu }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Une erreur est survenue.');
        return;
      }
      setOpen(false);
      setDate('');
      setLieu('');
      setContenuPrevu('');
      router.refresh();
    } catch {
      setError('Connexion impossible. Vérifiez votre réseau et réessayez.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={css('width:100%;padding:10px 14px;border-radius:9px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:12.5px')}
      >
        Planifier une séance
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={css('margin-top:12px;padding:16px;border-radius:12px;background:var(--surface2,#161616);display:grid;grid-template-columns:minmax(0,1fr);gap:10px')}>
      <input
        required
        type="datetime-local"
        value={date}
        min={toLocalInputValue(new Date())}
        onChange={(e) => setDate(e.target.value)}
        style={css('padding:11px;border-radius:9px;border:1px solid var(--border,rgba(255,255,255,.16));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:13px')}
      />
      <input
        value={lieu}
        onChange={(e) => setLieu(e.target.value)}
        placeholder="Lieu (optionnel)"
        style={css('padding:11px;border-radius:9px;border:1px solid var(--border,rgba(255,255,255,.16));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:13px')}
      />
      <textarea
        value={contenuPrevu}
        onChange={(e) => setContenuPrevu(e.target.value)}
        placeholder="Contenu prévu — ce que vous comptez faire pendant la séance (visible par le client et l'admin)"
        rows={3}
        style={css('padding:11px;border-radius:9px;border:1px solid var(--border,rgba(255,255,255,.16));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:13px;resize:vertical')}
      />
      {error && <div style={{ color: '#f87171', fontSize: 12 }}>{error}</div>}
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          type="button"
          onClick={() => setOpen(false)}
          style={css('flex:1;padding:11px;border-radius:9px;border:1px solid var(--border,rgba(255,255,255,.16));color:var(--fg,#fff);font-weight:600;font-size:12.5px')}
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={submitting}
          style={css(`flex:1;padding:11px;border-radius:9px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:12.5px;opacity:${submitting ? 0.6 : 1}`)}
        >
          {submitting ? 'Création…' : 'Confirmer'}
        </button>
      </div>
    </form>
  );
}
