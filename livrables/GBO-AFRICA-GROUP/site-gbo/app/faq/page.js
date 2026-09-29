import { css } from '../../lib/css.js';
import Reveal from '../../components/Reveal.js';
import GlowBlobs from '../../components/GlowBlobs.js';
import { FAQ_GROUPS } from '../../data/content.js';

export const metadata = { title: 'FAQ — GBÔ AFRICA GROUP' };

const anchor = (cat) => cat.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function FaqPage() {
  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,40px) clamp(64px,9vw,110px)' }}>
      <div style={{ position: 'relative' }}>
        <GlowBlobs compact />
        <div style={{ position: 'relative' }}>
          <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,6vw,50px);letter-spacing:-1.5px;margin-bottom:40px")}>Questions fréquentes.</h1>
        </div>
      </div>
      <div data-article-grid="">
        <div style={{ maxWidth: 780 }}>
          {FAQ_GROUPS.map((g) => (
            <Reveal key={g.cat} id={anchor(g.cat)} style={{ marginBottom: 36, scrollMarginTop: 96 }}>
              <div style={css('font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px')}>{g.cat}</div>
              <div style={{ display: 'grid', gap: 10 }}>
                {g.items.map((f) => (
                  <div key={f.q} className="hover-card" style={css('min-width:0;padding:22px;border-radius:14px;border:1px solid var(--border,rgba(255,255,255,.09));background:var(--glass,rgba(255,255,255,.02))')}>
                    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{f.q}</div>
                    <div style={css('font-size:14.5px;color:var(--muted,#8a8a8a);line-height:1.55;overflow-wrap:break-word')}>{f.a}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
        <aside data-article-aside="">
          <div style={css('padding:22px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--glass,rgba(255,255,255,.03));margin-bottom:20px')}>
            <div style={css('font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:700;margin-bottom:14px')}>
              Catégories
            </div>
            <div style={{ display: 'grid', gap: 10 }}>
              {FAQ_GROUPS.map((g) => (
                <a key={g.cat} href={`#${anchor(g.cat)}`} style={css('font-size:13.5px;color:var(--muted,#8a8a8a);line-height:1.4;text-decoration:none')}>
                  {g.cat}
                </a>
              ))}
            </div>
          </div>
          <div style={css('padding:22px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--glass,rgba(255,255,255,.03))')}>
            <div style={css("font-family:'Broaven';font-weight:700;font-size:16px;margin-bottom:8px")}>Une autre question ?</div>
            <div style={css('font-size:13px;color:var(--muted,#8a8a8a);line-height:1.5;margin-bottom:16px')}>Écrivez-nous, on vous répond directement.</div>
            <a
              href="/contact"
              className="btn-cta"
              style={css('display:block;text-align:center;padding:12px;border-radius:10px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:13.5px')}
            >
              Nous contacter →
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
