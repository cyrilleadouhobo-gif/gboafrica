import { css } from '../../lib/css.js';
import ImageSlot from '../../components/ImageSlot.js';
import Reveal from '../../components/Reveal.js';
import GlowBlobs from '../../components/GlowBlobs.js';
import { stockPhoto } from '../../lib/stockPhoto.js';
import { VALUES } from '../../data/content.js';

export const metadata = { title: 'À propos — GBÔ AFRICA GROUP' };

export default function AboutPage() {
  return (
    <div>
      <section style={css('position:relative;padding:clamp(80px,10vw,130px) clamp(20px,5vw,64px) clamp(40px,5vw,60px)')}>
        <GlowBlobs />
        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative' }}>
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:16px')}>À propos</div>
          <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,6.5vw,62px);letter-spacing:-2px;line-height:1;max-width:18ch")}>
            Nous croyons que le sport change des vies.
          </h1>
          <p style={css('font-size:clamp(17px,2.4vw,22px);color:var(--muted,#8a8a8a);max-width:62ch;margin-top:22px;line-height:1.5')}>
            GBÔ AFRICA GROUP est né d&apos;une conviction : rendre le sport, le fitness et le bien-être accessibles à tous, partout, à chaque étape de la vie.
            Plus qu&apos;une pratique — un style de vie.
          </p>
        </div>
      </section>

      <Reveal as="section" style={css('padding:0 clamp(20px,5vw,64px) clamp(48px,7vw,90px)')}>
        <div style={{ maxWidth: 1100, margin: '0 auto', aspectRatio: '21/9', borderRadius: 24, overflow: 'hidden', border: '1px solid var(--border,rgba(255,255,255,.1))', position: 'relative' }}>
          <ImageSlot placeholder="Visuel équipe / communauté GBÔ" src={stockPhoto('team', 'about-hero', '1600x700')} />
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(48px,7vw,90px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b);border-top:1px solid var(--border,rgba(255,255,255,.08))')}>
        <div style={css('max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:clamp(30px,5vw,64px)')}>
          <div>
            <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px')}>Mission</div>
            <p style={{ fontSize: 19, lineHeight: 1.55, fontWeight: 500 }}>
              Développer des solutions innovantes permettant à chaque individu et à chaque organisation d&apos;intégrer durablement le sport et le bien-être dans
              leur quotidien.
            </p>
          </div>
          <div>
            <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px')}>Vision</div>
            <p style={{ fontSize: 19, lineHeight: 1.55, fontWeight: 500 }}>Devenir la référence africaine du sport, du fitness et du bien-être accessible à tous.</p>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(48px,7vw,90px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,3.5vw,34px);letter-spacing:-1px;margin-bottom:28px")}>Nos valeurs</h2>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px')}>
            {VALUES.map((v, i) => (
              <Reveal key={v.n} delay={i * 70} className="hover-card" style={css('padding:22px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.09))')}>
                <div style={css("color:var(--lime,#C6F202);font-family:'Broaven';font-weight:700;margin-bottom:8px")}>{v.n}</div>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 5 }}>{v.title}</div>
                <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a);line-height:1.5')}>{v.desc}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:0 clamp(20px,5vw,64px) clamp(64px,9vw,110px)')}>
        <div
          style={css(
            'max-width:1100px;margin:0 auto;padding:clamp(30px,5vw,56px);border-radius:24px;background:var(--lime,#C6F202);color:#000;display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:24px;text-align:center'
          )}
        >
          <div>
            <div style={css("font-family:'Broaven';font-weight:700;font-size:clamp(30px,5vw,48px)")}>6</div>
            <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.75 }}>pôles dans l&apos;écosystème</div>
          </div>
          <div>
            <div style={css("font-family:'Broaven';font-weight:700;font-size:clamp(30px,5vw,48px)")}>5</div>
            <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.75 }}>étapes de la Méthode GBÔ</div>
          </div>
          <div>
            <div style={css("font-family:'Broaven';font-weight:700;font-size:clamp(30px,5vw,48px)")}>Abidjan</div>
            <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.75 }}>Côte d&apos;Ivoire · UEMOA demain</div>
          </div>
          <div>
            <div style={css("font-family:'Broaven';font-weight:700;font-size:clamp(30px,5vw,48px)")}>2 000</div>
            <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.75 }}>FCFA/mois · Club Premium</div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
