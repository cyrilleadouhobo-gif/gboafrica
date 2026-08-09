import Link from 'next/link';
import { css } from '../../lib/css.js';
import CoachApplicationForm from '../../components/CoachApplicationForm.js';
import { JOBS } from '../../data/content.js';

export const metadata = { title: 'Carrières — GBÔ AFRICA GROUP' };

export default function CareersPage() {
  return (
    <div>
      <section style={css('padding:clamp(80px,10vw,120px) clamp(20px,5vw,64px) clamp(30px,4vw,50px)')}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px')}>Carrières</div>
          <h1 style={css("font-family:'Big Shoulders Display';font-weight:700;font-size:clamp(34px,6vw,60px);letter-spacing:-1.5px;max-width:16ch")}>
            Construisez le mouvement avec nous.
          </h1>
          <p style={css('font-size:clamp(16px,2.2vw,20px);color:var(--muted,#8a8a8a);max-width:58ch;margin-top:20px;line-height:1.5')}>
            Rejoignez GBÔ en interne ou intégrez notre réseau de coachs partenaires certifiés.
          </p>
        </div>
      </section>
      <section style={css('padding:clamp(20px,3vw,40px) clamp(20px,5vw,64px) clamp(40px,6vw,70px)')}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gap: 12 }}>
          {JOBS.map((j) => (
            <div
              key={j.t}
              style={css('display:flex;justify-content:space-between;align-items:center;gap:16px;padding:22px 24px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.09));flex-wrap:wrap')}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{j.t}</div>
                <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a);margin-top:3px')}>
                  {j.loc} · {j.type}
                </div>
              </div>
              <a
                href="#apply"
                style={css('padding:11px 20px;border-radius:11px;border:1px solid var(--border,rgba(255,255,255,.2));font-weight:700;font-size:14px;color:var(--fg,#fff)')}
              >
                Postuler →
              </a>
            </div>
          ))}
        </div>
      </section>
      <section id="apply" style={css('padding:clamp(20px,3vw,40px) clamp(20px,5vw,64px) clamp(64px,9vw,110px)')}>
        <div
          style={css(
            'max-width:760px;margin:0 auto;padding:clamp(28px,4vw,44px);border-radius:24px;border:1px solid var(--border,rgba(255,255,255,.12));background:var(--surface,#0c0c0c)'
          )}
        >
          <div style={css('display:inline-block;padding:5px 12px;border-radius:20px;background:var(--lime,#C6F202);color:#000;font-size:12px;font-weight:700;margin-bottom:14px')}>
            Passerelle réseau
          </div>
          <h2 style={css("font-family:'Big Shoulders Display';font-weight:700;font-size:26px;margin-bottom:6px")}>Devenir coach GBÔ</h2>
          <p style={css('color:var(--muted,#8a8a8a);font-size:14.5px;margin-bottom:8px;line-height:1.5')}>Candidature spontanée — rejoignez le référentiel qualité GBÔ.</p>
          <p style={css('font-size:13.5px;margin-bottom:24px')}>
            <Link href="/devenir-coach" style={{ color: 'var(--lime,#C6F202)', fontWeight: 600 }}>
              En savoir plus sur le réseau de coachs GBÔ →
            </Link>
          </p>
          <CoachApplicationForm />
        </div>
      </section>
    </div>
  );
}
