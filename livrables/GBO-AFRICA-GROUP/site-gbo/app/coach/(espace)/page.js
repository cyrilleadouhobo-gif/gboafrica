'use client';

import { useEffect, useState } from 'react';
import { css } from '../../../lib/css.js';
import { formatSeanceDateTime } from '../../../lib/styleHelpers.js';
import AnnulerReporterSeance from '../../../components/AnnulerReporterSeance.js';
import NotificationsBanner from '../../../components/NotificationsBanner.js';

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

function CompteRenduForm({ seance, onSubmitted }) {
  const [contenu, setContenu] = useState('');
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch(`/api/coach/seances/${seance.id}/compte-rendu`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contenu }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Une erreur est survenue.');
        return;
      }
      onSubmitted(seance.id, data.compteRendu);
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
        style={css('margin-top:8px;padding:9px 14px;border-radius:9px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:12.5px')}
      >
        Rédiger le compte rendu
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 10, marginTop: 10 }}>
      <textarea
        required
        value={contenu}
        onChange={(e) => setContenu(e.target.value)}
        placeholder="Ce qui s'est réellement passé pendant la séance"
        rows={3}
        style={css('padding:11px;border-radius:9px;border:1px solid var(--border,rgba(255,255,255,.16));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:13px;resize:vertical')}
      />
      <p style={css('color:var(--muted,#8a8a8a);font-size:11.5px;margin:-4px 0 0')}>
        Une fois envoyé, ce compte rendu ne peut plus être modifié et décompte la séance de l&apos;abonnement du client.
      </p>
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
          {submitting ? 'Envoi…' : 'Envoyer'}
        </button>
      </div>
    </form>
  );
}

// RG04 — le coach peut corriger le texte d'un compte rendu déjà validé (ex: erreur de
// saisie), chaque correction étant tracée dans l'historique de la séance.
function CorrigerCompteRenduForm({ seance, onCorrige }) {
  const [contenu, setContenu] = useState(seance.compteRendu.contenu);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch(`/api/coach/seances/${seance.id}/compte-rendu`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contenu }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Une erreur est survenue.');
        return;
      }
      onCorrige(seance.id, data.compteRendu);
      setOpen(false);
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

  const now = new Date();
  const upcoming = seances.filter((s) => s.statut !== 'ANNULEE' && s.statut !== 'EN_REATTRIBUTION' && new Date(s.datePrevue) >= now);
  const aDocumenter = seances.filter((s) => s.statut === 'PLANIFIEE' && new Date(s.datePrevue) < now && !s.compteRendu);
  const realisees = seances
    .filter((s) => s.statut === 'REALISEE' && s.compteRendu)
    .sort((a, b) => new Date(b.datePrevue) - new Date(a.datePrevue))
    .slice(0, 10);
  const annulees = seances
    .filter((s) => s.statut === 'ANNULEE')
    .sort((a, b) => new Date(b.updatedAt || b.datePrevue) - new Date(a.updatedAt || a.datePrevue))
    .slice(0, 5);

  const decrementerCompteurClient = (clientAccountId) => {
    setClients((prev) =>
      prev.map((c) =>
        c.clientAccountId === clientAccountId && c.abonnement
          ? { ...c, abonnement: { ...c.abonnement, seancesRestantes: Math.max(0, c.abonnement.seancesRestantes - 1) } }
          : c
      )
    );
  };

  const handleCompteRenduSubmitted = (seanceId, compteRendu) => {
    setSeances((prev) => prev.map((s) => (s.id === seanceId ? { ...s, statut: 'REALISEE', compteRendu } : s)));
    // Le compteur affiché dans "Mes clients" doit refléter le décompte immédiatement,
    // sans attendre un rechargement complet de la page.
    const documentedSeance = seances.find((s) => s.id === seanceId);
    if (documentedSeance) decrementerCompteurClient(documentedSeance.clientAccountId);
  };

  const handleCompteRenduCorrige = (seanceId, compteRendu) => {
    setSeances((prev) => prev.map((s) => (s.id === seanceId ? { ...s, compteRendu } : s)));
  };

  // Annulation côté coach : jamais décomptée, plus de réattribution automatique
  // (lib/seanceAnnulation.js) — la séance passe en attente d'un nouveau coach choisi
  // manuellement par l'admin et disparaît donc de la liste de ce coach.
  const handleAnnulerReporterDone = (seanceId) => {
    setSeances((prev) => prev.filter((s) => s.id !== seanceId));
  };

  return (
    <div>
      <h1 style={css("font-family:'Broaven';font-weight:700;font-size:28px;margin-bottom:8px")}>
        Bonjour{coach?.name ? ` ${coach.name}` : ''}
      </h1>
      <p style={css('color:var(--muted,#8a8a8a);font-size:14.5px;margin-bottom:28px')}>
        Vos clients et vos prochaines séances.
      </p>

      <NotificationsBanner basePath="/api/coach/notifications" propositionsPath="/api/coach/propositions" />

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

      {aDocumenter.length > 0 && (
        <>
          <h2 style={css('font-size:17px;font-weight:700;margin-bottom:14px')}>Séances à documenter</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 10, marginBottom: 32 }}>
            {aDocumenter.map((s) => (
              <div key={s.id} style={css('padding:16px;border-radius:12px;border:1px solid rgba(251,191,36,.35);background:var(--surface,#0c0c0c)')}>
                <div style={{ fontWeight: 700, marginBottom: 2, overflowWrap: 'break-word' }}>{s.clientAccount.lead.name}</div>
                <div style={css('color:var(--muted,#8a8a8a);font-size:13px;margin-bottom:4px')}>
                  {formatSeanceDateTime(s.datePrevue)}
                  {s.lieu ? ` · ${s.lieu}` : ''}
                </div>
                {s.contenuPrevu && <div style={css('font-size:13px')}>{s.contenuPrevu}</div>}
                <CompteRenduForm seance={s} onSubmitted={handleCompteRenduSubmitted} />
              </div>
            ))}
          </div>
        </>
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
              <AnnulerReporterSeance
                seanceId={s.id}
                datePrevue={s.datePrevue}
                basePath="/api/coach/seances"
                canReporter={false}
                onDone={(result) => handleAnnulerReporterDone(s.id, result)}
              />
            </div>
          ))}
        </div>
      )}

      {realisees.length > 0 && (
        <>
          <h2 style={css('font-size:17px;font-weight:700;margin:32px 0 14px')}>Séances réalisées récemment</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 10 }}>
            {realisees.map((s) => (
              <div key={s.id} style={css('padding:16px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c)')}>
                <div style={{ fontWeight: 700, marginBottom: 2, overflowWrap: 'break-word' }}>{s.clientAccount.lead.name}</div>
                <div style={css('color:var(--muted,#8a8a8a);font-size:13px;margin-bottom:6px')}>{formatSeanceDateTime(s.datePrevue)}</div>
                <div style={css('font-size:13px;overflow-wrap:break-word')}>
                  <span style={{ color: 'var(--muted,#8a8a8a)', fontWeight: 700 }}>Compte rendu : </span>
                  {s.compteRendu.contenu}
                </div>
                <CorrigerCompteRenduForm seance={s} onCorrige={handleCompteRenduCorrige} />
              </div>
            ))}
          </div>
        </>
      )}

      {annulees.length > 0 && (
        <>
          <h2 style={css('font-size:17px;font-weight:700;margin:32px 0 14px')}>Séances annulées récemment</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 10 }}>
            {annulees.map((s) => (
              <div key={s.id} style={css('padding:16px;border-radius:12px;border:1px solid rgba(248,113,113,.25);background:var(--surface,#0c0c0c);opacity:.85')}>
                <div style={{ fontWeight: 700, marginBottom: 2, overflowWrap: 'break-word' }}>{s.clientAccount.lead.name}</div>
                <div style={css('color:var(--muted,#8a8a8a);font-size:13px;margin-bottom:4px')}>{formatSeanceDateTime(s.datePrevue)}</div>
                <div style={css('font-size:12.5px;color:#f87171')}>
                  Annulée par {s.annulePar === 'CLIENT' ? 'le client' : 'vous'}
                  {s.decompteeMalgreAnnulation ? ' — décomptée du forfait' : ' — non décomptée'}
                </div>
                {s.motifAnnulation && <div style={css('font-size:12.5px;color:var(--muted,#8a8a8a);margin-top:4px')}>Motif : {s.motifAnnulation}</div>}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
