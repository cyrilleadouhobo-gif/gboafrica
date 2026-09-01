import Link from 'next/link';
import { css } from '../../../lib/css.js';
import ImageSlot from '../../../components/ImageSlot.js';
import Reveal from '../../../components/Reveal.js';
import GlowBlobs from '../../../components/GlowBlobs.js';
import { stockPhoto } from '../../../lib/stockPhoto.js';
import { GYM_ECOSYSTEM_ADVANTAGES } from '../../../data/content.js';

export const metadata = {
  title: 'GBÔ Partner Gym — Réseau de salles partenaires',
};

export default function SallesPartenairesPage() {
  return (
    <div>
      <section
        style={css(
          'position:relative;overflow:hidden;padding:clamp(80px,10vw,120px) clamp(20px,5vw,64px) clamp(30px,4vw,50px);border-bottom:1px solid var(--border,rgba(255,255,255,.08))'
        )}
      >
        <ImageSlot placeholder="Visuel — réseau de salles partenaires" src={stockPhoto('community', 'salles-partenaires-hero', '1600x900')} />
        <div
          style={css(
            'position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.85) 0%,rgba(0,0,0,.6) 45%,rgba(0,0,0,.35) 75%),linear-gradient(180deg,rgba(0,0,0,.5) 0%,rgba(0,0,0,.35) 45%,rgba(0,0,0,.85) 100%);pointer-events:none'
          )}
        />
        <GlowBlobs />
        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative' }}>
          <div style={css('font-size:13px;color:var(--muted,#c0c0c0);margin-bottom:20px')}>
            <Link href="/">Accueil</Link> <span style={{ opacity: 0.5 }}>/</span> <Link href="/fitness">GBÔ Fitness</Link>{' '}
            <span style={{ opacity: 0.5 }}>/</span> Salles partenaires
          </div>
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px')}>
            GBÔ Partner Gym
          </div>
          <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,6vw,54px);letter-spacing:-1.5px;max-width:18ch")}>
            Rejoignez le réseau de salles partenaires GBÔ.
          </h1>
          <p style={css('font-size:clamp(16px,2.2vw,20px);color:var(--muted,#c8c8c8);max-width:60ch;margin-top:20px;line-height:1.5')}>
            Développez votre salle, digitalisez votre gestion et bénéficiez de nouvelles opportunités grâce à l&apos;écosystème GBÔ.
          </p>
          <Link
            href="/devenir-salle-partenaire"
            className="btn-cta"
            style={css('margin-top:30px;display:inline-block;padding:16px 28px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:16px')}
          >
            Devenir salle partenaire
          </Link>
        </div>
      </section>

      <Reveal as="section" style={css('padding:clamp(48px,7vw,80px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:600;margin-bottom:24px')}>
            Les avantages
          </div>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px')}>
            {GYM_ECOSYSTEM_ADVANTAGES.map((a, i) => (
              <Reveal key={a.t} delay={i * 60} className="hover-card" style={css('padding:26px;border-radius:18px;border:1px solid var(--border,rgba(255,255,255,.09))')}>
                <div style={{ fontSize: 26, marginBottom: 12 }}>{a.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{a.t}</div>
                <div style={css('font-size:14px;color:var(--muted,#8a8a8a);line-height:1.55')}>{a.d}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(20px,3vw,40px) clamp(20px,5vw,64px) clamp(64px,9vw,110px)')}>
        <div
          style={css(
            'max-width:900px;margin:0 auto;padding:clamp(28px,4vw,44px);border-radius:24px;border:1px solid var(--border,rgba(255,255,255,.12));background:var(--surface,#0c0c0c);text-align:center'
          )}
        >
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:26px;margin-bottom:10px")}>Vous gérez une salle de sport ?</h2>
          <p style={css('font-size:15px;color:var(--muted,#8a8a8a);max-width:56ch;margin:0 auto 22px;line-height:1.55')}>
            Découvrez comment votre établissement peut rejoindre l&apos;écosystème GBÔ et déposez votre candidature en quelques minutes.
          </p>
          <Link
            href="/devenir-salle-partenaire"
            className="btn-cta"
            style={css('display:inline-block;padding:16px 28px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:16px')}
          >
            Devenir salle partenaire
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
