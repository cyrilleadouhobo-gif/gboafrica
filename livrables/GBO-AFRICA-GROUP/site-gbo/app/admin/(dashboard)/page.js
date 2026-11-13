'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { css } from '../../../lib/css.js';
import { leadBadge, tabStyle, formatSeanceDateTime } from '../../../lib/styleHelpers.js';
import { LEAD_STATUSES, LEAD_STATUS_LABELS, LEAD_TYPES, LEAD_TYPE_LABELS, REVIEW_STATUS_LABELS, PRACTICE_LOCATION_LABELS, GYM_PARTNER_STATUS_LABELS } from '../../../lib/constants.js';
import AdminNotificationsBanner from '../../../components/AdminNotificationsBanner.js';

const FILTERS = ['Tous', ...LEAD_TYPES];
const SEANCE_FILTERS = ['Toutes', 'PLANIFIEE', 'REALISEE', 'ANNULEE', 'EN_REATTRIBUTION'];
const SEANCE_FILTER_LABELS = { Toutes: 'Toutes', PLANIFIEE: 'Planifiées', REALISEE: 'Réalisées', ANNULEE: 'Annulées', EN_REATTRIBUTION: 'En réattribution' };

export default function AdminPage() {
  const router = useRouter();
  const [me, setMe] = useState(null);
  const [adminTab, setAdminTab] = useState('dashboard');
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [adminFilter, setAdminFilter] = useState('Tous');
  const [seanceFilter, setSeanceFilter] = useState('Toutes');

  const [leads, setLeads] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [gymPartners, setGymPartners] = useState([]);
  const [formules, setFormules] = useState([]);
  const [seances, setSeances] = useState([]);
  const [stats, setStats] = useState(null);
  const [funnel, setFunnel] = useState([]);
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const loadAll = useCallback(async () => {
    setLoadError(null);
    try {
      const [meRes, leadsRes, coachesRes, statsRes, reviewsRes, gymPartnersRes, formulesRes, seancesRes] = await Promise.all([
        fetch('/api/auth/me'),
        fetch('/api/admin/leads'),
        fetch('/api/admin/coaches'),
        fetch('/api/admin/stats'),
        fetch('/api/admin/reviews'),
        fetch('/api/admin/gym-partners'),
        fetch('/api/admin/formules'),
        fetch('/api/admin/seances'),
      ]);

      if (meRes.status === 401) {
        router.replace('/admin/login');
        return;
      }

      for (const res of [meRes, leadsRes, coachesRes, statsRes, reviewsRes, gymPartnersRes, formulesRes, seancesRes]) {
        if (!res.ok) throw new Error(`${res.url} a répondu ${res.status}`);
      }

      const [meData, leadsData, coachesData, statsData, reviewsData, gymPartnersData, formulesData, seancesData] = await Promise.all([
        meRes.json(),
        leadsRes.json(),
        coachesRes.json(),
        statsRes.json(),
        reviewsRes.json(),
        gymPartnersRes.json(),
        formulesRes.json(),
        seancesRes.json(),
      ]);

      setMe(meData.admin);
      setLeads(leadsData.leads || []);
      setCoaches(coachesData.coaches || []);
      setStats(statsData.stats);
      setFunnel(statsData.funnel || []);
      setRecentLeads(statsData.recent || []);
      setReviews(reviewsData.reviews || []);
      setGymPartners(gymPartnersData.gymPartners || []);
      setFormules(formulesData.formules || []);
      setSeances(seancesData.seances || []);
      setLoading(false);
    } catch (err) {
      // Sans ce catch, un seul des appels qui échoue (coupure réseau, Turso qui met du
      // temps à répondre...) laissait loading bloqué à true pour toujours : écran
      // "Chargement…" infini, sans aucune indication de ce qui s'est passé.
      setLoadError(err.message || 'Une erreur est survenue.');
    }
  }, [router]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  if (loadError) {
    return (
      <div style={{ padding: 'clamp(24px,4vw,40px)', textAlign: 'center' }}>
        <div style={{ color: 'var(--muted,#8a8a8a)', marginBottom: 14 }}>Impossible de charger le tableau de bord ({loadError}).</div>
        <button
          type="button"
          onClick={loadAll}
          className="btn-cta"
          style={css('padding:12px 24px;border-radius:10px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:14px')}
        >
          Réessayer
        </button>
      </div>
    );
  }

  const advanceStatus = async (id, direction) => {
    const res = await fetch(`/api/admin/leads/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ direction }),
    });
    if (!res.ok) return;
    const { lead } = await res.json();
    setLeads((prev) => prev.map((l) => (l.id === id ? lead : l)));
  };

  const assignCoach = async (id, coachId) => {
    const res = await fetch(`/api/admin/leads/${id}/coach`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ coachId: Number(coachId) }),
    });
    if (!res.ok) return;
    const { lead } = await res.json();
    setLeads((prev) => prev.map((l) => (l.id === id ? lead : l)));
  };

  const endRelation = async (id) => {
    const res = await fetch(`/api/admin/leads/${id}/relation-end`, { method: 'POST' });
    if (!res.ok) return;
    const { lead } = await res.json();
    setLeads((prev) => prev.map((l) => (l.id === id ? lead : l)));
  };

  const transmitToNutritionPartner = async (id) => {
    const res = await fetch(`/api/admin/leads/${id}/nutrition-handoff`, { method: 'POST' });
    if (!res.ok) return;
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, nutritionFollowUp: { status: 'NOUVEAU' } } : l)));
  };

  const advanceGymPartnerStatus = async (id, direction) => {
    const res = await fetch(`/api/admin/gym-partners/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ direction }),
    });
    if (!res.ok) return;
    const { gymPartner } = await res.json();
    setGymPartners((prev) => prev.map((g) => (g.id === id ? gymPartner : g)));
  };

  const toggleFormuleStatus = async (id, actif) => {
    const res = await fetch(`/api/admin/formules/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ actif }),
    });
    if (!res.ok) return;
    const { formule } = await res.json();
    setFormules((prev) => prev.map((f) => (f.id === id ? formule : f)));
  };

  const moderateReview = async (id, status) => {
    const res = await fetch(`/api/admin/reviews/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) return;
    const { review } = await res.json();
    setReviews((prev) => prev.map((r) => (r.id === id ? review : r)));
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/admin/login');
  };

  if (loading) {
    return (
      <div style={{ padding: 'clamp(24px,4vw,40px)', textAlign: 'center', color: 'var(--muted,#8a8a8a)' }}>Chargement…</div>
    );
  }

  const statCards = [
    { k: 'Prospects totaux', v: stats.total, s: 'toutes sources' },
    { k: 'À traiter', v: stats.nouveau, s: 'Nouveau + À contacter' },
    { k: 'En qualification', v: stats.qualifie, s: 'Qualifié + Coach attribué' },
    { k: 'Clients', v: stats.client, s: 'convertis' },
    { k: 'Entreprises', v: stats.entreprise, s: 'segment corporate' },
    { k: "Liste d'attente", v: stats.waitlist, s: 'pôles en pré-lancement' },
  ];

  const funnelWithPct = (() => {
    const mx = Math.max(1, ...funnel.map((f) => f.n));
    return funnel.map((f) => ({ ...f, pct: Math.round((f.n / mx) * 100) + '%' }));
  })();

  const leadRows = leads.filter((l) => adminFilter === 'Tous' || l.type === adminFilter);
  const selectedLead = selectedLeadId ? leads.find((l) => l.id === selectedLeadId) : null;
  const pendingReviews = reviews.filter((r) => r.status === 'PENDING');

  return (
    <div style={{ padding: 'clamp(24px,4vw,40px) clamp(16px,4vw,48px) 90px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={css('display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:16px;margin-bottom:24px')}>
          <div>
            <div style={css('display:flex;align-items:center;gap:10px')}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-full.png" alt="GBÔ — Plus qu'une pratique, un style de vie" width={61} height={22} style={{ height: 22, width: 'auto' }} />
              <span
                style={css(
                  'padding:3px 10px;border-radius:8px;background:var(--surface2,#1a1a1a);font-size:11px;font-weight:700;letter-spacing:.5px;color:var(--muted,#8a8a8a);border:1px solid var(--border,rgba(255,255,255,.12))'
                )}
              >
                BACK-OFFICE
              </span>
            </div>
            <div style={css('font-size:13px;color:var(--muted,#8a8a8a);margin-top:6px')}>Pilotage prospects · coachs · exploitation</div>
          </div>
          <div style={css('display:flex;align-items:center;gap:10px')}>
            <div style={{ fontSize: 13, textAlign: 'right' }}>
              <div style={{ fontWeight: 700 }}>{me?.email}</div>
              <div style={css('color:var(--muted,#8a8a8a);font-size:11.5px')}>{me?.role}</div>
            </div>
            <button
              onClick={logout}
              style={css('padding:9px 16px;border-radius:10px;border:1px solid var(--border,rgba(255,255,255,.16));font-weight:700;font-size:13px;color:var(--fg,#fff)')}
            >
              Déconnexion
            </button>
          </div>
        </div>

        <AdminNotificationsBanner />

        <div
          style={css(
            'display:flex;gap:6px;padding:6px;border-radius:14px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c);width:max-content;max-width:100%;overflow:auto;margin-bottom:26px'
          )}
        >
          <button onClick={() => setAdminTab('dashboard')} style={css(tabStyle(adminTab === 'dashboard'))}>
            Tableau de bord
          </button>
          <button onClick={() => setAdminTab('leads')} style={css(tabStyle(adminTab === 'leads'))}>
            Prospects / CRM
          </button>
          <button onClick={() => setAdminTab('coaches')} style={css(tabStyle(adminTab === 'coaches'))}>
            Coachs
          </button>
          <button onClick={() => setAdminTab('gym-partners')} style={css(tabStyle(adminTab === 'gym-partners'))}>
            Salles partenaires
          </button>
          <button onClick={() => setAdminTab('formules')} style={css(tabStyle(adminTab === 'formules'))}>
            Formules
          </button>
          <button onClick={() => setAdminTab('seances')} style={css(tabStyle(adminTab === 'seances'))}>
            Planning
          </button>
          <button onClick={() => setAdminTab('reviews')} style={css(tabStyle(adminTab === 'reviews'))}>
            Avis {pendingReviews.length > 0 && `(${pendingReviews.length})`}
          </button>
        </div>

        {adminTab === 'dashboard' && (
          <div>
            <div style={css('display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;margin-bottom:22px')}>
              {statCards.map((c) => (
                <div key={c.k} style={css('padding:22px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c)')}>
                  <div style={css('font-size:12.5px;color:var(--muted,#8a8a8a);font-weight:600')}>{c.k}</div>
                  <div style={css("font-family:'Broaven';font-weight:700;font-size:38px;line-height:1.1;margin:6px 0 2px")}>{c.v}</div>
                  <div style={css('font-size:11.5px;color:var(--muted,#8a8a8a)')}>{c.s}</div>
                </div>
              ))}
            </div>
            <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:12px')}>
              <div style={css('padding:24px;border-radius:18px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c)')}>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 18 }}>Entonnoir de conversion</div>
                <div style={{ display: 'grid', gap: 12 }}>
                  {funnelWithPct.map((f) => (
                    <div key={f.status}>
                      <div style={css('display:flex;justify-content:space-between;font-size:13px;margin-bottom:5px')}>
                        <span style={{ fontWeight: 600 }}>{LEAD_STATUS_LABELS[f.status]}</span>
                        <span style={css('color:var(--muted,#8a8a8a);font-weight:700')}>{f.n}</span>
                      </div>
                      <div style={css('height:9px;border-radius:6px;background:var(--surface2,#1a1a1a);overflow:hidden')}>
                        <div style={{ height: '100%', width: f.pct, background: 'var(--lime,#C6F202)', borderRadius: 6, minWidth: 6, transition: 'width .5s' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={css('padding:24px;border-radius:18px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c)')}>
                <div style={css('display:flex;justify-content:space-between;align-items:center;margin-bottom:16px')}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>Derniers prospects</div>
                  <button onClick={() => setAdminTab('leads')} style={css('font-size:13px;font-weight:700;color:var(--lime,#C6F202)')}>
                    Tout voir →
                  </button>
                </div>
                <div style={{ display: 'grid', gap: 8 }}>
                  {recentLeads.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => setSelectedLeadId(l.id)}
                      style={css('display:flex;justify-content:space-between;align-items:center;gap:10px;padding:12px 14px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.08));text-align:left')}
                    >
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.name}</div>
                        <div style={css('font-size:12px;color:var(--muted,#8a8a8a)')}>{l.objective}</div>
                      </div>
                      <span style={css(leadBadge(l.status))}>{LEAD_STATUS_LABELS[l.status]}</span>
                    </button>
                  ))}
                  {recentLeads.length === 0 && <div style={css('color:var(--muted,#8a8a8a);font-size:13px')}>Aucun prospect pour le moment.</div>}
                </div>
              </div>
            </div>
          </div>
        )}

        {adminTab === 'leads' && (
          <div>
            <div style={css('display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px')}>
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setAdminFilter(f)}
                  style={css(
                    `padding:8px 15px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;border:1px solid ${
                      adminFilter === f ? 'var(--lime,#C6F202)' : 'var(--border,rgba(255,255,255,.14))'
                    };color:${adminFilter === f ? 'var(--lime,#C6F202)' : 'var(--muted,#8a8a8a)'};background:${adminFilter === f ? 'rgba(198,242,2,.1)' : 'transparent'}`
                  )}
                >
                  {f === 'Tous' ? 'Tous' : LEAD_TYPE_LABELS[f]}
                </button>
              ))}
            </div>
            <div style={css('border-radius:18px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c);overflow:hidden')}>
              <div
                style={css(
                  'display:grid;grid-template-columns:1.4fr 1.4fr 1fr .8fr 1fr;gap:10px;padding:14px 18px;border-bottom:1px solid var(--border,rgba(255,255,255,.1));font-size:11.5px;letter-spacing:.5px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:700'
                )}
                data-hidemobile=""
              >
                <span>Prospect</span>
                <span>Objectif</span>
                <span>Source</span>
                <span>Coach</span>
                <span>Statut</span>
              </div>
              {leadRows.map((l) => (
                <button
                  key={l.id}
                  data-leadrow=""
                  onClick={() => setSelectedLeadId(l.id)}
                  style={css(
                    'display:grid;grid-template-columns:1.4fr 1.4fr 1fr .8fr 1fr;gap:10px;padding:16px 18px;border-bottom:1px solid var(--border,rgba(255,255,255,.06));text-align:left;width:100%;align-items:center'
                  )}
                >
                  <span style={{ minWidth: 0 }}>
                    <span style={css('display:flex;align-items:center;gap:6px')}>
                      <span style={{ fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.name}</span>
                      {l.nutrition && (
                        <span
                          title={l.nutritionFollowUp ? 'Nutrition — transmis au partenaire' : 'Nutrition — à transmettre'}
                          style={css(
                            `flex:0 0 auto;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700;${
                              l.nutritionFollowUp
                                ? 'background:rgba(52,211,153,.14);color:#34d399'
                                : 'background:rgba(198,242,2,.14);color:var(--lime,#C6F202)'
                            }`
                          )}
                        >
                          Nutrition
                        </span>
                      )}
                    </span>
                    <span style={css('font-size:12px;color:var(--muted,#8a8a8a)')}>
                      {l.code} · {l.commune} · {new Date(l.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </span>
                  <span data-col-hide="" style={{ fontSize: 13.5, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {l.objective}
                  </span>
                  <span data-col-hide="" style={css('font-size:12.5px;color:var(--muted,#8a8a8a)')}>
                    {l.source}
                  </span>
                  <span data-col-hide="" style={css('font-size:12.5px;color:var(--muted,#8a8a8a)')}>
                    {l.coach?.name || '—'}
                  </span>
                  <span>
                    <span style={css(leadBadge(l.status))}>{LEAD_STATUS_LABELS[l.status]}</span>
                  </span>
                </button>
              ))}
              {leadRows.length === 0 && <div style={{ padding: 24, textAlign: 'center', color: 'var(--muted,#8a8a8a)' }}>Aucun prospect dans ce filtre.</div>}
            </div>
          </div>
        )}

        {adminTab === 'coaches' && (
          <div style={css('display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px')}>
            {coaches.map((c) => (
              <div key={c.id} style={css('padding:24px;border-radius:18px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c)')}>
                <div style={css('display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px')}>
                  <div style={css('display:flex;gap:12px;align-items:center')}>
                    <span
                      style={css(
                        'width:44px;height:44px;border-radius:12px;background:var(--lime,#C6F202);color:#000;display:flex;align-items:center;justify-content:center;font-weight:700'
                      )}
                    >
                      ✦
                    </span>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{c.name}</div>
                  </div>
                </div>
                <div style={css('font-size:13px;color:var(--muted,#8a8a8a);line-height:1.6')}>
                  <div>
                    <strong style={{ color: 'var(--fg,#fff)', fontWeight: 600 }}>Spécialités :</strong> {c.spec}
                  </div>
                  <div>
                    <strong style={{ color: 'var(--fg,#fff)', fontWeight: 600 }}>Zones :</strong> {c.zones}
                  </div>
                  <div>
                    <strong style={{ color: 'var(--fg,#fff)', fontWeight: 600 }}>Clients actifs :</strong> {c.clients}
                  </div>
                </div>
                <div style={{ marginTop: 14 }}>
                  <span
                    style={css(
                      c.dispo === 'DISPONIBLE'
                        ? 'display:inline-block;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;background:rgba(52,211,153,.15);color:#34d399;border:1px solid rgba(52,211,153,.4)'
                        : 'display:inline-block;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;background:var(--surface2,#222);color:var(--muted,#8a8a8a);border:1px solid var(--border,rgba(255,255,255,.14))'
                    )}
                  >
                    {c.dispo === 'DISPONIBLE' ? 'Disponible' : 'Complet'}
                  </span>
                </div>
                <div style={css('margin-top:16px;padding-top:16px;border-top:1px solid var(--border,rgba(255,255,255,.1))')}>
                  <div style={css('font-size:11px;letter-spacing:.5px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:700;margin-bottom:10px')}>
                    Contact
                  </div>
                  <CoachContactBlock coach={c} onUpdated={(updated) => setCoaches((prev) => prev.map((co) => (co.id === updated.id ? { ...co, ...updated } : co)))} />
                </div>
                <div style={css('margin-top:16px;padding-top:16px;border-top:1px solid var(--border,rgba(255,255,255,.1))')}>
                  <div style={css('font-size:11px;letter-spacing:.5px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:700;margin-bottom:10px')}>
                    Espace coach
                  </div>
                  {c.coachAccount ? (
                    <div style={css('padding:12px;border-radius:10px;background:var(--surface2,#161616);font-size:12.5px;color:var(--muted,#8a8a8a)')}>
                      Compte actif — {c.coachAccount.email}
                    </div>
                  ) : (
                    <CreateCoachAccountBlock
                      coach={c}
                      onCreated={(id, coachAccount) => setCoaches((prev) => prev.map((co) => (co.id === id ? { ...co, coachAccount } : co)))}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {adminTab === 'gym-partners' && (
          <div style={{ display: 'grid', gap: 12 }}>
            {gymPartners.length === 0 && <div style={{ padding: 24, textAlign: 'center', color: 'var(--muted,#8a8a8a)' }}>Aucune candidature pour le moment.</div>}
            {gymPartners.map((g) => (
              <div key={g.id} style={css('padding:22px 24px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c)')}>
                <div style={css('display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap;margin-bottom:12px')}>
                  <div style={{ minWidth: 0 }}>
                    <div style={css('display:flex;align-items:center;gap:8px')}>
                      <span style={{ fontWeight: 700, fontSize: 16 }}>{g.gymName}</span>
                      <span style={css('font-size:12px;color:var(--muted,#8a8a8a)')}>{g.code}</span>
                    </div>
                    <div style={css('font-size:12.5px;color:var(--muted,#8a8a8a);margin-top:2px')}>
                      {g.managerName} · {g.commune} · {new Date(g.createdAt).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  <span style={css(leadBadge(g.status))}>{GYM_PARTNER_STATUS_LABELS[g.status]}</span>
                </div>
                <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px;font-size:13px;color:var(--muted,#8a8a8a);margin-bottom:14px')}>
                  <div>
                    <strong style={{ color: 'var(--fg,#fff)', fontWeight: 600 }}>Contact :</strong> {g.phone} · {g.email}
                  </div>
                  <div>
                    <strong style={{ color: 'var(--fg,#fff)', fontWeight: 600 }}>Adresse :</strong> {g.address}
                  </div>
                  <div>
                    <strong style={{ color: 'var(--fg,#fff)', fontWeight: 600 }}>Adhérents :</strong> {g.memberCount || '—'}
                  </div>
                  <div>
                    <strong style={{ color: 'var(--fg,#fff)', fontWeight: 600 }}>Logiciel de gestion :</strong>{' '}
                    {g.hasSoftware === null ? '—' : g.hasSoftware ? 'Oui' : 'Non'}
                  </div>
                  <div style={{ gridColumn: '1/-1' }}>
                    <strong style={{ color: 'var(--fg,#fff)', fontWeight: 600 }}>Motivations :</strong> {g.reasons || '—'}
                  </div>
                </div>
                <div style={css('display:flex;gap:10px')}>
                  <button
                    onClick={() => advanceGymPartnerStatus(g.id, -1)}
                    style={css('flex:1;padding:11px;border-radius:10px;border:1px solid var(--border,rgba(255,255,255,.16));font-weight:700;font-size:13.5px;color:var(--fg,#fff)')}
                  >
                    ‹ Reculer
                  </button>
                  <button
                    onClick={() => advanceGymPartnerStatus(g.id, 1)}
                    style={css('flex:1;padding:11px;border-radius:10px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:13.5px')}
                  >
                    Avancer ›
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {adminTab === 'formules' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 20 }}>
            <div style={css('display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px')}>
              {formules.length === 0 && (
                <div style={{ padding: 24, textAlign: 'center', color: 'var(--muted,#8a8a8a)' }}>Aucune formule pour le moment.</div>
              )}
              {formules.map((f) => (
                <div key={f.id} style={css(`padding:22px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c);opacity:${f.actif ? 1 : 0.55}`)}>
                  <div style={css('display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px')}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{f.nom}</div>
                    <span
                      style={css(
                        f.actif
                          ? 'padding:4px 11px;border-radius:20px;font-size:11.5px;font-weight:700;background:rgba(52,211,153,.15);color:#34d399;border:1px solid rgba(52,211,153,.4)'
                          : 'padding:4px 11px;border-radius:20px;font-size:11.5px;font-weight:700;background:var(--surface2,#222);color:var(--muted,#8a8a8a);border:1px solid var(--border,rgba(255,255,255,.14))'
                      )}
                    >
                      {f.actif ? 'Active' : 'Désactivée'}
                    </span>
                  </div>
                  <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a);line-height:1.7;margin-bottom:14px')}>
                    <div>{f.nbSeances} séances · {f.dureeJours} jours</div>
                    <div style={{ color: 'var(--fg,#fff)', fontWeight: 700, fontSize: 18, marginTop: 4 }}>{f.prix.toLocaleString('fr-FR')} FCFA</div>
                  </div>
                  <button
                    onClick={() => toggleFormuleStatus(f.id, !f.actif)}
                    style={css('width:100%;padding:11px;border-radius:10px;border:1px solid var(--border,rgba(255,255,255,.16));font-weight:700;font-size:13px;color:var(--fg,#fff)')}
                  >
                    {f.actif ? 'Désactiver' : 'Réactiver'}
                  </button>
                </div>
              ))}
            </div>

            <FormuleCreateForm onCreated={(formule) => setFormules((prev) => [formule, ...prev])} />
          </div>
        )}

        {adminTab === 'seances' && (
          <div>
            <div style={css('display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px')}>
              {SEANCE_FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setSeanceFilter(f)}
                  style={css(
                    `padding:8px 15px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;border:1px solid ${
                      seanceFilter === f ? 'var(--lime,#C6F202)' : 'var(--border,rgba(255,255,255,.14))'
                    };color:${seanceFilter === f ? 'var(--lime,#C6F202)' : 'var(--muted,#8a8a8a)'};background:${seanceFilter === f ? 'rgba(198,242,2,.1)' : 'transparent'}`
                  )}
                >
                  {SEANCE_FILTER_LABELS[f]}
                </button>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 10 }}>
            {seances.filter((s) => seanceFilter === 'Toutes' || s.statut === seanceFilter).length === 0 && (
              <div style={{ padding: 24, textAlign: 'center', color: 'var(--muted,#8a8a8a)' }}>Aucune séance pour ce filtre.</div>
            )}
            {seances.filter((s) => seanceFilter === 'Toutes' || s.statut === seanceFilter).map((s) => (
              <div key={s.id} style={css('padding:18px 20px;border-radius:14px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c)')}>
                <div style={css('display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap;margin-bottom:6px')}>
                  <div style={{ fontWeight: 700, overflowWrap: 'break-word', minWidth: 0 }}>
                    {s.clientAccount.lead.name} <span style={{ color: 'var(--muted,#8a8a8a)', fontWeight: 400 }}>avec</span> {s.coachAccount.coach.name}
                  </div>
                  <span style={css(leadBadge(s.statut))}>{s.statut}</span>
                </div>
                <div style={css('color:var(--muted,#8a8a8a);font-size:13px;margin-bottom:4px')}>
                  {formatSeanceDateTime(s.datePrevue)}
                  {s.lieu ? ` · ${s.lieu}` : ''}
                </div>
                {s.contenuPrevu && (
                  <div style={css(`font-size:13px;color:var(--fg,#fff);margin-bottom:${s.compteRendu ? 8 : 0}px`)}>{s.contenuPrevu}</div>
                )}
                {s.compteRendu && (
                  <div style={css('margin-top:8px;padding-top:8px;border-top:1px solid var(--border,rgba(255,255,255,.08));font-size:13px;color:var(--fg,#fff);overflow-wrap:break-word')}>
                    <span style={{ color: 'var(--muted,#8a8a8a)', fontWeight: 700 }}>Compte rendu : </span>
                    {s.compteRendu.contenu}
                  </div>
                )}
                {s.statut === 'ANNULEE' && s.annulePar && (
                  <div style={css('margin-top:8px;padding-top:8px;border-top:1px solid var(--border,rgba(255,255,255,.08));font-size:13px;overflow-wrap:break-word')}>
                    <span style={{ color: '#f87171', fontWeight: 700 }}>
                      Annulée par {s.annulePar === 'CLIENT' ? 'le client' : 'le coach'}
                      {s.decompteeMalgreAnnulation ? ' (décomptée — moins de 24h de préavis)' : ' (non décomptée)'}
                    </span>
                    {s.motifAnnulation && <div style={css('color:var(--muted,#8a8a8a);margin-top:3px')}>Motif : {s.motifAnnulation}</div>}
                  </div>
                )}
                {s.statut === 'EN_REATTRIBUTION' && (
                  <div style={css('margin-top:8px;padding-top:8px;border-top:1px solid var(--border,rgba(255,255,255,.08));font-size:13px')}>
                    <div style={{ color: '#fbbf24', fontWeight: 700, marginBottom: 6 }}>
                      Annulée par le coach{s.motifAnnulation ? ` — ${s.motifAnnulation}` : ''}. En attente d&apos;un nouveau coach.
                    </div>
                    <CoachPickerBlock seanceId={s.id} />
                  </div>
                )}
              </div>
            ))}
            </div>
          </div>
        )}

        {adminTab === 'reviews' && (
          <div style={{ display: 'grid', gap: 12 }}>
            {reviews.length === 0 && <div style={{ padding: 24, textAlign: 'center', color: 'var(--muted,#8a8a8a)' }}>Aucun avis pour le moment.</div>}
            {reviews.map((r) => (
              <div key={r.id} style={css('padding:20px 22px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c)')}>
                <div style={css('display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap')}>
                  <div style={{ minWidth: 0 }}>
                    <div style={css('display:flex;align-items:center;gap:8px')}>
                      <span style={{ fontWeight: 700, fontSize: 15 }}>{r.authorName}</span>
                      {r.context && <span style={css('font-size:12.5px;color:var(--muted,#8a8a8a)')}>· {r.context}</span>}
                      <span style={css('color:var(--lime,#C6F202);font-size:13px')}>{'★'.repeat(r.rating)}</span>
                    </div>
                    <p style={css('font-size:13.5px;color:var(--muted,#8a8a8a);margin-top:6px;line-height:1.5;max-width:60ch')}>{r.comment}</p>
                    <div style={css('font-size:11.5px;color:var(--muted,#8a8a8a);margin-top:6px')}>{new Date(r.createdAt).toLocaleDateString('fr-FR')}</div>
                  </div>
                  <div style={css('display:flex;align-items:center;gap:8px;flex:0 0 auto')}>
                    {r.status === 'PENDING' ? (
                      <>
                        <button
                          onClick={() => moderateReview(r.id, 'REJECTED')}
                          style={css('padding:9px 14px;border-radius:10px;border:1px solid var(--border,rgba(255,255,255,.16));font-weight:700;font-size:13px;color:var(--fg,#fff)')}
                        >
                          Rejeter
                        </button>
                        <button
                          onClick={() => moderateReview(r.id, 'APPROVED')}
                          style={css('padding:9px 14px;border-radius:10px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:13px')}
                        >
                          Publier
                        </button>
                      </>
                    ) : (
                      <span
                        style={css(
                          r.status === 'APPROVED'
                            ? 'padding:5px 12px;border-radius:20px;font-size:12px;font-weight:700;background:rgba(52,211,153,.15);color:#34d399;border:1px solid rgba(52,211,153,.4)'
                            : 'padding:5px 12px;border-radius:20px;font-size:12px;font-weight:700;background:var(--surface2,#222);color:var(--muted,#8a8a8a);border:1px solid var(--border,rgba(255,255,255,.14))'
                        )}
                      >
                        {REVIEW_STATUS_LABELS[r.status]}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedLead && (
        <div
          onClick={() => setSelectedLeadId(null)}
          style={css('position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);display:flex;justify-content:flex-end;animation:fadeIn .2s both')}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={css('width:min(460px,100%);height:100%;background:var(--bg,#0a0a0a);border-left:1px solid var(--border,rgba(255,255,255,.14));padding:28px;overflow:auto;animation:slideIn .28s both')}
          >
            <div style={css('display:flex;justify-content:space-between;align-items:center;margin-bottom:22px')}>
              <span style={css('font-size:12px;color:var(--muted,#8a8a8a);font-weight:700')}>{selectedLead.code}</span>
              <button
                onClick={() => setSelectedLeadId(null)}
                style={css('width:34px;height:34px;border-radius:10px;border:1px solid var(--border,rgba(255,255,255,.16));display:flex;align-items:center;justify-content:center')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <h2 style={css("font-family:'Broaven';font-weight:700;font-size:26px;margin-bottom:8px")}>{selectedLead.name}</h2>
            <div style={{ marginBottom: 22 }}>
              <span style={css(leadBadge(selectedLead.status))}>{LEAD_STATUS_LABELS[selectedLead.status]}</span>
            </div>
            <div style={css('display:grid;gap:1px;background:var(--border,rgba(255,255,255,.08));border-radius:14px;overflow:hidden;margin-bottom:22px')}>
              {[
                ['Type', LEAD_TYPE_LABELS[selectedLead.type]],
                ['Objectif', selectedLead.objective],
                ['Profil', selectedLead.profile],
                ['Source', selectedLead.source],
                ['Commune', selectedLead.commune],
                ['Lieu de pratique', selectedLead.practiceLocation ? PRACTICE_LOCATION_LABELS[selectedLead.practiceLocation] || selectedLead.practiceLocation : '—'],
                ['E-mail', selectedLead.contactEmail || '—'],
                ['Téléphone', selectedLead.contactPhone || '—'],
                ['Coach', selectedLead.coach?.name || '—'],
                ['Nutrition', selectedLead.nutrition ? selectedLead.nutritionObjective || 'Demandé' : 'Non demandé'],
                ['Disponibilités', selectedLead.availability || '—'],
              ].map(([k, v]) => (
                <div key={k} style={css('display:flex;justify-content:space-between;padding:13px 16px;background:var(--surface,#0c0c0c);font-size:13.5px')}>
                  <span style={css('color:var(--muted,#8a8a8a)')}>{k}</span>
                  <span style={{ fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
            {selectedLead.comment && (
              <div style={css('padding:14px 16px;border-radius:12px;background:var(--surface,#0c0c0c);border:1px solid var(--border,rgba(255,255,255,.08));margin-bottom:22px')}>
                <div style={css('font-size:12px;color:var(--muted,#8a8a8a);font-weight:700;margin-bottom:6px')}>Commentaire du prospect</div>
                <div style={css('font-size:13.5px;line-height:1.5')}>{selectedLead.comment}</div>
              </div>
            )}
            <div style={css('font-size:12px;letter-spacing:.5px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:700;margin-bottom:10px')}>
              Faire avancer le prospect
            </div>
            <div style={css('display:flex;gap:10px;margin-bottom:20px')}>
              <button
                onClick={() => advanceStatus(selectedLead.id, -1)}
                style={css('flex:1;padding:13px;border-radius:11px;border:1px solid var(--border,rgba(255,255,255,.16));font-weight:700;font-size:14px;color:var(--fg,#fff)')}
              >
                ‹ Reculer
              </button>
              <button
                onClick={() => advanceStatus(selectedLead.id, 1)}
                style={css('flex:1;padding:13px;border-radius:11px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:14px')}
              >
                Avancer ›
              </button>
            </div>
            <div style={css('font-size:12px;letter-spacing:.5px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:700;margin-bottom:10px')}>Attribuer un coach</div>
            <select
              defaultValue=""
              onChange={(e) => {
                if (e.target.value) assignCoach(selectedLead.id, e.target.value);
              }}
              style={css('width:100%;padding:14px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.16));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:14px')}
            >
              <option value="" style={{ background: '#0c0c0c', color: '#fff' }}>— Sélectionner un coach —</option>
              {coaches.map((co) => (
                <option key={co.id} value={co.id} style={{ background: '#0c0c0c', color: '#fff' }}>
                  {co.name}
                </option>
              ))}
            </select>

            {selectedLead.status === 'CLIENT' && (
              <>
                <div style={css('font-size:12px;letter-spacing:.5px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:700;margin:20px 0 10px')}>
                  Conservation des données
                </div>
                {selectedLead.relationEndedAt ? (
                  <div style={css('padding:14px;border-radius:12px;background:var(--surface,#0c0c0c);border:1px solid var(--border,rgba(255,255,255,.08));font-size:13.5px;color:var(--muted,#8a8a8a)')}>
                    Relation terminée le {new Date(selectedLead.relationEndedAt).toLocaleDateString('fr-FR')}. Données anonymisées automatiquement 3 ans après cette date.
                  </div>
                ) : (
                  <button
                    onClick={() => endRelation(selectedLead.id)}
                    style={css('width:100%;padding:14px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.16));font-weight:700;font-size:14px;color:var(--fg,#fff)')}
                  >
                    Marquer la fin de la relation client
                  </button>
                )}
              </>
            )}

            {selectedLead.status === 'CLIENT' && (
              <>
                <div style={css('font-size:12px;letter-spacing:.5px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:700;margin:20px 0 10px')}>
                  Espace client (GBÔ Fitness Digital)
                </div>
                {selectedLead.clientAccount ? (
                  <>
                    <div style={css('padding:14px;border-radius:12px;background:var(--surface,#0c0c0c);border:1px solid var(--border,rgba(255,255,255,.08));font-size:13.5px;color:var(--muted,#8a8a8a);margin-bottom:16px')}>
                      Compte actif — {selectedLead.clientAccount.email}
                    </div>
                    <div style={css('font-size:12px;letter-spacing:.5px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:700;margin-bottom:10px')}>
                      Abonnement
                    </div>
                    <AbonnementBlock
                      lead={selectedLead}
                      formules={formules}
                      onCreated={(id, abonnement) =>
                        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, clientAccount: { ...l.clientAccount, abonnements: [abonnement] } } : l)))
                      }
                    />
                  </>
                ) : (
                  <CreateClientAccountBlock
                    lead={selectedLead}
                    onCreated={(id, clientAccount) => setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, clientAccount } : l)))}
                  />
                )}
              </>
            )}

            {selectedLead.nutrition && (
              <>
                <div style={css('font-size:12px;letter-spacing:.5px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:700;margin:20px 0 10px')}>
                  Suivi nutritionnel
                </div>
                {selectedLead.nutritionFollowUp ? (
                  <div style={css('padding:14px;border-radius:12px;background:rgba(52,211,153,.1);border:1px solid rgba(52,211,153,.35);color:#34d399;font-size:13.5px;font-weight:600')}>
                    Déjà transmis au Cabinet Médico-Nutrition
                  </div>
                ) : (
                  <button
                    onClick={() => transmitToNutritionPartner(selectedLead.id)}
                    style={css('width:100%;padding:14px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:14px')}
                  >
                    Transmettre au Cabinet Médico-Nutrition
                  </button>
                )}
              </>
            )}

            <div style={css('margin-top:18px;padding:14px;border-radius:12px;background:var(--glass,rgba(255,255,255,.03));font-size:12.5px;color:var(--muted,#8a8a8a);line-height:1.5')}>
              Chaque changement est tracé dans le journal d&apos;audit (voir AuditLog).
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Formulaire de création du compte client, dans la fiche détaillée d'un Lead au statut
// CLIENT — voir la proposition d'architecture, décision 2 et décision sur la remise des
// identifiants (mot de passe temporaire affiché une seule fois, à transmettre par l'admin).
function CreateClientAccountBlock({ lead, onCreated }) {
  const [email, setEmail] = useState(lead.contactEmail || '');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleCreate = async () => {
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}/create-client-account`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Une erreur est survenue.');
        return;
      }
      // On ne prévient pas encore le parent (onCreated) : ça ferait basculer l'affichage
      // sur "Compte actif" et disparaître ce mot de passe avant que l'admin ait eu le temps
      // de le lire — c'est exactement le bug observé le 12/11. On attend que l'admin ferme
      // ce panneau lui-même.
      setResult(data);
    } catch {
      setError('Connexion impossible. Vérifiez votre réseau et réessayez.');
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <div style={css('padding:16px;border-radius:12px;background:rgba(198,242,2,.1);border:1px solid rgba(198,242,2,.35);font-size:13.5px')}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Compte créé</div>
        <div style={{ marginBottom: 4 }}>E-mail : {result.clientAccount.email}</div>
        <div style={{ marginBottom: 10 }}>
          Mot de passe temporaire : <strong style={{ letterSpacing: 1 }}>{result.tempPassword}</strong>
        </div>
        <div style={css('color:var(--muted,#8a8a8a);font-size:12px;margin-bottom:12px')}>
          Ce mot de passe ne s&apos;affiche qu&apos;une seule fois. Transmettez-le au client maintenant, il devra le changer à sa première connexion.
        </div>
        <button
          onClick={() => onCreated(lead.id, result.clientAccount)}
          style={css('width:100%;padding:12px;border-radius:10px;border:1px solid rgba(198,242,2,.4);color:var(--fg,#fff);font-weight:700;font-size:13.5px')}
        >
          J&apos;ai noté le mot de passe, fermer
        </button>
      </div>
    );
  }

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail du client"
        style={css(
          'width:100%;padding:14px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.16));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:14px;margin-bottom:10px'
        )}
      />
      {error && (
        <div style={css('padding:10px;border-radius:10px;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.4);color:#f87171;font-size:13px;margin-bottom:10px')}>
          {error}
        </div>
      )}
      <button
        onClick={handleCreate}
        disabled={submitting || !email}
        style={css(`width:100%;padding:14px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:14px;opacity:${submitting || !email ? 0.6 : 1}`)}
      >
        {submitting ? 'Création…' : 'Créer le compte client'}
      </button>
    </div>
  );
}

// Même logique que CreateClientAccountBlock, pour les coachs — voir aussi le commentaire
// sur le mot de passe temporaire là-bas.
function CreateCoachAccountBlock({ coach, onCreated }) {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleCreate = async () => {
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/coaches/${coach.id}/create-account`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Une erreur est survenue.');
        return;
      }
      setResult(data);
    } catch {
      setError('Connexion impossible. Vérifiez votre réseau et réessayez.');
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <div style={css('padding:14px;border-radius:10px;background:rgba(198,242,2,.1);border:1px solid rgba(198,242,2,.35);font-size:13px')}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>Compte créé</div>
        <div style={{ marginBottom: 4 }}>E-mail : {result.coachAccount.email}</div>
        <div style={{ marginBottom: 10 }}>
          Mot de passe temporaire : <strong style={{ letterSpacing: 1 }}>{result.tempPassword}</strong>
        </div>
        <div style={css('color:var(--muted,#8a8a8a);font-size:11.5px;margin-bottom:10px')}>
          Ce mot de passe ne s&apos;affiche qu&apos;une seule fois. Transmettez-le au coach maintenant.
        </div>
        <button
          onClick={() => onCreated(coach.id, result.coachAccount)}
          style={css('width:100%;padding:10px;border-radius:9px;border:1px solid rgba(198,242,2,.4);color:var(--fg,#fff);font-weight:700;font-size:12.5px')}
        >
          J&apos;ai noté le mot de passe, fermer
        </button>
      </div>
    );
  }

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail du coach"
        style={css(
          'width:100%;padding:12px;border-radius:10px;border:1px solid var(--border,rgba(255,255,255,.16));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:13px;margin-bottom:8px'
        )}
      />
      {error && (
        <div style={css('padding:9px;border-radius:9px;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.4);color:#f87171;font-size:12px;margin-bottom:8px')}>
          {error}
        </div>
      )}
      <button
        onClick={handleCreate}
        disabled={submitting || !email}
        style={css(`width:100%;padding:12px;border-radius:10px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:13px;opacity:${submitting || !email ? 0.6 : 1}`)}
      >
        {submitting ? 'Création…' : 'Créer le compte coach'}
      </button>
    </div>
  );
}

// RG06 — téléphone et photo, affichés au client quand ce coach lui est automatiquement
// attribué suite à l'annulation d'un autre coach (lib/seanceAnnulation.js). Pas d'upload de
// fichier pour l'instant : l'admin colle un lien d'image déjà hébergé.
function CoachContactBlock({ coach, onUpdated }) {
  const [editing, setEditing] = useState(false);
  const [phone, setPhone] = useState(coach.phone || '');
  const [photoUrl, setPhotoUrl] = useState(coach.photoUrl || '');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/coaches/${coach.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, photoUrl }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Une erreur est survenue.');
        return;
      }
      onUpdated(data.coach);
      setEditing(false);
    } catch {
      setError('Connexion impossible. Vérifiez votre réseau et réessayez.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!editing) {
    return (
      <div style={css('font-size:12.5px;color:var(--muted,#8a8a8a)')}>
        <div style={{ marginBottom: 6 }}>
          {coach.phone || coach.photoUrl ? (
            <>
              {coach.phone && <div>Téléphone : {coach.phone}</div>}
              {coach.photoUrl && <div>Photo renseignée</div>}
            </>
          ) : (
            'Téléphone et photo non renseignés'
          )}
        </div>
        <button
          type="button"
          onClick={() => setEditing(true)}
          style={css('padding:7px 12px;border-radius:9px;border:1px solid var(--border,rgba(255,255,255,.16));color:var(--fg,#fff);font-weight:600;font-size:12px')}
        >
          Modifier contact
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 8 }}>
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Téléphone"
        style={css('padding:10px;border-radius:9px;border:1px solid var(--border,rgba(255,255,255,.16));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:13px')}
      />
      <input
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
        placeholder="Lien de la photo (https://…)"
        style={css('padding:10px;border-radius:9px;border:1px solid var(--border,rgba(255,255,255,.16));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:13px')}
      />
      {error && <div style={{ color: '#f87171', fontSize: 12 }}>{error}</div>}
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          type="button"
          onClick={() => setEditing(false)}
          style={css('flex:1;padding:9px;border-radius:9px;border:1px solid var(--border,rgba(255,255,255,.16));color:var(--fg,#fff);font-weight:600;font-size:12px')}
        >
          Annuler
        </button>
        <button
          type="button"
          disabled={submitting}
          onClick={handleSave}
          style={css(`flex:1;padding:9px;border-radius:9px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:12px;opacity:${submitting ? 0.6 : 1}`)}
        >
          {submitting ? 'Envoi…' : 'Enregistrer'}
        </button>
      </div>
    </div>
  );
}

// Formulaire de création d'une formule — le CDC exige que les tarifs soient paramétrables
// plutôt que codés en dur, voir la table Formule dans prisma/schema.prisma.
function FormuleCreateForm({ onCreated }) {
  const [nom, setNom] = useState('');
  const [nbSeances, setNbSeances] = useState('');
  const [dureeJours, setDureeJours] = useState('');
  const [prix, setPrix] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/formules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, nbSeances: Number(nbSeances), dureeJours: Number(dureeJours), prix: Number(prix) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Une erreur est survenue.');
        return;
      }
      onCreated(data.formule);
      setNom('');
      setNbSeances('');
      setDureeJours('');
      setPrix('');
    } catch {
      setError('Connexion impossible. Vérifiez votre réseau et réessayez.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleCreate}
      style={css('padding:22px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c);max-width:420px')}
    >
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>Nouvelle formule</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 10 }}>
        <input
          required
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Nom (ex. Pack 8 séances)"
          style={css('padding:13px;border-radius:10px;border:1px solid var(--border,rgba(255,255,255,.16));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:14px')}
        />
        <input
          required
          type="number"
          min="1"
          value={nbSeances}
          onChange={(e) => setNbSeances(e.target.value)}
          placeholder="Nombre de séances"
          style={css('padding:13px;border-radius:10px;border:1px solid var(--border,rgba(255,255,255,.16));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:14px')}
        />
        <input
          required
          type="number"
          min="1"
          value={dureeJours}
          onChange={(e) => setDureeJours(e.target.value)}
          placeholder="Durée de validité (jours)"
          style={css('padding:13px;border-radius:10px;border:1px solid var(--border,rgba(255,255,255,.16));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:14px')}
        />
        <input
          required
          type="number"
          min="0"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
          placeholder="Tarif (FCFA)"
          style={css('padding:13px;border-radius:10px;border:1px solid var(--border,rgba(255,255,255,.16));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:14px')}
        />
      </div>
      {error && (
        <div style={css('margin-top:10px;padding:10px;border-radius:9px;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.4);color:#f87171;font-size:12.5px')}>
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={submitting}
        style={css(`width:100%;margin-top:14px;padding:13px;border-radius:10px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:14px;opacity:${submitting ? 0.6 : 1}`)}
      >
        {submitting ? 'Création…' : 'Créer la formule'}
      </button>
    </form>
  );
}

// Section abonnement dans la fiche d'un client, une fois son compte créé — propose une
// formule active si aucun abonnement en cours, sinon affiche l'abonnement et ses paiements.
function AbonnementBlock({ lead, formules, onCreated }) {
  const [formuleId, setFormuleId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const abonnement = lead.clientAccount?.abonnements?.[0];

  const handleCreate = async () => {
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}/create-abonnement`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formuleId: Number(formuleId) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Une erreur est survenue.');
        return;
      }
      onCreated(lead.id, data.abonnement);
    } catch {
      setError('Connexion impossible. Vérifiez votre réseau et réessayez.');
    } finally {
      setSubmitting(false);
    }
  };

  if (abonnement) {
    return (
      <div style={css('padding:14px;border-radius:12px;background:var(--surface,#0c0c0c);border:1px solid var(--border,rgba(255,255,255,.08));font-size:13px')}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>{abonnement.formule.nom}</div>
        <div style={{ color: 'var(--muted,#8a8a8a)', marginBottom: 2 }}>
          {abonnement.seancesRestantes} / {abonnement.formule.nbSeances} séances restantes
        </div>
        <div style={{ color: 'var(--muted,#8a8a8a)', marginBottom: 10 }}>
          Expire le {new Date(abonnement.expireLe).toLocaleDateString('fr-FR')}
        </div>
        <PaiementForm abonnementId={abonnement.id} paiements={abonnement.paiements} />
      </div>
    );
  }

  const activeFormules = formules.filter((f) => f.actif);

  return (
    <div>
      {activeFormules.length === 0 ? (
        <div style={css('color:var(--muted,#8a8a8a);font-size:12.5px')}>Crée d&apos;abord une formule active dans l&apos;onglet "Formules".</div>
      ) : (
        <>
          <select
            value={formuleId}
            onChange={(e) => setFormuleId(e.target.value)}
            style={css(
              'width:100%;padding:13px;border-radius:10px;border:1px solid var(--border,rgba(255,255,255,.16));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:13.5px;margin-bottom:10px'
            )}
          >
            <option value="" style={{ background: '#0c0c0c', color: '#fff' }}>— Sélectionner une formule —</option>
            {activeFormules.map((f) => (
              <option key={f.id} value={f.id} style={{ background: '#0c0c0c', color: '#fff' }}>
                {f.nom} — {f.prix.toLocaleString('fr-FR')} FCFA
              </option>
            ))}
          </select>
          {error && (
            <div style={css('padding:10px;border-radius:9px;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.4);color:#f87171;font-size:12.5px;margin-bottom:10px')}>
              {error}
            </div>
          )}
          <button
            onClick={handleCreate}
            disabled={submitting || !formuleId}
            style={css(`width:100%;padding:12px;border-radius:10px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:13px;opacity:${submitting || !formuleId ? 0.6 : 1}`)}
          >
            {submitting ? 'Création…' : "Créer l'abonnement"}
          </button>
        </>
      )}
    </div>
  );
}

// RG06 — réattribution manuelle (décision du 13/11/2026) : affiché sur une séance
// EN_REATTRIBUTION, propose la liste live des coachs libres sur ce créneau et laisse
// l'admin en choisir un. Bloqué tant qu'une proposition est en cours (coach ou client n'a
// pas encore répondu) — voir lib/seanceReattribution.js.
function CoachPickerBlock({ seanceId }) {
  const [coachs, setCoachs] = useState([]);
  const [propositionEnCours, setPropositionEnCours] = useState(null);
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [proposed, setProposed] = useState(false);

  const charger = () => {
    setLoading(true);
    fetch(`/api/admin/seances/${seanceId}/coachs-disponibles`)
      .then((res) => res.json())
      .then((data) => {
        setCoachs(data.coachs || []);
        setPropositionEnCours(data.propositionEnCours || null);
      })
      .catch(() => setError('Impossible de charger les coachs disponibles.'))
      .finally(() => setLoading(false));
  };

  useEffect(charger, [seanceId]);

  const proposer = async () => {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/seances/${seanceId}/proposer-coach`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coachAccountId: Number(selected) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Une erreur est survenue.');
        return;
      }
      setProposed(true);
      charger();
    } catch {
      setError('Connexion impossible. Vérifiez votre réseau et réessayez.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div style={css('font-size:12.5px;color:var(--muted,#8a8a8a)')}>Chargement des coachs disponibles…</div>;
  }

  if (propositionEnCours) {
    return (
      <div style={css('padding:10px;border-radius:9px;background:rgba(251,191,36,.08);border:1px solid rgba(251,191,36,.3);font-size:12.5px')}>
        Proposition en cours chez <strong>{propositionEnCours.coachNom}</strong> — en attente de{' '}
        {propositionEnCours.statut === 'PROPOSEE_AU_COACH' ? 'sa réponse' : 'la réponse du client'}.
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 8 }}>
      {proposed && <div style={{ color: '#34d399', fontSize: 12.5 }}>Proposition envoyée.</div>}
      {coachs.length === 0 ? (
        <div style={css('font-size:12.5px;color:var(--muted,#8a8a8a)')}>Aucun coach libre sur ce créneau pour le moment.</div>
      ) : (
        <>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            style={css('padding:9px;border-radius:9px;border:1px solid var(--border,rgba(255,255,255,.16));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:13px;color-scheme:dark')}
          >
            <option value="" style={{ background: '#0c0c0c', color: '#fff' }}>
              Choisir un coach libre…
            </option>
            {coachs.map((c) => (
              <option key={c.id} value={c.id} style={{ background: '#0c0c0c', color: '#fff' }}>
                {c.nom} — {c.spec}
              </option>
            ))}
          </select>
          {error && <div style={{ color: '#f87171', fontSize: 12 }}>{error}</div>}
          <button
            type="button"
            disabled={!selected || submitting}
            onClick={proposer}
            style={css(`padding:9px;border-radius:9px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:12.5px;opacity:${!selected || submitting ? 0.6 : 1}`)}
          >
            {submitting ? 'Envoi…' : 'Proposer ce coach'}
          </button>
        </>
      )}
    </div>
  );
}

function PaiementForm({ abonnementId, paiements }) {
  const [montant, setMontant] = useState('');
  const [methode, setMethode] = useState('Espèces');
  const [submitting, setSubmitting] = useState(false);
  const [localPaiements, setLocalPaiements] = useState(paiements || []);
  const [error, setError] = useState('');

  const total = localPaiements.reduce((sum, p) => sum + p.montant, 0);

  const handleCreate = async () => {
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/abonnements/${abonnementId}/paiement`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ montant: Number(montant), methode }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Une erreur est survenue.');
        return;
      }
      setLocalPaiements((prev) => [data.paiement, ...prev]);
      setMontant('');
    } catch {
      setError('Connexion impossible. Vérifiez votre réseau et réessayez.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={css('border-top:1px solid var(--border,rgba(255,255,255,.08));padding-top:10px;margin-top:4px')}>
      <div style={{ color: 'var(--muted,#8a8a8a)', marginBottom: 8 }}>Total réglé : {total.toLocaleString('fr-FR')} FCFA</div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <input
          type="number"
          min="1"
          value={montant}
          onChange={(e) => setMontant(e.target.value)}
          placeholder="Montant"
          style={css('flex:1;padding:10px;border-radius:9px;border:1px solid var(--border,rgba(255,255,255,.16));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:12.5px')}
        />
        <select
          value={methode}
          onChange={(e) => setMethode(e.target.value)}
          style={css('padding:10px;border-radius:9px;border:1px solid var(--border,rgba(255,255,255,.16));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:12.5px')}
        >
          {['Espèces', 'Mobile Money', 'Virement', 'Chèque', 'Autre'].map((m) => (
            <option key={m} value={m} style={{ background: '#0c0c0c', color: '#fff' }}>
              {m}
            </option>
          ))}
        </select>
      </div>
      {error && <div style={{ color: '#f87171', fontSize: 11.5, marginBottom: 8 }}>{error}</div>}
      <button
        onClick={handleCreate}
        disabled={submitting || !montant}
        style={css(`width:100%;padding:9px;border-radius:9px;border:1px solid rgba(198,242,2,.4);color:var(--fg,#fff);font-weight:700;font-size:12px;opacity:${submitting || !montant ? 0.6 : 1}`)}
      >
        {submitting ? 'Enregistrement…' : 'Enregistrer un paiement'}
      </button>
    </div>
  );
}
