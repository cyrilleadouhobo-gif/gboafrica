import { css } from '../../lib/css.js';
import ImageSlot from '../../components/ImageSlot.js';
import Reveal from '../../components/Reveal.js';
import GlowBlobs from '../../components/GlowBlobs.js';
import { stockPhoto } from '../../lib/stockPhoto.js';
import { ARTICLES, BLOG_CATS, ARTICLE_CAT_PHOTO } from '../../data/content.js';

export const metadata = { title: 'Le journal GBÔ — Fitness, nutrition & bien-être' };

export default function BlogPage() {
  return (
    <div>
      <section style={css('position:relative;padding:clamp(80px,10vw,120px) clamp(20px,5vw,64px) clamp(24px,4vw,40px)')}>
        <GlowBlobs />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px')}>Le journal GBÔ</div>
          <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,6vw,54px);letter-spacing:-1.5px")}>Fitness, nutrition &amp; bien-être.</h1>
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
      <Reveal as="section" style={css('padding:clamp(20px,3vw,40px) clamp(20px,5vw,64px) clamp(64px,9vw,110px)')}>
        <div style={css('max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px')}>
          {ARTICLES.map((a, i) => (
            <Reveal
              key={a.id}
              delay={i * 60}
              className="hover-card"
              style={css('border-radius:18px;overflow:hidden;border:1px solid var(--border,rgba(255,255,255,.09));cursor:pointer')}
            >
              <div style={{ aspectRatio: '16/10', position: 'relative' }}>
                <ImageSlot placeholder="Visuel article" src={stockPhoto(ARTICLE_CAT_PHOTO[a.cat] || 'fitnessMen', a.id, '600x375')} />
              </div>
              <div style={{ padding: 20 }}>
                <div style={css('font-size:11px;letter-spacing:1px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600')}>
                  {a.cat} · {a.read}
                </div>
                <div style={{ fontWeight: 700, fontSize: 19, margin: '8px 0 6px', lineHeight: 1.3 }}>{a.title}</div>
                <div style={css('font-size:14px;color:var(--muted,#8a8a8a);line-height:1.5')}>{a.excerpt}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
