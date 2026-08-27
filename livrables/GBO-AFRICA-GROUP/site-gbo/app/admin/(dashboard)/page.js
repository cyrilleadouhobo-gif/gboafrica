'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { css } from '../../../lib/css.js';
import { leadBadge, tabStyle } from '../../../lib/styleHelpers.js';
import { LEAD_STATUSES, LEAD_STATUS_LABELS, LEAD_TYPES, LEAD_TYPE_LABELS, REVIEW_STATUS_LABELS, PRACTICE_LOCATION_LABELS, GYM_PARTNER_STATUS_LABELS } from '../../../lib/constants.js';

const FILTERS = ['Tous', ...LEAD_TYPES];

export default function AdminPage() {
  const router = useRouter();
  const [me, setMe] = useState(null);
  const [adminTab, setAdminTab] = useState('dashboard');
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [adminFilter, setAdminFilter] = useState('Tous');

  const [leads, setLeads] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [gymPartners, setGymPartners] = useState([]);
  const [stats, setStats] = useState(null);
  const [funnel, setFunnel] = useState([]);
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAll = useCallback(async () => {
    const [meRes, leadsRes, coachesRes, statsRes, reviewsRes, gymPartnersRes] = await Promise.all([
      fetch('/api/auth/me'),
      fetch('/api/admin/leads'),
      fetch('/api/admin/coaches'),
      fetch('/api/admin/stats'),
      fetch('/api/admin/reviews'),
      fetch('/api/admin/gym-partners'),
    ]);

    if (meRes.status === 401) {
      router.replace('/admin/login');
      return;
    }

    const meData = await meRes.json();
    const leadsData = await leadsRes.json();
    const coachesData = await coachesRes.json();
    const statsData = await statsRes.json();
    const reviewsData = await reviewsRes.json();
    const gymPartnersData = await gymPartnersRes.json();

    setMe(meData.admin);
    setLeads(leadsData.leads || []);
    setCoaches(coachesData.coaches || []);
    setStats(statsData.stats);
    setFunnel(statsData.funnel || []);
    setRecentLeads(statsData.recent || []);
    setReviews(reviewsData.reviews || []);
    setGymPartners(gymPartnersData.gymPartners || []);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

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
              <span style={css("font-family:'Broaven';font-weight:700;font-size:22px")}>
                GB<span style={{ color: 'var(--lime,#C6F202)' }}>Ô</span>
              </span>
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
              ].map(([k, v]) => (
                <div key={k} style={css('display:flex;justify-content:space-between;padding:13px 16px;background:var(--surface,#0c0c0c);font-size:13.5px')}>
                  <span style={css('color:var(--muted,#8a8a8a)')}>{k}</span>
                  <span style={{ fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
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
              <option value="">— Sélectionner un coach —</option>
              {coaches.map((co) => (
                <option key={co.id} value={co.id}>
                  {co.name}
                </option>
              ))}
            </select>

            {selectedLead.nutrition && (
              <>
                <div style={css('font-size:12px;letter-spacing:.5px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:700;margin:20px 0 10px')}>
                  Suivi nutritionnel
                </div>
                {selectedLead.nutritionFollowUp ? (
                  <div style={css('padding:14px;border-radius:12px;background:rgba(52,211,153,.1);border:1px solid rgba(52,211,153,.35);color:#34d399;font-size:13.5px;font-weight:600')}>
                    Déjà transmis au Centre Médico Nutrition
                  </div>
                ) : (
                  <button
                    onClick={() => transmitToNutritionPartner(selectedLead.id)}
                    style={css('width:100%;padding:14px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:14px')}
                  >
                    Transmettre au Centre Médico Nutrition
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
