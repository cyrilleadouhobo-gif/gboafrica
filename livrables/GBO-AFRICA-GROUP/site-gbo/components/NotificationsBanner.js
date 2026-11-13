'use client';

import { useEffect, useState } from 'react';
import { css } from '../lib/css.js';
import { formatSeanceDateTime } from '../lib/styleHelpers.js';

function CoachCard({ coach }) {
  return (
    <div style={css('display:flex;gap:10px;align-items:center;margin-top:8px;padding:10px;border-radius:10px;background:rgba(255,255,255,.04);min-width:0')}>
      {coach.photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={coach.photoUrl} alt={coach.nom} style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
      ) : (
        <div style={css('width:44px;height:44px;border-radius:10px;background:var(--lime,#C6F202);color:#000;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0')}>
          ✦
        </div>
      )}
      <div style={{ minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 13, overflowWrap: 'break-word' }}>{coach.nom}</div>
        {coach.spec && <div style={css('font-size:12px;color:var(--muted,#8a8a8a);overflow-wrap:break-word')}>{coach.spec}</div>}
        <div style={css('font-size:12px;color:var(--muted,#8a8a8a);overflow-wrap:break-word')}>
          {[coach.email, coach.phone].filter(Boolean).join(' · ')}
        </div>
      </div>
    </div>
  );
}

function ClientDossierCard({ dossier }) {
  const lignes = [
    dossier.objectif && ['Objectif', dossier.objectif],
    dossier.profil && dossier.profil !== '—' && ['Profil', dossier.profil],
    dossier.commune && dossier.commune !== '—' && ['Commune', dossier.commune],
    dossier.lieuPratique && ['Lieu de pratique', dossier.lieuPratique],
    dossier.disponibilites && ['Disponibilités', dossier.disponibilites],
    dossier.formule && ['Formule', `${dossier.formule}${dossier.seancesRestantes != null ? ` — ${dossier.seancesRestantes} séance(s) restante(s)` : ''}`],
    dossier.commentaire && ['Commentaire', dossier.commentaire],
  ].filter(Boolean);

  return (
    <div style={css('margin-top:8px;padding:10px;border-radius:10px;background:rgba(255,255,255,.04);min-width:0')}>
      <div style={{ fontWeight: 700, fontSize: 13, marginBottom: lignes.length ? 6 : 0, overflowWrap: 'break-word' }}>{dossier.nom}</div>
      {lignes.map(([label, valeur]) => (
        <div key={label} style={css('font-size:12px;color:var(--muted,#8a8a8a);overflow-wrap:break-word;margin-top:2px')}>
          <strong style={{ color: 'var(--fg,#fff)', fontWeight: 600 }}>{label} : </strong>
          {valeur}
        </div>
      ))}
    </div>
  );
}

function Texte({ n }) {
  const detail = n.detail ? JSON.parse(n.detail) : {};
  if (n.type === 'SEANCE_ANNULEE') {
    return <span style={css('font-size:13px;overflow-wrap:break-word')}>Séance du {formatSeanceDateTime(detail.datePrevue)} annulée{detail.motif ? ` — ${detail.motif}` : ''}.</span>;
  }
  if (n.type === 'SEANCE_REPORTEE') {
    return (
      <span style={css('font-size:13px;overflow-wrap:break-word')}>
        Séance du {formatSeanceDateTime(detail.ancienneDatePrevue)} reportée au {formatSeanceDateTime(detail.nouvelleDatePrevue)}{detail.motif ? ` — ${detail.motif}` : ''}.
      </span>
    );
  }
  if (n.type === 'SEANCE_ANNULEE_PAR_COACH') {
    return (
      <span style={css('font-size:13px;overflow-wrap:break-word')}>
        Votre séance du {formatSeanceDateTime(detail.datePrevue)} a été annulée par votre coach — {detail.motif}. Un nouveau coach vous sera attribué sous 1h.
      </span>
    );
  }
  if (n.type === 'SEANCE_COACH_PROPOSE') {
    return (
      <div style={{ minWidth: 0 }}>
        <span style={css('font-size:13px;overflow-wrap:break-word')}>
          Pour votre séance du {formatSeanceDateTime(detail.datePrevue)}, nous vous proposons ce nouveau coach :
        </span>
        {detail.nouveauCoach && <CoachCard coach={detail.nouveauCoach} />}
      </div>
    );
  }
  if (n.type === 'PROPOSITION_CLIENT') {
    return (
      <div style={{ minWidth: 0 }}>
        <span style={css('font-size:13px;overflow-wrap:break-word')}>
          Nouveau client proposé pour une séance le {formatSeanceDateTime(detail.datePrevue)}{detail.lieu ? ` · ${detail.lieu}` : ''}
          {detail.contenuPrevu ? ` — ${detail.contenuPrevu}` : ''}. Acceptez-vous ?
        </span>
        {detail.clientDossier && <ClientDossierCard dossier={detail.clientDossier} />}
      </div>
    );
  }
  if (n.type === 'CLIENT_A_REFUSE_VOUS') {
    return (
      <span style={css('font-size:13px;overflow-wrap:break-word')}>
        Le client a refusé votre affectation pour la séance du {formatSeanceDateTime(detail.datePrevue)} — motif : {detail.motif}.
      </span>
    );
  }
  return <span style={css('font-size:13px')}>{n.type}</span>;
}

// Types qui attendent une décision (Accepter/Refuser) plutôt qu'un simple "Compris".
const TYPES_AVEC_DECISION = ['PROPOSITION_CLIENT', 'SEANCE_COACH_PROPOSE'];
// Refuser une proposition côté client exige un motif (décision du 13/11/2026) ; côté coach, non.
const MOTIF_REQUIS_AU_REFUS = ['SEANCE_COACH_PROPOSE'];

function NotificationRow({ n, basePath, propositionsPath, onResolved }) {
  const [refus, setRefus] = useState(false);
  const [motif, setMotif] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const detail = n.detail ? JSON.parse(n.detail) : {};

  const marquerLue = async () => {
    try {
      await fetch(`${basePath}/${n.id}`, { method: 'PATCH' });
    } catch {
      // Pas grave si ça échoue : la notification réapparaîtra simplement au prochain chargement.
    }
  };

  const repondre = async (reponse) => {
    setSubmitting(true);
    setError('');
    try {
      const body = reponse === 'REFUSER' && MOTIF_REQUIS_AU_REFUS.includes(n.type) ? { reponse, motif } : { reponse };
      const res = await fetch(`${propositionsPath}/${detail.propositionId}/repondre`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Une erreur est survenue.');
        return;
      }
      await marquerLue();
      onResolved(n.id);
    } catch {
      setError('Connexion impossible. Vérifiez votre réseau et réessayez.');
    } finally {
      setSubmitting(false);
    }
  };

  const avecDecision = TYPES_AVEC_DECISION.includes(n.type);

  return (
    <div
      style={css('padding:13px 16px;border-radius:12px;border:1px solid rgba(198,242,2,.3);background:rgba(198,242,2,.06);display:flex;flex-direction:column;gap:10px')}
    >
      <div style={css('display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap')}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <Texte n={n} />
        </div>
        {!avecDecision && (
          <button
            type="button"
            onClick={async () => {
              await marquerLue();
              onResolved(n.id);
            }}
            style={css('flex-shrink:0;padding:6px 12px;border-radius:8px;border:1px solid var(--border,rgba(255,255,255,.2));color:var(--fg,#fff);font-size:12px;font-weight:600')}
          >
            Compris
          </button>
        )}
      </div>

      {avecDecision && !refus && (
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="button"
            disabled={submitting}
            onClick={() => repondre('ACCEPTER')}
            style={css(`padding:8px 14px;border-radius:9px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:12px;opacity:${submitting ? 0.6 : 1}`)}
          >
            Accepter
          </button>
          <button
            type="button"
            disabled={submitting}
            onClick={() => (MOTIF_REQUIS_AU_REFUS.includes(n.type) ? setRefus(true) : repondre('REFUSER'))}
            style={css('padding:8px 14px;border-radius:9px;border:1px solid rgba(248,113,113,.4);color:#f87171;font-weight:600;font-size:12px')}
          >
            Refuser
          </button>
        </div>
      )}

      {avecDecision && refus && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 8 }}>
          <textarea
            value={motif}
            onChange={(e) => setMotif(e.target.value)}
            placeholder="Motif du refus (obligatoire)"
            rows={2}
            style={css('padding:10px;border-radius:9px;border:1px solid var(--border,rgba(255,255,255,.16));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:13px;resize:vertical')}
          />
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              onClick={() => setRefus(false)}
              style={css('flex:1;padding:9px;border-radius:9px;border:1px solid var(--border,rgba(255,255,255,.16));color:var(--fg,#fff);font-weight:600;font-size:12px')}
            >
              Retour
            </button>
            <button
              type="button"
              disabled={submitting || !motif.trim()}
              onClick={() => repondre('REFUSER')}
              style={css(`flex:1;padding:9px;border-radius:9px;background:#f87171;color:#000;font-weight:700;font-size:12px;opacity:${submitting ? 0.6 : 1}`)}
            >
              {submitting ? 'Envoi…' : 'Confirmer le refus'}
            </button>
          </div>
        </div>
      )}

      {error && <div style={{ color: '#f87171', fontSize: 12 }}>{error}</div>}
    </div>
  );
}

// Les notifications EN_ATTENTE sont destinées à WhatsApp Business une fois son activation
// faite (lib/seanceAnnulation.js) ; en attendant, elles s'affichent ici et passent à 'LUE'
// une fois vues (ou traitées), pour ne pas être renvoyées en double plus tard par WhatsApp.
// propositionsPath pointe vers /api/client/propositions ou /api/coach/propositions — requis
// uniquement pour les types à décision (PROPOSITION_CLIENT, SEANCE_COACH_PROPOSE).
export default function NotificationsBanner({ basePath, propositionsPath }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch(basePath)
      .then((res) => res.json())
      .then((data) => setNotifications((data.notifications || []).filter((n) => n.statut === 'EN_ATTENTE')))
      .catch(() => {});
  }, [basePath]);

  const onResolved = (id) => setNotifications((prev) => prev.filter((n) => n.id !== id));

  if (notifications.length === 0) return null;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 8, marginBottom: 24 }}>
      {notifications.map((n) => (
        <NotificationRow key={n.id} n={n} basePath={basePath} propositionsPath={propositionsPath} onResolved={onResolved} />
      ))}
    </div>
  );
}
