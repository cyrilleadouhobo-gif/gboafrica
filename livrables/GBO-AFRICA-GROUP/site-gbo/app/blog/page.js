import { css } from '../../lib/css.js';
import ImageSlot from '../../components/ImageSlot.js';
import { ARTICLES, BLOG_CATS } from '../../data/content.js';

export const metadata = { title: 'Le journal GBÔ — Fitness, nutrition & bien-être' };

export default function BlogPage() {
  return (
    <div>
      <section style={css('padding:clamp(80px,10vw,120px) clamp(20px,5vw,64px) clamp(24px,4vw,40px)')}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px')}>Le journal GBÔ</div>
          <h1 style={css("font-family:'Space Grotesk';font-weight:700;font-size:clamp(34px,6vw,60px);letter-spacing:-1.5px")}>Fitness, nutrition &amp; bien-être.</h1>
          <div style={css('display:flex;gap:10px;flex-wrap:wrap;margin-top:26px')}>
            {BLOG_CATS.map((c) => (
              <span
                key={c}
                style={css('padding:9px 16px;border-radius:20px;border:1px solid var(--border,rgba(255,255,255,.14));font-size:13px;font-weight:600;cursor:pointer;color:var(--muted,#8a8a8a)')}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>
      <section style={css('padding:clamp(20px,3vw,40px) clamp(20px,5vw,64px) clamp(64px,9vw,110px)')}>
        <div style={css('max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px')}>
          {ARTICLES.map((a) => (
            <div key={a.id} style={css('border-radius:18px;overflow:hidden;border:1px solid var(--border,rgba(255,255,255,.09));cursor:pointer;transition:.2s')}>
              <div style={{ aspectRatio: '16/10', position: 'relative' }}>
                <ImageSlot placeholder="Visuel article" />
              </div>
              <div style={{ padding: 20 }}>
                <div style={css('font-size:11px;letter-spacing:1px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600')}>
                  {a.cat} · {a.read}
                </div>
                <div style={{ fontWeight: 700, fontSize: 19, margin: '8px 0 6px', lineHeight: 1.3 }}>{a.title}</div>
                <div style={css('font-size:14px;color:var(--muted,#8a8a8a);line-height:1.5')}>{a.excerpt}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
