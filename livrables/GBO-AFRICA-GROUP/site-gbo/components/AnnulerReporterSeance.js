'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { css } from '../lib/css.js';
import { estDansLeDelai } from '../lib/seanceAnnulation.js';

function toLocalInputValue(date) {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

// RG06 — bouton partagé client/coach pour annuler (et, pour le client seulement) reporter
// une séance planifiée. basePath pointe vers /api/client/seances ou /api/coach/seances.
// canReporter=false côté coach (décision du 13/11/2026) : le coach ne peut qu'annuler — son
// annulation place la séance en attente (EN_REATTRIBUTION) et c'est l'admin qui choisit
// manuellement un nouveau coach côté serveur, voir lib/seanceReattribution.js.
export default function AnnulerReporterSeance({ seanceId, datePrevue, basePath, onDone, canReporter = true }) {
  const router = useRouter();
  const [mode, setMode] = useState(null); // null | 'annuler' | 'reporter'
  const [motif, setMotif] = useState('');
  const [nouvelleDate, setNouvelleDate] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const dansLeDelai = estDansLeDelai(datePrevue);

  const reset = () => {
    setMode(null);
    setMotif('');
    setNouvelleDate('');
    setError('');
  };

  const handleSubmit = async (action) => {
    setSubmitting(true);
    setError('');
    try {
      const body = action === 'annuler' ? { motif } : { motif, nouvelleDatePrevue: new Date(nouvelleDate).toISOString() };
      const res = await fetch(`${basePath}/${seanceId}/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Une erreur est survenue.');
        return;
      }
      const nouvelleDatePrevue = action === 'reporter' ? body.nouvelleDatePrevue : undefined;
      const motifEnvoye = motif;
      reset();
      if (onDone) {
        onDone({ action, nouvelleDatePrevue, motif: motifEnvoye, ...data });
      } else {
        router.refresh();
      }
    } catch {
      setError('Connexion impossible. Vérifiez votre réseau et réessayez.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ marginTop: 10 }}>
      <p style={css(`font-size:11.5px;color:${!canReporter || dansLeDelai ? 'var(--muted,#8a8a8a)' : '#fbbf24'};margin:0 0 8px`)}>
        {canReporter
          ? dansLeDelai
            ? "Annulation ou report possible jusqu'à 24h avant cette séance, sans que le forfait n'en soit affecté."
            : "Moins de 24h avant l'horaire prévu : le report n'est plus possible et une annulation sera décomptée du forfait."
          : "En cas d'annulation, le client sera notifié du motif. Un administrateur choisira ensuite manuellement un autre coach disponible sur ce créneau."}
      </p>

      {mode === null && (
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="button"
            onClick={() => setMode('annuler')}
            style={css('padding:8px 12px;border-radius:9px;border:1px solid rgba(248,113,113,.4);color:#f87171;font-weight:600;font-size:12px')}
          >
            Annuler la séance
          </button>
          {canReporter && dansLeDelai && (
            <button
              type="button"
              onClick={() => setMode('reporter')}
              style={css('padding:8px 12px;border-radius:9px;border:1px solid var(--border,rgba(255,255,255,.16));color:var(--fg,#fff);font-weight:600;font-size:12px')}
            >
              Reporter
            </button>
          )}
        </div>
      )}

      {mode && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 8 }}>
          {mode === 'reporter' && (
            <input
              type="datetime-local"
              value={nouvelleDate}
              min={toLocalInputValue(new Date())}
              onChange={(e) => setNouvelleDate(e.target.value)}
              style={css('padding:10px;border-radius:9px;border:1px solid var(--border,rgba(255,255,255,.16));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:13px;color-scheme:dark')}
            />
          )}
          <textarea
            value={motif}
            onChange={(e) => setMotif(e.target.value)}
            placeholder={mode === 'annuler' ? "Motif de l'annulation (obligatoire)" : 'Motif du report (obligatoire)'}
            rows={2}
            style={css('padding:10px;border-radius:9px;border:1px solid var(--border,rgba(255,255,255,.16));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:13px;resize:vertical')}
          />
          {error && <div style={{ color: '#f87171', fontSize: 12 }}>{error}</div>}
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              onClick={reset}
              style={css('flex:1;padding:10px;border-radius:9px;border:1px solid var(--border,rgba(255,255,255,.16));color:var(--fg,#fff);font-weight:600;font-size:12px')}
            >
              Retour
            </button>
            <button
              type="button"
              disabled={submitting || !motif.trim() || (mode === 'reporter' && !nouvelleDate)}
              onClick={() => handleSubmit(mode)}
              style={css(
                `flex:1;padding:10px;border-radius:9px;background:${mode === 'annuler' ? '#f87171' : 'var(--lime,#C6F202)'};color:#000;font-weight:700;font-size:12px;opacity:${submitting ? 0.6 : 1}`
              )}
            >
              {submitting ? 'Envoi…' : 'Confirmer'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
