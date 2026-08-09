import { css } from '../../lib/css.js';
import CoachApplicationForm from '../../components/CoachApplicationForm.js';
import ImageSlot from '../../components/ImageSlot.js';
import { stockPhoto } from '../../lib/stockPhoto.js';
import { TESTIMONIALS } from '../../data/content.js';

export const metadata = { title: 'Devenir coach GBÔ — Rejoignez le réseau' };

const BENEFITS = [
  { t: 'Un flux de clients qualifiés', d: 'GBÔ Fitness qualifie et attribue les prospects selon votre spécialité, votre zone et vos disponibilités — vous n\'avez pas à prospecter.' },
  { t: 'Un référentiel qualité exigeant', d: 'Sélection, formation continue et suivi de la satisfaction : le label GBÔ est une garantie pour vos futurs clients.' },
  { t: 'Une communauté de coachs', d: 'Échangez avec un réseau de professionnels certifiés dans toute l\'agglomération d\'Abidjan.' },
  { t: 'Un accompagnement administratif', d: 'GBÔ gère la mise en relation, le suivi et la facturation ; vous vous concentrez sur le coaching.' },
];

const coachTestimonial = TESTIMONIALS.find((t) => t.id === 'ts3');

export default function DevenirCoachPage() {
  return (
    <div>
      <section style={css('position:relative;padding:clamp(80px,10vw,130px) clamp(20px,5vw,64px) clamp(48px,6vw,80px);overflow:hidden;background:#060606')}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
          <ImageSlot placeholder="Coach GBÔ en séance" src={stockPhoto('fitnessMen', 'devenir-coach-hero', '1600x900')} />
        </div>
        <div style={css('position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.6),rgba(0,0,0,.92));pointer-events:none')} />
        <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:16px')}>
            Réseau de coachs
          </div>
          <h1 style={css("font-family:'Big Shoulders Display';font-weight:700;font-size:clamp(34px,6.5vw,64px);letter-spacing:-2px;line-height:1;max-width:18ch;color:#fff")}>
            Coachez selon vos règles. GBÔ apporte les clients.
          </h1>
          <p style={css('font-size:clamp(16px,2.2vw,20px);color:rgba(255,255,255,.85);max-width:56ch;margin-top:20px;line-height:1.5')}>
            Rejoignez le réseau de coachs sportifs sélectionnés et formés par GBÔ AFRICA GROUP à Abidjan.
          </p>
          <a
            href="#candidature"
            style={css('display:inline-block;margin-top:30px;padding:16px 30px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:16px')}
          >
            Postuler maintenant
          </a>
        </div>
      </section>

      <section style={css('padding:clamp(56px,8vw,100px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={css("font-family:'Big Shoulders Display';font-weight:700;font-size:clamp(24px,3.5vw,34px);letter-spacing:-1px;margin-bottom:28px")}>
            Pourquoi rejoindre le réseau GBÔ
          </h2>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px')}>
            {BENEFITS.map((b) => (
              <div key={b.t} style={css('padding:22px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.09))')}>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{b.t}</div>
                <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a);line-height:1.55')}>{b.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {coachTestimonial && (
        <section style={css('padding:clamp(20px,3vw,40px) clamp(20px,5vw,64px) clamp(56px,8vw,90px);background:var(--surface,#0b0b0b);border-top:1px solid var(--border,rgba(255,255,255,.08));border-bottom:1px solid var(--border,rgba(255,255,255,.08))')}>
          <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
            <p style={css("font-family:'Big Shoulders Display';font-weight:600;font-size:clamp(20px,3vw,28px);line-height:1.3")}>{coachTestimonial.quote}</p>
            <div style={css('margin-top:18px;font-size:14px;font-weight:700')}>{coachTestimonial.name}</div>
            <div style={css('font-size:13px;color:var(--muted,#8a8a8a)')}>{coachTestimonial.role}</div>
          </div>
        </section>
      )}

      <section id="candidature" style={css('padding:clamp(56px,8vw,100px) clamp(20px,5vw,64px)')}>
        <div
          style={css(
            'max-width:760px;margin:0 auto;padding:clamp(28px,4vw,44px);border-radius:24px;border:1px solid var(--border,rgba(255,255,255,.12));background:var(--surface,#0c0c0c)'
          )}
        >
          <h2 style={css("font-family:'Big Shoulders Display';font-weight:700;font-size:26px;margin-bottom:6px")}>Votre candidature</h2>
          <p style={css('color:var(--muted,#8a8a8a);font-size:14.5px;margin-bottom:24px;line-height:1.5')}>
            Indiquez votre spécialité et vos zones de préférence — un conseiller GBÔ vous recontacte pour la suite du processus.
          </p>
          <CoachApplicationForm />
        </div>
      </section>
    </div>
  );
}
