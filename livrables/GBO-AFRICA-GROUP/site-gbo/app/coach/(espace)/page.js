'use client';

import { useEffect, useState } from 'react';
import { css } from '../../../lib/css.js';
import { formatSeanceDateTime } from '../../../lib/styleHelpers.js';

function toLocalInputValue(date) {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

function PlanifierForm({ client, onCreated }) {
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
        body: JSON.stringify({ clientAccountId: client.clientAccountId, datePrevue: new Date(date).toISOString(), lieu, contenuPrevu }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Une erreur est survenue.');
        return;
      }
      onCreated(data.seance);
      setOpen(false);
      setDate('');
      setLieu('');
      setContenuPrevu('');
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
        style={css('padding:9px 14px;border-radius:9px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:12.5px')}
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

export default function CoachSpacePage() {
  const [coach, setCoach] = useState(null);
  const [clients, setClients] = useState([]);
  const [seances, setSeances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [meRes, clientsRes, seancesRes] = await Promise.all([
        fetch('/api/auth/coach/me'),
        fetch('/api/coach/clients'),
        fetch('/api/coach/seances'),
      ]);
      const [meData, clientsData, seancesData] = await Promise.all([meRes.json(), clientsRes.json(), seancesRes.json()]);
      setCoach(meData.coach);
      setClients(clientsData.clients || []);
      setSeances(seancesData.seances || []);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: 40, color: 'var(--muted,#8a8a8a)' }}>Chargement…</div>;
  }

  const upcoming = seances.filter((s) => s.statut !== 'ANNULEE' && new Date(s.datePrevue) >= new Date());

  return (
    <div>
      <h1 style={css("font-family:'Broaven';font-weight:700;font-size:28px;margin-bottom:8px")}>
        Bonjour{coach?.name ? ` ${coach.name}` : ''}
      </h1>
      <p style={css('color:var(--muted,#8a8a8a);font-size:14.5px;margin-bottom:28px')}>
        Vos clients et vos prochaines séances.
      </p>

      <h2 style={css('font-size:17px;font-weight:700;margin-bottom:14px')}>Mes clients</h2>
      {clients.length === 0 ? (
        <p style={css('color:var(--muted,#8a8a8a);font-size:13.5px;margin-bottom:28px')}>Aucun client ne vous est attribué pour le moment.</p>
      ) : (
        <div style={css('display:grid;grid-template-columns:minmax(0,1fr);gap:12px;margin-bottom:32px')}>
          {clients.map((c) => (
            <div key={c.clientAccountId} style={css('padding:18px;border-radius:14px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c)')}>
              <div style={{ fontWeight: 700, marginBottom: 4, overflowWrap: 'break-word' }}>{c.leadName}</div>
              {c.abonnement ? (
                <div style={css('color:var(--muted,#8a8a8a);font-size:13px;margin-bottom:10px')}>
                  {c.abonnement.formule.nom} — {c.abonnement.seancesRestantes} séance{c.abonnement.seancesRestantes > 1 ? 's' : ''} restante{c.abonnement.seancesRestantes > 1 ? 's' : ''}
                </div>
              ) : (
                <div style={css('color:var(--muted,#8a8a8a);font-size:13px;margin-bottom:10px')}>Aucun abonnement actif</div>
              )}
              {c.abonnement && c.abonnement.seancesRestantes > 0 && (
                <PlanifierForm client={c} onCreated={(seance) => setSeances((prev) => [...prev, seance])} />
              )}
            </div>
          ))}
        </div>
      )}

      <h2 style={css('font-size:17px;font-weight:700;margin-bottom:14px')}>Séances à venir</h2>
      {upcoming.length === 0 ? (
        <p style={css('color:var(--muted,#8a8a8a);font-size:13.5px')}>Aucune séance planifiée.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 10 }}>
          {upcoming.map((s) => (
            <div key={s.id} style={css('padding:16px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c)')}>
              <div style={{ fontWeight: 700, marginBottom: 2, overflowWrap: 'break-word' }}>{s.clientAccount.lead.name}</div>
              <div style={css('color:var(--muted,#8a8a8a);font-size:13px;margin-bottom:4px')}>
                {formatSeanceDateTime(s.datePrevue)}
                {s.lieu ? ` · ${s.lieu}` : ''}
              </div>
              {s.contenuPrevu && <div style={css('font-size:13px')}>{s.contenuPrevu}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
