import Link from 'next/link';
import { css } from '../../lib/css.js';
import ImageSlot from '../../components/ImageSlot.js';
import Reveal from '../../components/Reveal.js';
import { stockPhoto } from '../../lib/stockPhoto.js';
import { GYM_CHALLENGES, GYM_PILLARS, GYM_COMPLEMENTARY_SERVICES, GYM_HOW_IT_WORKS } from '../../data/content.js';

export const metadata = {
  title: 'Pour les salles — GBÔ accompagne les acteurs du fitness',
};

export default function PourLesSallesPage() {
  return (
    <div>
      <section style={css('position:relative;min-height:70vh;display:flex;align-items:flex-end;overflow:hidden;background:#050505;border-bottom:1px solid var(--border,rgba(255,255,255,.08))')}>
        <ImageSlot placeholder="Visuel — salle moderne" src={stockPhoto('gymInterior', 'pour-les-salles-hero', '1600x1000')} />
        <div
          style={css(
            'position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.8) 0%,rgba(0,0,0,.55) 45%,rgba(0,0,0,.25) 75%),linear-gradient(180deg,rgba(0,0,0,.55) 0%,rgba(0,0,0,.45) 40%,rgba(0,0,0,.95) 100%);pointer-events:none'
          )}
        />
        <div style={css('position:relative;max-width:1100px;margin:0 auto;width:100%;padding:clamp(90px,12vw,130px) clamp(20px,5vw,64px) clamp(56px,8vw,90px)')}>
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px')}>
            Pour les salles
          </div>
          <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,5.5vw,46px);letter-spacing:-1.5px;line-height:1.05;max-width:20ch")}>
            VOTRE SALLE A DES ENJEUX.
            <br />
            GBÔ APPORTE DES SOLUTIONS.
          </h1>
          <p style={css('font-size:clamp(16px,2.2vw,20px);color:var(--muted,#c8c8c8);max-width:62ch;margin-top:20px;line-height:1.5')}>
            Attirer, convertir, gérer, fidéliser et développer une salle demande plus que de bons équipements. GBÔ accompagne les acteurs du
            fitness sur les différents leviers de leur développement.
          </p>
          <div style={css('display:flex;flex-wrap:wrap;gap:12px;margin-top:30px')}>
            <a href="#piliers" className="btn-cta" style={css('padding:16px 28px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:15px')}>
              Découvrir nos solutions
            </a>
            <Link
              href="/contact"
              className="btn-cta"
              style={css('padding:16px 28px;border-radius:12px;border:1px solid rgba(255,255,255,.3);color:#fff;font-weight:700;font-size:15px')}
            >
              Parler à GBÔ
            </Link>
          </div>
        </div>
      </section>

      <Reveal as="section" style={css('padding:clamp(56px,8vw,90px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:600;margin-bottom:14px')}>
            Les enjeux d&apos;une salle
          </div>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:14px')}>
            {GYM_CHALLENGES.map((c, i) => (
              <Reveal
                key={c.t}
                delay={i * 60}
                className="hover-card"
                style={css('padding:24px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.09));background:var(--glass,rgba(255,255,255,.02))')}
              >
                <div style={css('width:10px;height:10px;border-radius:3px;background:var(--lime,#C6F202);margin-bottom:14px')} />
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{c.t}</div>
                <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a);line-height:1.5')}>{c.d}</div>
              </Reveal>
            ))}
          </div>
          <p style={css('margin-top:26px;font-size:15px;font-weight:600;color:var(--fg,#fff)')}>GBÔ intervient sur chacun de ces leviers.</p>
        </div>
      </Reveal>

      <Reveal
        as="section"
        id="piliers"
        style={css('padding:clamp(56px,8vw,90px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b);border-top:1px solid var(--border,rgba(255,255,255,.08));border-bottom:1px solid var(--border,rgba(255,255,255,.08))')}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:18px')}>
            {GYM_PILLARS.map((p, i) => (
              <Reveal
                key={p.n}
                delay={i * 70}
                className="hover-card"
                style={css(
                  'padding:clamp(28px,3.5vw,38px);border-radius:24px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--glass,rgba(255,255,255,.03));display:flex;flex-direction:column'
                )}
              >
                <div style={css('display:flex;align-items:center;gap:12px;margin-bottom:16px')}>
                  <span style={css("font-family:'Broaven';font-weight:700;font-size:22px;color:var(--lime,#C6F202)")}>{p.n}</span>
                  <span style={css('font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:700')}>{p.lever}</span>
                </div>
                <h2 style={css("font-family:'Broaven';font-weight:700;font-size:24px;letter-spacing:-0.5px;margin-bottom:14px;line-height:1.15")}>
                  {p.title}
                </h2>
                {p.product && <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{p.product}</div>}
                <p style={css('font-size:14px;color:var(--muted,#8a8a8a);line-height:1.6;flex:1')}>{p.detail}</p>
                <Link href={p.href} style={css('margin-top:22px;font-size:14px;font-weight:700;color:var(--lime,#C6F202);display:inline-flex;align-items:center;gap:6px')}>
                  {p.cta} →
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(48px,6vw,70px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:10px')}>
            Besoin d&apos;aller plus loin ?
          </div>
          <p style={css('font-size:16px;color:var(--muted,#8a8a8a);margin-bottom:26px;max-width:60ch')}>
            Complétez votre accompagnement avec nos services spécialisés.
          </p>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px')}>
            {GYM_COMPLEMENTARY_SERVICES.map((s, i) => (
              <Reveal key={s.t} delay={i * 50} className="hover-card" style={css('padding:20px;border-radius:14px;border:1px solid var(--border,rgba(255,255,255,.08))')}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{s.t}</div>
                <div style={css('font-size:13px;color:var(--muted,#8a8a8a);line-height:1.5')}>{s.d}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(56px,8vw,90px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b);border-top:1px solid var(--border,rgba(255,255,255,.08))')}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(26px,4vw,36px);letter-spacing:-1px;margin-bottom:36px;line-height:1.2")}>
            Vous avez un enjeu. Nous construisons la réponse.
          </h2>
          <div style={css('display:grid;gap:0')}>
            {GYM_HOW_IT_WORKS.map((s, i) => (
              <div key={s.n}>
                <div style={css('display:flex;align-items:center;gap:16px;padding:18px 0;text-align:left')}>
                  <span
                    style={css(
                      "flex:0 0 auto;width:42px;height:42px;border-radius:50%;border:1px solid var(--lime,#C6F202);color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center;font-family:'Broaven';font-weight:700;font-size:15px"
                    )}
                  >
                    {s.n}
                  </span>
                  <span style={{ fontWeight: 700, fontSize: 16.5 }}>{s.t}</span>
                </div>
                {i < GYM_HOW_IT_WORKS.length - 1 && (
                  <div style={css('display:flex;justify-content:flex-start;padding-left:20px')}>
                    <span style={{ color: 'var(--lime,#C6F202)', fontSize: 18 }}>↓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(64px,9vw,110px) clamp(20px,5vw,64px);background:#000;text-align:center')}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,4.5vw,42px);letter-spacing:-1px;margin-bottom:16px;line-height:1.15")}>
            Prêt à faire évoluer votre salle ?
          </h2>
          <p style={css('font-size:16px;color:var(--muted,#8a8a8a);margin-bottom:30px;line-height:1.5')}>
            Parlons de vos objectifs et identifions ensemble les solutions adaptées.
          </p>
          <Link
            href="/contact"
            className="btn-cta"
            style={css('display:inline-block;padding:18px 32px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:16px')}
          >
            Échanger avec GBÔ →
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
