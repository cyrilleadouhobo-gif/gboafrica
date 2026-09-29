import Link from 'next/link';
import { notFound } from 'next/navigation';
import { css } from '../../../lib/css.js';
import ImageSlot from '../../../components/ImageSlot.js';
import Reveal from '../../../components/Reveal.js';
import { stockPhoto } from '../../../lib/stockPhoto.js';
import { NEWS_ITEMS, NEWS_CAT_PHOTO } from '../../../data/content.js';

export default async function NewsDetailPage({ params }) {
  const { slug } = await params;
  const item = NEWS_ITEMS.find((n) => n.slug === slug);
  if (!item) notFound();

  const other = NEWS_ITEMS.find((n) => n.slug !== slug);
  const sections = (item.body || []).filter((sec) => sec.h);
  const anchor = (h) => h.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: 'clamp(70px,9vw,110px) clamp(20px,5vw,40px) clamp(64px,9vw,110px)' }}>
    <div data-article-grid="">
    <div style={{ maxWidth: 900 }}>
      <Reveal>
        {/* Masthead */}
        <div
          style={css(
            'display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;padding-bottom:18px;margin-bottom:28px;border-bottom:1px solid var(--border,rgba(255,255,255,.1))'
          )}
        >
          <Link href="/news" style={css('font-size:13px;font-weight:600;color:var(--muted,#8a8a8a)')}>
            ← Toutes les actualités
          </Link>
          <div style={css('font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:700')}>
            {item.tag} · {item.date}
          </div>
        </div>

        <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,5.4vw,46px);letter-spacing:-1px;line-height:1.08;margin-bottom:20px;max-width:22ch")}>
          {item.title}
        </h1>
        <p style={css('font-size:clamp(16px,2vw,19px);color:#fff;line-height:1.55;max-width:56ch;margin-bottom:28px')}>{item.excerpt}</p>

        {item.facts?.length > 0 && (
          <div style={css('display:flex;flex-wrap:wrap;gap:12px;margin-bottom:32px')}>
            {item.facts.map((f) => (
              <div
                key={f.label}
                style={css('padding:12px 18px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--glass,rgba(255,255,255,.03))')}
              >
                <div style={css('font-size:10.5px;letter-spacing:1px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:700;margin-bottom:4px')}>
                  {f.label}
                </div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{f.value}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border,rgba(255,255,255,.1))', marginBottom: 40 }}>
          <ImageSlot
            placeholder="Visuel actualité"
            src={item.photo || stockPhoto(NEWS_CAT_PHOTO[item.tag] || 'fitnessMen', item.id, '1200x675')}
            style={item.photoPosition ? { objectPosition: item.photoPosition } : undefined}
          />
        </div>

        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ display: 'grid', gap: 26 }}>
            {(item.body || []).map((sec, i) => (
              <div key={i} id={sec.h ? anchor(sec.h) : undefined} style={{ scrollMarginTop: 96 }}>
                {sec.h && <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(19px,2.4vw,23px);margin-bottom:10px")}>{sec.h}</h2>}
                <p style={css('font-size:15.5px;color:var(--muted,#8a8a8a);line-height:1.7')}>{sec.p}</p>
              </div>
            ))}
          </div>

          {item.cta && (
            <div
              style={css(
                'margin-top:48px;padding:clamp(24px,4vw,36px);border-radius:20px;border:1px solid var(--border,rgba(255,255,255,.12));background:var(--glass,rgba(255,255,255,.03));display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:18px'
              )}
            >
              <div>
                <div style={css("font-family:'Broaven';font-weight:700;font-size:19px;margin-bottom:6px")}>Prochaine étape</div>
                <div style={css('font-size:14px;color:var(--muted,#8a8a8a)')}>Cette actualité en une action.</div>
              </div>
              <Link
                href={item.cta.href}
                className="btn-cta"
                style={css('padding:14px 26px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:14.5px;text-align:center;max-width:100%')}
              >
                {item.cta.label} →
              </Link>
            </div>
          )}

          {other && (
            <div style={{ marginTop: 48 }}>
              <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:700;margin-bottom:16px')}>
                Autre actualité
              </div>
              <Link
                href={`/news/${other.slug}`}
                className="hover-card"
                style={css(
                  'padding:18px;border-radius:14px;border:1px solid var(--border,rgba(255,255,255,.1));color:inherit;text-decoration:none;display:block'
                )}
              >
                <div style={css('font-size:11px;letter-spacing:1px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:6px')}>
                  {other.tag} · {other.date}
                </div>
                <div style={{ fontWeight: 700, fontSize: 15.5, lineHeight: 1.3 }}>{other.title}</div>
              </Link>
            </div>
          )}
        </div>
      </Reveal>
    </div>

    <aside data-article-aside="">
      {sections.length > 1 && (
        <div style={css('padding:22px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--glass,rgba(255,255,255,.03));margin-bottom:20px')}>
          <div style={css('font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:700;margin-bottom:14px')}>
            Dans cette actualité
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            {sections.map((sec) => (
              <a key={sec.h} href={`#${anchor(sec.h)}`} style={css('font-size:13.5px;color:var(--muted,#8a8a8a);line-height:1.4;text-decoration:none')}>
                {sec.h}
              </a>
            ))}
          </div>
        </div>
      )}
      <div style={css('padding:22px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--glass,rgba(255,255,255,.03))')}>
        <div style={css("font-family:'Broaven';font-weight:700;font-size:16px;margin-bottom:8px")}>Restons en contact</div>
        <div style={css('font-size:13px;color:var(--muted,#8a8a8a);line-height:1.5;margin-bottom:16px')}>
          Suivez l&apos;actualité de l&apos;écosystème GBÔ et ses prochaines étapes.
        </div>
        <Link
          href="/news"
          className="btn-cta"
          style={css('display:block;text-align:center;padding:12px;border-radius:10px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:13.5px')}
        >
          Toutes les actualités →
        </Link>
      </div>
    </aside>
    </div>
    </div>
  );
}
