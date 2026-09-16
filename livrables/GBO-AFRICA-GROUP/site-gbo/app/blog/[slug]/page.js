import Link from 'next/link';
import { notFound } from 'next/navigation';
import { css } from '../../../lib/css.js';
import ImageSlot from '../../../components/ImageSlot.js';
import { stockPhoto } from '../../../lib/stockPhoto.js';
import { ARTICLES, ARTICLE_CAT_PHOTO } from '../../../data/content.js';

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const others = ARTICLES.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <div style={{ maxWidth: 780, margin: '0 auto', padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,40px) clamp(64px,9vw,110px)' }}>
      <Link href="/blog" style={css('display:inline-flex;align-items:center;gap:8px;font-size:13.5px;font-weight:600;color:var(--muted,#8a8a8a);margin-bottom:26px')}>
        ← Retour au blog
      </Link>

      <div style={css('font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:700;margin-bottom:12px')}>
        {article.cat} · {article.read}
      </div>
      <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(26px,5vw,42px);letter-spacing:-1px;line-height:1.1;margin-bottom:18px")}>
        {article.title}
      </h1>
      <p style={css('font-size:16px;color:var(--muted,#8a8a8a);line-height:1.6;margin-bottom:30px')}>{article.excerpt}</p>

      <div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border,rgba(255,255,255,.1))', marginBottom: 36 }}>
        <ImageSlot placeholder="Visuel article" src={stockPhoto(ARTICLE_CAT_PHOTO[article.cat] || 'fitnessMen', article.id, '1200x675')} />
      </div>

      <div style={{ display: 'grid', gap: 26 }}>
        {(article.body || []).map((sec, i) => (
          <div key={i}>
            {sec.h && <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(19px,2.4vw,23px);margin-bottom:10px")}>{sec.h}</h2>}
            <p style={css('font-size:15.5px;color:var(--muted,#8a8a8a);line-height:1.7')}>{sec.p}</p>
          </div>
        ))}
      </div>

      <div
        style={css(
          'margin-top:56px;padding:clamp(24px,4vw,36px);border-radius:20px;border:1px solid var(--border,rgba(255,255,255,.12));background:var(--glass,rgba(255,255,255,.03));display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:18px'
        )}
      >
        <div>
          <div style={css("font-family:'Broaven';font-weight:700;font-size:19px;margin-bottom:6px")}>Prêt à commencer ?</div>
          <div style={css('font-size:14px;color:var(--muted,#8a8a8a)')}>Deux séances gratuites pour découvrir l&apos;expérience GBÔ.</div>
        </div>
        <Link
          href="/deux-seances-gratuites"
          className="btn-cta"
          style={css('padding:14px 26px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:14.5px;white-space:nowrap')}
        >
          Commencer maintenant →
        </Link>
      </div>

      {others.length > 0 && (
        <div style={{ marginTop: 56 }}>
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:700;margin-bottom:18px')}>
            À lire aussi
          </div>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr));gap:14px')}>
            {others.map((a) => (
              <Link
                key={a.id}
                href={`/blog/${a.slug}`}
                className="hover-card"
                style={css(
                  'padding:18px;border-radius:14px;border:1px solid var(--border,rgba(255,255,255,.1));color:inherit;text-decoration:none;display:block'
                )}
              >
                <div style={css('font-size:11px;letter-spacing:1px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:6px')}>
                  {a.cat}
                </div>
                <div style={{ fontWeight: 700, fontSize: 15.5, lineHeight: 1.3 }}>{a.title}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
