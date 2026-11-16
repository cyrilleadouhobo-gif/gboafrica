'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { css } from '../lib/css.js';

// RG04 — le coach peut corriger le texte d'un compte rendu déjà validé (ex: erreur de
// saisie), chaque correction étant tracée dans l'historique de la séance.
export default function CorrigerCompteRenduForm({ seanceId, initialContenu }) {
  const router = useRouter();
  const [contenu, setContenu] = useState(initialContenu);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch(`/api/coach/seances/${seanceId}/compte-rendu`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contenu }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Une erreur est survenue.');
        return;
      }
      setOpen(false);
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
        style={css('margin-top:8px;padding:7px 12px;border-radius:9px;border:1px solid var(--border,rgba(255,255,255,.16));color:var(--fg,#fff);font-weight:600;font-size:12px')}
      >
        Corriger le compte rendu
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 8, marginTop: 8 }}>
      <textarea
        required
        value={contenu}
        onChange={(e) => setContenu(e.target.value)}
        rows={3}
        style={css('padding:11px;border-radius:9px;border:1px solid var(--border,rgba(255,255,255,.16));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:13px;resize:vertical')}
      />
      {error && <div style={{ color: '#f87171', fontSize: 12 }}>{error}</div>}
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          type="button"
          onClick={() => setOpen(false)}
          style={css('flex:1;padding:10px;border-radius:9px;border:1px solid var(--border,rgba(255,255,255,.16));color:var(--fg,#fff);font-weight:600;font-size:12px')}
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={submitting}
          style={css(`flex:1;padding:10px;border-radius:9px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:12px;opacity:${submitting ? 0.6 : 1}`)}
        >
          {submitting ? 'Envoi…' : 'Confirmer la correction'}
        </button>
      </div>
    </form>
  );
}
