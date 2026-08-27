import { css } from '../../lib/css.js';
import { FAQ_GROUPS } from '../../data/content.js';

export const metadata = { title: 'FAQ — GBÔ AFRICA GROUP' };

export default function FaqPage() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,40px) clamp(64px,9vw,110px)' }}>
      <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px')}>FAQ</div>
      <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,6vw,50px);letter-spacing:-1.5px;margin-bottom:40px")}>Questions fréquentes.</h1>
      {FAQ_GROUPS.map((g) => (
        <div key={g.cat} style={{ marginBottom: 36 }}>
          <div style={css('font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px')}>{g.cat}</div>
          <div style={{ display: 'grid', gap: 10 }}>
            {g.items.map((f) => (
              <div key={f.q} style={css('padding:22px;border-radius:14px;border:1px solid var(--border,rgba(255,255,255,.09));background:var(--glass,rgba(255,255,255,.02))')}>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{f.q}</div>
                <div style={css('font-size:14.5px;color:var(--muted,#8a8a8a);line-height:1.55')}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
