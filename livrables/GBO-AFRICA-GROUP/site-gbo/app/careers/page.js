import Link from 'next/link';
import { css } from '../../lib/css.js';
import Reveal from '../../components/Reveal.js';
import GlowBlobs from '../../components/GlowBlobs.js';
import { JOBS } from '../../data/content.js';

export const metadata = { title: 'Carrières — GBÔ AFRICA GROUP' };

export default function CareersPage() {
  return (
    <div>
      <section style={css('position:relative;padding:clamp(80px,10vw,120px) clamp(20px,5vw,64px) clamp(30px,4vw,50px)')}>
        <GlowBlobs />
        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative' }}>
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px')}>Carrières</div>
          <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,6vw,54px);letter-spacing:-1.5px;max-width:16ch")}>
            Construisez le mouvement avec nous.
          </h1>
          <p style={css('font-size:clamp(16px,2.2vw,20px);color:var(--muted,#8a8a8a);max-width:58ch;margin-top:20px;line-height:1.5')}>
            Rejoignez GBÔ en interne ou intégrez notre réseau de coachs partenaires certifiés.
          </p>
        </div>
      </section>
      <Reveal as="section" style={css('padding:clamp(20px,3vw,40px) clamp(20px,5vw,64px) clamp(40px,6vw,70px)')}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gap: 12 }}>
          {JOBS.map((j, i) => (
            <Reveal
              key={j.t}
              delay={i * 50}
              className="hover-card"
              style={css('display:flex;justify-content:space-between;align-items:center;gap:16px;padding:22px 24px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.09));flex-wrap:wrap')}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{j.t}</div>
                <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a);margin-top:3px')}>
                  {j.loc} · {j.type}
                </div>
              </div>
              <Link
                href={`/careers/postuler?poste=${encodeURIComponent(j.t)}`}
                style={css('padding:11px 20px;border-radius:11px;border:1px solid var(--border,rgba(255,255,255,.2));font-weight:700;font-size:14px;color:var(--fg,#fff)')}
              >
                Postuler →
              </Link>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
