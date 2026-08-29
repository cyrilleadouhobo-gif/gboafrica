import { css } from '../../lib/css.js';
import { prisma } from '../../lib/db.js';
import ReviewForm from '../../components/ReviewForm.js';
import Reveal from '../../components/Reveal.js';

export const metadata = { title: 'Avis clients — GBÔ AFRICA GROUP' };
export const dynamic = 'force-dynamic';

function Stars({ rating }) {
  return (
    <span style={css('color:var(--lime,#C6F202);font-size:16px;letter-spacing:1px')}>
      {'★'.repeat(rating)}
      <span style={{ opacity: 0.25 }}>{'★'.repeat(5 - rating)}</span>
    </span>
  );
}

export default async function ReviewsPage() {
  const reviews = await prisma.review.findMany({ where: { status: 'APPROVED' }, orderBy: { createdAt: 'desc' } });
  const count = reviews.length;
  const average = count ? (reviews.reduce((s, r) => s + r.rating, 0) / count).toFixed(1) : null;

  return (
    <div>
      <section style={css('padding:clamp(80px,10vw,120px) clamp(20px,5vw,64px) clamp(30px,4vw,50px)')}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px')}>
            Avis clients
          </div>
          <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,6vw,54px);letter-spacing:-1.5px;max-width:16ch")}>
            Ce que vivent nos membres.
          </h1>
          {average ? (
            <div style={css('display:flex;align-items:center;gap:12px;margin-top:22px')}>
              <span style={css("font-family:'Broaven';font-weight:700;font-size:32px")}>{average}/5</span>
              <div>
                <Stars rating={Math.round(Number(average))} />
                <div style={css('font-size:13px;color:var(--muted,#8a8a8a)')}>{count} avis publié{count > 1 ? 's' : ''}</div>
              </div>
            </div>
          ) : (
            <p style={css('font-size:16px;color:var(--muted,#8a8a8a);margin-top:20px;max-width:56ch;line-height:1.5')}>
              Le programme démarre — soyez la première ou le premier à partager votre expérience avec GBÔ.
            </p>
          )}
        </div>
      </section>

      <Reveal as="section" style={css('padding:clamp(20px,3vw,40px) clamp(20px,5vw,64px) clamp(64px,9vw,110px)')}>
        <div style={css('max-width:900px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:clamp(32px,5vw,56px)')}>
          <div>
            {count === 0 ? (
              <div style={css('padding:28px;border-radius:16px;border:1px dashed var(--border,rgba(255,255,255,.18));color:var(--muted,#8a8a8a);font-size:14.5px;text-align:center')}>
                Aucun avis publié pour le moment.
              </div>
            ) : (
              <div style={{ display: 'grid', gap: 14 }}>
                {reviews.map((r, i) => (
                  <Reveal
                    key={r.id}
                    delay={i * 50}
                    className="hover-card"
                    style={css('padding:22px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.09));background:var(--surface,#0c0c0c)')}
                  >
                    <Stars rating={r.rating} />
                    <p style={css('font-size:14.5px;line-height:1.6;margin:12px 0')}>{r.comment}</p>
                    <div style={css('font-size:13px;font-weight:600')}>
                      {r.authorName}
                      {r.context && <span style={css('color:var(--muted,#8a8a8a);font-weight:500')}> · {r.context}</span>}
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
          <div>
            <div
              style={css(
                'padding:clamp(24px,3vw,32px);border-radius:20px;border:1px solid var(--border,rgba(255,255,255,.12));background:var(--surface,#0c0c0c);position:sticky;top:90px'
              )}
            >
              <h2 style={css("font-family:'Broaven';font-weight:700;font-size:22px;margin-bottom:6px")}>Votre avis compte</h2>
              <p style={css('font-size:13.5px;color:var(--muted,#8a8a8a);margin-bottom:20px;line-height:1.5')}>
                Chaque avis est relu par l&apos;équipe GBÔ avant publication.
              </p>
              <ReviewForm />
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
