'use client';

import { useEffect, useState } from 'react';
import { css } from '../lib/css.js';
import { formatSeanceDateTime } from '../lib/styleHelpers.js';

// Notifications admin — types produits par lib/seanceAnnulation.js et
// lib/seanceReattribution.js au fil du processus de réattribution manuelle (décision du
// 13/11/2026). Purement informatives : l'action elle-même (choisir un nouveau coach) se
// fait dans l'onglet Planning, sur la séance concernée (CoachPickerBlock).
function texte(n) {
  const detail = n.detail ? JSON.parse(n.detail) : {};
  if (n.type === 'SEANCE_ANNULEE_PAR_COACH') {
    return (
      <>
        <strong>{detail.ancienCoach?.nom}</strong> a annulé la séance du {formatSeanceDateTime(detail.datePrevue)} — {detail.motif}. Choisissez un nouveau coach dans l&apos;onglet Planning.
      </>
    );
  }
  if (n.type === 'COACH_A_REFUSE') {
    return (
      <>
        <strong>{detail.coachNom}</strong> a refusé l&apos;affectation pour la séance du {formatSeanceDateTime(detail.datePrevue)}. Choisissez un autre coach dans l&apos;onglet Planning.
      </>
    );
  }
  if (n.type === 'CLIENT_A_REFUSE') {
    return (
      <>
        Le client a refusé <strong>{detail.coachNom}</strong> pour la séance du {formatSeanceDateTime(detail.datePrevue)} — motif : {detail.motif}. Choisissez un autre coach dans l&apos;onglet Planning.
      </>
    );
  }
  return n.type;
}

export default function AdminNotificationsBanner() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch('/api/admin/notifications')
      .then((res) => res.json())
      .then((data) => setNotifications((data.notifications || []).filter((n) => n.statut === 'EN_ATTENTE')))
      .catch(() => {});
  }, []);

  const marquerLue = async (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    try {
      await fetch(`/api/admin/notifications/${id}`, { method: 'PATCH' });
    } catch {
      // Pas grave si ça échoue : la notification réapparaîtra simplement au prochain chargement.
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 8, marginBottom: 24 }}>
      {notifications.map((n) => (
        <div
          key={n.id}
          style={css('padding:14px 16px;border-radius:12px;border:1px solid rgba(251,191,36,.35);background:rgba(251,191,36,.06);display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap')}
        >
          <div style={{ minWidth: 0, flex: 1, fontSize: 13, overflowWrap: 'break-word' }}>{texte(n)}</div>
          <button
            type="button"
            onClick={() => marquerLue(n.id)}
            style={css('flex-shrink:0;padding:6px 12px;border-radius:8px;border:1px solid var(--border,rgba(255,255,255,.2));color:var(--fg,#fff);font-size:12px;font-weight:600')}
          >
            Compris
          </button>
        </div>
      ))}
    </div>
  );
}
