import { css } from '../lib/css.js';

const BAR_COLORS = {
  lime: 'var(--lime,#C6F202)',
  amber: '#fbbf24',
  green: '#34d399',
  red: '#f87171',
  neutral: 'rgba(255,255,255,.16)',
};

// Carte de séance partagée par les espaces client et coach — barre d'accent colorée à
// gauche (statut) plutôt que la simple bordure plate utilisée avant la refonte du
// 16/11/2026, pour que l'état d'une séance se voie en un coup d'œil dans une liste longue.
export default function SessionCard({ accent = 'neutral', title, meta, badge, body, children, muted = false }) {
  const bar = BAR_COLORS[accent] || BAR_COLORS.neutral;
  return (
    <div
      className="hover-card"
      style={css(
        `position:relative;padding:18px 18px 18px 22px;border-radius:14px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c);overflow:hidden;min-width:0;opacity:${muted ? 0.85 : 1}`
      )}
    >
      <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: bar }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
        <div style={{ fontWeight: 700, overflowWrap: 'break-word', minWidth: 0 }}>{title}</div>
        {badge}
      </div>
      {meta && <div style={css('font-size:13px;color:var(--muted,#8a8a8a);margin-bottom:6px;overflow-wrap:break-word')}>{meta}</div>}
      {body}
      {children}
    </div>
  );
}
