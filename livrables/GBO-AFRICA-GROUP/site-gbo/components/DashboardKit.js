import { css } from '../lib/css.js';

// Petit kit partagé par les espaces client et coach (GBÔ Fitness Digital) : avatars,
// tuiles de stats, anneau/barre de progression, badges. Évite de dupliquer ces blocs
// visuels entre app/client/(espace)/page.js et app/coach/(espace)/page.js.

export function initials(name) {
  return (name || '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || '')
    .join('');
}

export function Avatar({ name, size = 40 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size / 2.6),
        background: 'var(--lime,#C6F202)',
        color: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: Math.round(size * 0.4),
        flexShrink: 0,
      }}
    >
      {initials(name) || '?'}
    </div>
  );
}

const TONES = {
  lime: { bg: 'rgba(198,242,2,.12)', fg: 'var(--lime,#C6F202)' },
  amber: { bg: 'rgba(251,191,36,.14)', fg: '#fbbf24' },
  red: { bg: 'rgba(248,113,113,.14)', fg: '#f87171' },
};

export function StatTile({ icon, value, label, tone = 'lime' }) {
  const t = TONES[tone] || TONES.lime;
  return (
    <div
      className="hover-card"
      style={css(
        'padding:20px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c);min-width:0'
      )}
    >
      <div style={{ width: 38, height: 38, borderRadius: 10, background: t.bg, color: t.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
        {icon}
      </div>
      <div style={css("font-family:'Broaven';font-weight:700;font-size:25px;overflow-wrap:break-word")}>{value}</div>
      <div style={css('font-size:12.5px;color:var(--muted,#8a8a8a);margin-top:2px')}>{label}</div>
    </div>
  );
}

// Anneau de progression en CSS pur (conic-gradient) — pas de lib de charts pour un seul
// chiffre. Le disque intérieur doit avoir le même fond que la carte qui l'accueille pour
// donner l'illusion d'un anneau plutôt que d'un camembert.
export function ProgressRing({ pct, size = 108, value, label }) {
  const clamped = Math.max(0, Math.min(100, pct));
  const inset = Math.round(size * 0.15);
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: `conic-gradient(var(--lime,#C6F202) ${clamped * 3.6}deg, rgba(255,255,255,.08) 0deg)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset,
          borderRadius: '50%',
          background: 'var(--surface,#0c0c0c)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <span style={{ fontWeight: 700, fontSize: Math.round(size * 0.22), fontFamily: 'Broaven' }}>{value}</span>
        {label && <span style={{ fontSize: Math.round(size * 0.1), color: 'var(--muted,#8a8a8a)', marginTop: 2 }}>{label}</span>}
      </div>
    </div>
  );
}

export function ProgressBar({ pct }) {
  const clamped = Math.max(0, Math.min(100, pct));
  return (
    <div style={{ height: 6, borderRadius: 4, background: 'rgba(255,255,255,.08)', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${clamped}%`, background: 'var(--lime,#C6F202)', borderRadius: 4, transition: 'width .3s var(--ease-out)' }} />
    </div>
  );
}

// null si la date est déjà passée — le badge ne doit alors pas s'afficher.
export function countdownLabel(date) {
  const diffMs = new Date(date).getTime() - Date.now();
  if (diffMs < 0) return null;
  const diffH = diffMs / 36e5;
  if (diffH < 24) return "Aujourd'hui";
  const days = Math.ceil(diffH / 24);
  if (days === 1) return 'Demain';
  return `Dans ${days} j`;
}

const BADGE_TONES = {
  lime: { bg: 'rgba(198,242,2,.12)', fg: 'var(--lime,#C6F202)', border: 'rgba(198,242,2,.35)' },
  amber: { bg: 'rgba(251,191,36,.14)', fg: '#fbbf24', border: 'rgba(251,191,36,.35)' },
  red: { bg: 'rgba(248,113,113,.14)', fg: '#f87171', border: 'rgba(248,113,113,.3)' },
  neutral: { bg: 'rgba(255,255,255,.06)', fg: 'var(--muted,#8a8a8a)', border: 'var(--border,rgba(255,255,255,.14))' },
};

export function Badge({ children, tone = 'neutral' }) {
  const t = BADGE_TONES[tone] || BADGE_TONES.neutral;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 10px',
        borderRadius: 20,
        fontSize: 11.5,
        fontWeight: 700,
        background: t.bg,
        color: t.fg,
        border: `1px solid ${t.border}`,
        flexShrink: 0,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}

const ICON_PROPS = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 };

export function IconCalendar() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

export function IconCheck() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="M22 4L12 14.01l-3-3" />
    </svg>
  );
}

export function IconClock() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

export function IconUsers() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function IconAlert() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

export function IconHome() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
    </svg>
  );
}

export function IconUser() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  );
}

export function IconCard() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </svg>
  );
}

export function IconSettings() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
