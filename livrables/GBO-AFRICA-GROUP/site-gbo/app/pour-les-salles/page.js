import Link from 'next/link';
import { css } from '../../lib/css.js';
import ImageSlot from '../../components/ImageSlot.js';
import Reveal from '../../components/Reveal.js';
import GlowBlobs from '../../components/GlowBlobs.js';
import { stockPhoto } from '../../lib/stockPhoto.js';

export const metadata = {
  title: 'Pour les salles — GBÔ accompagne les acteurs du fitness',
};

const TWO_SOLUTIONS = [
  {
    label: 'E-Gym',
    title: 'La gestion de votre salle, simplement.',
    desc: "Centralisez la gestion de vos clients, abonnements, paiements, renouvellements, dépenses, stocks et indicateurs d'activité depuis une seule plateforme.",
    cta: 'Découvrir E-Gym',
    href: '/devenir-salle-partenaire',
  },
  {
    label: 'Mise à disposition de personnel',
    title: 'Les profils dont votre salle a besoin.',
    desc: 'GBÔ recrute, sélectionne et met à votre disposition des profils adaptés à votre activité, tout en prenant en charge leur gestion contractuelle, administrative et leur suivi.',
    cta: 'Découvrir la solution',
    href: '/mise-a-disposition-de-personnel',
  },
];

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
        <GlowBlobs />
        <div style={css('position:relative;max-width:1100px;margin:0 auto;width:100%;padding:clamp(90px,12vw,130px) clamp(20px,5vw,64px) clamp(56px,8vw,90px)')}>
          <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,5.5vw,46px);letter-spacing:-1.5px;line-height:1.05;max-width:20ch")}>
            FAITES AVANCER
            <br />
            VOTRE SALLE DE SPORT
          </h1>
          <p style={css('font-size:clamp(16px,2.2vw,20px);color:var(--muted,#c8c8c8);max-width:62ch;margin-top:20px;line-height:1.5')}>
            Simplifiez la gestion de votre salle et disposez des profils dont vous avez besoin pour développer votre activité.
          </p>
          <div style={css('display:flex;justify-content:center;flex-wrap:wrap;gap:12px;margin-top:30px')}>
            <a href="#piliers" className="btn-cta" style={css('padding:16px 28px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:15px')}>
              Découvrir nos solutions
            </a>
          </div>
        </div>
      </section>

      <Reveal as="section" style={css('position:relative;padding:clamp(48px,7vw,80px) clamp(20px,5vw,64px);overflow:hidden')}>
        {/* Halos personnalisés (pas le composant GlowBlobs standard, qui n'en pose que 2 en
            coins opposés) : un en bas à gauche, un au centre derrière le texte, un plus
            grand en haut à droite. */}
        <div className="glow-blobs" aria-hidden="true">
          <span className="glow-blob" style={{ bottom: -60, left: -60, width: 240, height: 240, animationDelay: '-4s' }} />
          <span className="glow-blob" style={{ top: '50%', left: '50%', width: 320, height: 320, marginTop: -160, marginLeft: -160 }} />
          <span className="glow-blob" style={{ top: -100, right: -100, width: 380, height: 380, animationDelay: '-10s' }} />
        </div>
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,4vw,36px);letter-spacing:-1px;line-height:1.15;margin-bottom:18px")}>
            DES SOLUTIONS PENSÉES POUR LES SALLES DE SPORT
          </h2>
          <p style={css('font-size:clamp(16px,2vw,19px);color:var(--muted,#8a8a8a);line-height:1.55')}>
            Chaque salle a ses propres besoins. Nous développons des solutions pour vous aider à mieux gérer votre activité et à disposer des ressources
            nécessaires à son bon fonctionnement.
          </p>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(32px,5vw,56px) clamp(20px,5vw,64px) clamp(56px,8vw,90px)')}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,3.5vw,34px);letter-spacing:-1px;margin-bottom:28px")}>Les deux solutions</h2>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr));gap:18px')}>
            {TWO_SOLUTIONS.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 80}
                className="hover-card hover-card-lime"
                style={css(
                  'padding:clamp(28px,3.5vw,38px);border-radius:24px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--glass,rgba(255,255,255,.03));display:flex;flex-direction:column'
                )}
              >
                <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px')}>
                  {s.label}
                </div>
                <h3 style={css("font-family:'Broaven';font-weight:700;font-size:22px;letter-spacing:-0.5px;margin-bottom:14px;line-height:1.25")}>
                  {s.title}
                </h3>
                <p style={css('font-size:15px;color:var(--muted,#8a8a8a);line-height:1.6;flex:1')}>{s.desc}</p>
                <Link
                  href={s.href}
                  style={css('margin-top:22px;font-size:14px;font-weight:700;color:var(--lime,#C6F202);display:inline-flex;align-items:center;gap:6px')}
                >
                  {s.cta} →
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(48px,7vw,80px) clamp(20px,5vw,64px);background:var(--lime,#C6F202);color:#000')}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(26px,4.5vw,42px);letter-spacing:-1.5px;line-height:1.05")}>
            VOUS AVEZ UN BESOIN ?
          </h2>
          <p style={css('font-size:clamp(15px,2vw,18px);margin:16px auto 30px;max-width:52ch;opacity:.85;line-height:1.5')}>
            Parlez-nous de votre salle. Nous vous orienterons vers la solution la plus adaptée à votre situation.
          </p>
          <Link
            href="/contact"
            className="btn-cta"
            style={css('padding:16px 34px;border-radius:12px;background:#000;color:#C6F202;font-weight:700;font-size:15px;display:inline-block')}
          >
            Parler à GBÔ
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
