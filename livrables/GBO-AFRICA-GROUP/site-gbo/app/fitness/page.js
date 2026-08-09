import Link from 'next/link';
import { css } from '../../lib/css.js';
import { METHOD_STEPS } from '../../data/content.js';

export const metadata = {
  title: 'GBÔ Fitness — Un accompagnement sportif, pensé pour vous.',
};

export default function FitnessPage() {
  return (
    <div>
      <section style={css('padding:clamp(80px,10vw,120px) clamp(20px,5vw,64px) clamp(30px,4vw,50px);border-bottom:1px solid var(--border,rgba(255,255,255,.08))')}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={css('font-size:13px;color:var(--muted,#8a8a8a);margin-bottom:20px')}>
            <Link href="/">Accueil</Link> <span style={{ opacity: 0.5 }}>/</span> GBÔ Fitness
          </div>
          <span style={css('display:inline-block;padding:5px 12px;border-radius:20px;background:var(--lime,#C6F202);color:#000;font-size:12px;font-weight:700;margin-bottom:16px')}>
            ● Disponible
          </span>
          <h1 style={css("font-family:'Big Shoulders Display';font-weight:700;font-size:clamp(34px,6vw,60px);letter-spacing:-1.5px;line-height:1;max-width:16ch")}>
            Un accompagnement sportif, pensé pour vous.
          </h1>
          <p style={css('font-size:clamp(16px,2.2vw,20px);color:var(--muted,#8a8a8a);max-width:56ch;margin-top:20px;line-height:1.5')}>
            Choisissez le type d&apos;accompagnement recherché. Aucun compte n&apos;est requis pour démarrer.
          </p>
        </div>
      </section>

      <section style={css('padding:clamp(40px,6vw,72px) clamp(20px,5vw,64px)')}>
        <div style={css('max-width:1000px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:18px')}>
          <div
            style={css(
              'padding:clamp(28px,4vw,44px);border-radius:24px;border:1px solid var(--border,rgba(255,255,255,.12));background:var(--glass,rgba(255,255,255,.03));display:flex;flex-direction:column;backdrop-filter:blur(8px)'
            )}
          >
            <div
              style={css(
                'width:52px;height:52px;border-radius:14px;background:var(--lime,#C6F202);color:#000;display:flex;align-items:center;justify-content:center;margin-bottom:22px'
              )}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
              </svg>
            </div>
            <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:600;margin-bottom:8px')}>Pour moi</div>
            <h2 style={css("font-family:'Big Shoulders Display';font-weight:700;font-size:28px;margin-bottom:14px")}>Particulier</h2>
            <p style={css('font-size:15.5px;color:var(--muted,#8a8a8a);line-height:1.6;flex:1')}>
              Je souhaite bénéficier d&apos;un accompagnement sportif personnalisé afin d&apos;améliorer ma santé, ma condition physique ou mes performances.
            </p>
            <Link
              href="/fitness/tunnel"
              style={css('margin-top:26px;width:100%;padding:16px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:16px;display:block;text-align:center')}
            >
              Commencer
            </Link>
          </div>
          <div
            style={css(
              'padding:clamp(28px,4vw,44px);border-radius:24px;border:1px solid var(--border,rgba(255,255,255,.12));background:var(--glass,rgba(255,255,255,.03));display:flex;flex-direction:column;backdrop-filter:blur(8px)'
            )}
          >
            <div
              style={css(
                'width:52px;height:52px;border-radius:14px;border:1px solid var(--lime,#C6F202);color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center;margin-bottom:22px'
              )}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21V7l7-4v6l7-4v16" />
                <path d="M3 21h18" />
              </svg>
            </div>
            <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--muted,#8a8a8a);font-weight:600;margin-bottom:8px')}>Pour mes équipes</div>
            <h2 style={css("font-family:'Big Shoulders Display';font-weight:700;font-size:28px;margin-bottom:14px")}>Entreprise</h2>
            <p style={css('font-size:15.5px;color:var(--muted,#8a8a8a);line-height:1.6;flex:1')}>
              Je souhaite mettre en place un programme Sport &amp; Bien-être pour améliorer la santé et la qualité de vie de mes collaborateurs.
            </p>
            <Link
              href="/corporate"
              style={css('margin-top:26px;width:100%;padding:16px;border-radius:12px;border:1px solid var(--fg,#fff);color:var(--fg,#fff);font-weight:700;font-size:16px;background:transparent;display:block;text-align:center')}
            >
              Découvrir nos solutions
            </Link>
          </div>
        </div>
      </section>

      <section style={css('padding:clamp(56px,9vw,110px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b);border-top:1px solid var(--border,rgba(255,255,255,.08))')}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:10px')}>Actif de marque</div>
          <h2 style={css("font-family:'Big Shoulders Display';font-weight:700;font-size:clamp(28px,4.5vw,44px);letter-spacing:-1px;margin-bottom:8px")}>La Méthode GBÔ</h2>
          <p style={css('color:var(--muted,#8a8a8a);font-size:16px;max-width:60ch;margin-bottom:40px;line-height:1.5')}>
            Cinq étapes pour transformer une intention en mode de vie durable.
          </p>
          <div style={css('position:relative;display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px')}>
            {METHOD_STEPS.map((m) => (
              <div key={m.n} style={{ position: 'relative', paddingTop: 20 }}>
                <div style={css('position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--lime,#C6F202),transparent)')} />
                <div
                  style={css(
                    "width:46px;height:46px;border-radius:50%;background:var(--lime,#C6F202);color:#000;display:flex;align-items:center;justify-content:center;font-family:'Big Shoulders Display';font-weight:700;font-size:20px;margin-bottom:16px"
                  )}
                >
                  {m.n}
                </div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{m.title}</div>
                <div style={css('font-size:14px;color:var(--muted,#8a8a8a);line-height:1.55')}>{m.desc}</div>
              </div>
            ))}
          </div>
          <div style={css('margin-top:40px;padding:18px 22px;border-radius:14px;border:1px solid rgba(251,191,36,.3);background:rgba(251,191,36,.06);display:flex;gap:14px;align-items:flex-start')}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" style={{ flex: '0 0 auto', marginTop: 1 }}>
              <path d="M12 9v4M12 17h.01M10.3 3.9L2 18a2 2 0 001.7 3h16.6a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" />
            </svg>
            <p style={css('font-size:13.5px;color:var(--muted,#8a8a8a);line-height:1.55')}>
              Le coach GBÔ n&apos;est ni médecin ni nutritionniste. L&apos;accompagnement complète et ne remplace pas le suivi médical ; une validation médicale
              préalable est recommandée, en particulier pour les programmes prénatal, postnatal et senior.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
