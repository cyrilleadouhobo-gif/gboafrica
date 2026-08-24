import { css } from '../../lib/css.js';
import { NEWS_ITEMS } from '../../data/content.js';

export const metadata = { title: 'Actualités — GBÔ AFRICA GROUP' };

export default function NewsPage() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,40px) clamp(64px,9vw,110px)' }}>
      <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px')}>Actualités</div>
      <h1 style={css("font-family:'Braven';font-weight:700;font-size:clamp(34px,6vw,60px);letter-spacing:-1.5px;margin-bottom:40px")}>La vie de la marque.</h1>
      <div style={{ display: 'grid', gap: 14 }}>
        {NEWS_ITEMS.map((n) => (
          <div
            key={n.id}
            style={css(
              'display:flex;gap:20px;padding:24px;border-radius:18px;border:1px solid var(--border,rgba(255,255,255,.09));background:var(--glass,rgba(255,255,255,.02));align-items:center;flex-wrap:wrap'
            )}
          >
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={css('display:flex;gap:10px;align-items:center;margin-bottom:8px')}>
                <span style={css('padding:3px 10px;border-radius:20px;background:rgba(198,242,2,.14);color:var(--lime,#C6F202);font-size:11px;font-weight:700')}>{n.tag}</span>
                <span style={css('font-size:12.5px;color:var(--muted,#8a8a8a)')}>{n.date}</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 19, lineHeight: 1.3 }}>{n.title}</div>
            </div>
            <span style={css('color:var(--lime,#C6F202);font-weight:700;font-size:14px')}>Lire →</span>
          </div>
        ))}
      </div>
    </div>
  );
}
