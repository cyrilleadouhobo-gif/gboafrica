'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { css } from '../../../../lib/css.js';
import { NUTRITION_FOLLOWUP_STATUSES, NUTRITION_FOLLOWUP_STATUS_LABELS } from '../../../../lib/constants.js';

const badge = (status) => {
  const map = {
    NOUVEAU: 'background:rgba(198,242,2,.14);color:var(--lime,#C6F202);border:1px solid rgba(198,242,2,.4)',
    EN_SUIVI: 'background:rgba(96,165,250,.14);color:#60a5fa;border:1px solid rgba(96,165,250,.4)',
    A_RELANCER: 'background:rgba(251,191,36,.14);color:#fbbf24;border:1px solid rgba(251,191,36,.4)',
    TERMINE: 'background:rgba(52,211,153,.14);color:#34d399;border:1px solid rgba(52,211,153,.4)',
  };
  return `display:inline-block;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;${map[status] || map.NOUVEAU}`;
};

export default function NutritionPartnerPage() {
  const router = useRouter();
  const [me, setMe] = useState(null);
  const [clients, setClients] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  // Draft is the single source of truth for the select + textarea of each row — editing
  // either only touches this local state. The save button is what sends status and notes
  // together in one PATCH, so the two fields can never race and overwrite each other.
  const [draft, setDraft] = useState({});
  const [savingId, setSavingId] = useState(null);

  const loadAll = useCallback(async () => {
    const [meRes, clientsRes, statsRes] = await Promise.all([
      fetch('/api/auth/me'),
      fetch('/api/partner/nutrition/clients'),
      fetch('/api/partner/nutrition/stats'),
    ]);
    if (meRes.status === 401) {
      router.replace('/partenaires/nutrition/login');
      return;
    }
    const meData = await meRes.json();
    const clientsData = await clientsRes.json();
    const statsData = await statsRes.json();
    setMe(meData.admin);
    setClients(clientsData.clients || []);
    setDraft(Object.fromEntries((clientsData.clients || []).map((c) => [c.id, { status: c.status, notes: c.notes || '' }])));
    setStats(statsData.stats);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const setDraftField = (id, field, value) => {
    setDraft((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };

  const save = async (id) => {
    const { status, notes } = draft[id];
    setSavingId(id);
    try {
      const res = await fetch(`/api/partner/nutrition/clients/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes }),
      });
      if (!res.ok) return;
      const { followUp } = await res.json();
      setClients((prev) => prev.map((c) => (c.id === id ? { ...c, status: followUp.status, notes: followUp.notes } : c)));
      const statsRes = await fetch('/api/partner/nutrition/stats');
      const statsData = await statsRes.json();
      setStats(statsData.stats);
    } finally {
      setSavingId(null);
    }
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/partenaires/nutrition/login');
  };

  if (loading) {
    return <div style={{ padding: 'clamp(24px,4vw,40px)', textAlign: 'center', color: 'var(--muted,#8a8a8a)' }}>Chargement…</div>;
  }

  const statCards = [
    { k: 'Clients suivis', v: stats.total, s: 'total transmis par GBÔ' },
    { k: 'Nouveaux', v: stats.nouveau, s: 'pas encore contactés' },
    { k: 'En suivi', v: stats.enSuivi, s: 'accompagnement en cours' },
    { k: 'À relancer', v: stats.aRelancer, s: 'nécessitent un rappel' },
    { k: 'Terminés', v: stats.termine, s: 'suivi clôturé' },
  ];

  return (
    <div style={{ padding: 'clamp(24px,4vw,40px) clamp(16px,4vw,48px) 90px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={css('display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:16px;margin-bottom:24px')}>
          <div>
            <div style={css('display:flex;align-items:center;gap:10px')}>
              <span style={css("font-family:'Broaven';font-weight:700;font-size:22px")}>Centre Médico Nutrition</span>
              <span
                style={css(
                  'padding:3px 10px;border-radius:8px;background:var(--surface2,#1a1a1a);font-size:11px;font-weight:700;letter-spacing:.5px;color:var(--muted,#8a8a8a);border:1px solid var(--border,rgba(255,255,255,.12))'
                )}
              >
                PARTENAIRE
              </span>
            </div>
            <div style={css('font-size:13px;color:var(--muted,#8a8a8a);margin-top:6px')}>Suivi des clients transmis par GBÔ AFRICA GROUP</div>
          </div>
          <div style={css('display:flex;align-items:center;gap:10px')}>
            <div style={{ fontSize: 13, textAlign: 'right' }}>{me?.email}</div>
            <button
              onClick={logout}
              style={css('padding:9px 16px;border-radius:10px;border:1px solid var(--border,rgba(255,255,255,.16));font-weight:700;font-size:13px;color:var(--fg,#fff)')}
            >
              Déconnexion
            </button>
          </div>
        </div>

        <div style={css('display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;margin-bottom:26px')}>
          {statCards.map((c) => (
            <div key={c.k} style={css('padding:22px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c)')}>
              <div style={css('font-size:12.5px;color:var(--muted,#8a8a8a);font-weight:600')}>{c.k}</div>
              <div style={css("font-family:'Broaven';font-weight:700;font-size:38px;line-height:1.1;margin:6px 0 2px")}>{c.v}</div>
              <div style={css('font-size:11.5px;color:var(--muted,#8a8a8a)')}>{c.s}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          {clients.length === 0 && (
            <div style={css('padding:32px;border-radius:16px;border:1px dashed var(--border,rgba(255,255,255,.18));color:var(--muted,#8a8a8a);text-align:center')}>
              Aucun client transmis pour le moment.
            </div>
          )}
          {clients.map((c) => (
            <div key={c.id} style={css('padding:20px 22px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c)')}>
              <div style={css('display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap')}>
                <div style={{ minWidth: 0 }}>
                  <div style={css('display:flex;align-items:center;gap:10px')}>
                    <span style={{ fontWeight: 700, fontSize: 16 }}>{c.lead.name}</span>
                    <span style={css(badge(c.status))}>{NUTRITION_FOLLOWUP_STATUS_LABELS[c.status]}</span>
                  </div>
                  <div style={css('font-size:13px;color:var(--muted,#8a8a8a);margin-top:6px')}>
                    {c.lead.contactEmail || '—'} · {c.lead.contactPhone || '—'}
                  </div>
                  {c.lead.nutritionObjective && (
                    <div style={css('font-size:13px;color:var(--lime,#C6F202);margin-top:6px;font-weight:600')}>Objectif : {c.lead.nutritionObjective}</div>
                  )}
                </div>
                <select
                  value={draft[c.id]?.status ?? c.status}
                  onChange={(e) => setDraftField(c.id, 'status', e.target.value)}
                  style={css(
                    'padding:10px 14px;border-radius:10px;border:1px solid var(--border,rgba(255,255,255,.16));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:13.5px;font-weight:600'
                  )}
                >
                  {NUTRITION_FOLLOWUP_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {NUTRITION_FOLLOWUP_STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
              </div>
              <div style={css('display:flex;gap:10px;margin-top:14px;align-items:flex-start')}>
                <textarea
                  rows={2}
                  placeholder="Notes de suivi (privées, visibles uniquement par vous)"
                  value={draft[c.id]?.notes ?? c.notes ?? ''}
                  onChange={(e) => setDraftField(c.id, 'notes', e.target.value)}
                  style={css(
                    'flex:1;padding:12px;border-radius:10px;border:1px solid var(--border,rgba(255,255,255,.14));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:13.5px;resize:vertical'
                  )}
                />
                <button
                  onClick={() => save(c.id)}
                  disabled={savingId === c.id}
                  style={css(
                    `padding:12px 18px;border-radius:10px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:13px;flex:0 0 auto;opacity:${savingId === c.id ? 0.6 : 1}`
                  )}
                >
                  {savingId === c.id ? 'Enregistrement…' : 'Enregistrer'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
