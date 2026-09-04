import Link from 'next/link';
import { css } from '../../lib/css.js';
import ImageSlot from '../../components/ImageSlot.js';
import Reveal from '../../components/Reveal.js';
import GlowBlobs from '../../components/GlowBlobs.js';
import { stockPhoto } from '../../lib/stockPhoto.js';

export const metadata = {
  title: 'Mise à disposition de personnel — GBÔ AFRICA GROUP',
};

// Reproduction adaptée (couleurs GBÔ) d'une maquette de référence fournie par Cyrille.
// Photos Pexels vetted lors de la session « Nos coachs » (sujets noirs/africains confirmés
// visuellement, pas de logo de marque tierce) : mêmes IDs réutilisés ici pour cohérence.
const COACH_PHOTO = 'https://images.pexels.com/photos/8612491/pexels-photo-8612491.jpeg?auto=compress&cs=tinysrgb&w=600';
const MANAGER_PHOTO = 'https://images.pexels.com/photos/23366059/pexels-photo-23366059.jpeg?auto=compress&cs=tinysrgb&w=600';

const TRUST_POINTS = [
  {
    t: 'Des profils qualifiés',
    icon: (
      <>
        <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
      </>
    ),
  },
  {
    t: 'Un gain de temps',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </>
    ),
  },
  {
    t: 'Un accompagnement continu',
    icon: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M2 21c0-3.5 3-6 7-6s7 2.5 7 6" />
        <path d="M16 4.5c1.7.4 3 2 3 3.9s-1.3 3.5-3 3.9" />
        <path d="M20 15c1.8.5 3 2 3 3.9" />
      </>
    ),
  },
];

const PROFILES = [
  {
    name: 'Coach sportif',
    desc: 'Pour encadrer, motiver et accompagner vos adhérents au quotidien.',
    levels: ['Junior', 'Confirmé', 'Senior / Expert'],
    photo: COACH_PHOTO,
  },
  {
    name: 'Gérant / Responsable de salle',
    desc: 'Pour assurer la gestion opérationnelle et le bon fonctionnement de votre établissement.',
    levels: ['Junior', 'Confirmé', 'Senior'],
    photo: MANAGER_PHOTO,
  },
];

const SERVICE_STEPS = [
  {
    t: 'Recrutement',
    d: 'Recherche et sélection des profils adaptés.',
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </>
    ),
  },
  {
    t: 'Contractualisation',
    d: 'Gestion des contrats et des démarches associées.',
    icon: (
      <>
        <path d="M7 3h8l4 4v14H7z" />
        <path d="M9 12h6M9 16h6" />
      </>
    ),
  },
  {
    t: 'Mise à disposition',
    d: 'Affectation du personnel dans votre salle.',
    icon: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="8" r="2.5" />
        <path d="M2 21c0-3.5 3-6 7-6s7 2.5 7 6" />
        <path d="M16.5 15.2c2.6.5 4.5 2.7 4.5 5.8" />
      </>
    ),
  },
  {
    t: 'Suivi',
    d: 'Accompagnement et suivi du personnel dans la durée.',
    icon: (
      <>
        <path d="M4 19V9M11 19V4M18 19v-7" />
      </>
    ),
  },
];

const HOW_IT_WORKS = [
  { n: '01', t: 'Vous nous présentez votre besoin', d: 'Vous nous indiquez le profil recherché et les conditions.' },
  { n: '02', t: 'GBÔ recherche et sélectionne les profils', d: 'Nous identifions et évaluons les candidats adaptés.' },
  { n: '03', t: 'Vous validez le profil', d: 'Vous choisissez le profil qui correspond à votre besoin.' },
  { n: '04', t: 'GBÔ organise la mise à disposition et assure le suivi', d: 'Nous gérons les étapes finales et restons à vos côtés.' },
];

export default function MiseADispositionDePersonnelPage() {
  return (
    <div>
      <section style={css('position:relative;padding:clamp(72px,10vw,120px) clamp(20px,5vw,64px) clamp(56px,8vw,90px);overflow:hidden;background:#050505')}>
        <GlowBlobs />
        <div style={{ position: 'relative', maxWidth: 1160, margin: '0 auto' }}>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(360px,100%),1fr));gap:clamp(32px,5vw,64px);align-items:center')}>
            <div>
              <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:16px')}>
                Mise à disposition de personnel
              </div>
              <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(30px,6.5vw,58px);letter-spacing:-2px;line-height:1;max-width:16ch")}>
                RENFORCEZ VOTRE <span style={{ color: '#C6F202' }}>ÉQUIPE.</span>
              </h1>
              <p style={css('font-size:clamp(16px,2.2vw,20px);color:rgba(255,255,255,.8);max-width:56ch;margin-top:20px;line-height:1.5')}>
                GBÔ recrute et met à votre disposition des profils adaptés aux besoins de votre salle, tout en assurant leur gestion et leur suivi.
              </p>
              <Link
                href="/contact"
                className="btn-cta"
                style={css('margin-top:30px;display:inline-block;padding:16px 30px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:16px')}
              >
                Demander du personnel →
              </Link>
              <div style={css('display:flex;flex-wrap:wrap;gap:clamp(18px,3vw,32px);margin-top:40px')}>
                {TRUST_POINTS.map((p) => (
                  <div key={p.t} style={css('display:flex;align-items:center;gap:9px;color:rgba(255,255,255,.75);font-size:13.5px;font-weight:600')}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--lime,#C6F202)" strokeWidth="2">
                      {p.icon}
                    </svg>
                    {p.t}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 28, overflow: 'hidden', border: '1px solid rgba(255,255,255,.1)' }}>
              <ImageSlot placeholder="Coach et responsable de salle GBÔ" src={stockPhoto('team', 'personnel-hero', '1000x1200')} />
              <div style={css('position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 60%,rgba(0,0,0,.55) 100%);pointer-events:none')} />
            </div>
          </div>
        </div>
      </section>

      <Reveal as="section" style={css('padding:clamp(56px,8vw,100px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr));gap:clamp(20px,4vw,40px);align-items:end;margin-bottom:34px')}>
            <div>
              <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px')}>
                Les profils dont votre salle a besoin
              </div>
              <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(26px,4.5vw,40px);letter-spacing:-1px;line-height:1.1")}>
                Des experts pour faire avancer votre salle.
              </h2>
            </div>
            <p style={css('font-size:15.5px;color:var(--muted,#8a8a8a);line-height:1.6')}>
              Du coach sportif au responsable de salle, GBÔ vous permet de disposer de profils sélectionnés selon vos besoins et les exigences de votre
              établissement.
            </p>
          </div>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr));gap:18px')}>
            {PROFILES.map((p, i) => (
              <Reveal
                key={p.name}
                delay={i * 80}
                className="hover-card hover-card-lime"
                style={css(
                  'display:flex;gap:18px;padding:20px;border-radius:20px;border:1px solid var(--border,rgba(255,255,255,.09));background:var(--glass,rgba(255,255,255,.02))'
                )}
              >
                <div
                  style={{
                    flex: '0 0 clamp(110px,26vw,190px)',
                    width: 'clamp(110px,26vw,190px)',
                    height: 'clamp(110px,26vw,190px)',
                    borderRadius: 18,
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <ImageSlot placeholder={p.name} src={p.photo} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{p.name}</div>
                  <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a);line-height:1.5;margin-bottom:12px')}>{p.desc}</div>
                  <div style={css('display:flex;flex-wrap:wrap;gap:6px')}>
                    {p.levels.map((l) => (
                      <span
                        key={l}
                        style={css(
                          'padding:4px 11px;border-radius:20px;font-size:11.5px;font-weight:700;background:rgba(198,242,2,.1);color:var(--lime,#C6F202);border:1px solid rgba(198,242,2,.25)'
                        )}
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal
        as="section"
        style={css(
          'padding:clamp(56px,8vw,100px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b);border-top:1px solid var(--border,rgba(255,255,255,.08));border-bottom:1px solid var(--border,rgba(255,255,255,.08))'
        )}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr));gap:clamp(20px,4vw,40px);align-items:end;margin-bottom:34px')}>
            <div>
              <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px')}>
                Vous avez le besoin. GBÔ gère le reste.
              </div>
              <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(26px,4.5vw,40px);letter-spacing:-1px;line-height:1.1")}>
                Un service complet, pour une collaboration sereine.
              </h2>
            </div>
            <p style={css('font-size:15.5px;color:var(--muted,#8a8a8a);line-height:1.6')}>
              De la recherche du profil à son suivi, GBÔ prend en charge les principales étapes liées à la gestion du personnel mis à disposition.
            </p>
          </div>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(200px,100%),1fr));gap:24px')}>
            {SERVICE_STEPS.map((s, i) => (
              <Reveal key={s.t} delay={i * 60} style={{ textAlign: 'center' }}>
                <div
                  style={css(
                    'width:56px;height:56px;border-radius:50%;background:rgba(198,242,2,.12);color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center;margin:0 auto 16px'
                  )}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {s.icon}
                  </svg>
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{s.t}</div>
                <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a);line-height:1.5')}>{s.d}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(56px,8vw,100px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px')}>
            Comment ça marche ?
          </div>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(26px,4.5vw,40px);letter-spacing:-1px;margin-bottom:48px")}>
            Un processus simple et efficace.
          </h2>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr));gap:28px;text-align:left')}>
            {HOW_IT_WORKS.map((s, i) => (
              <Reveal key={s.n} delay={i * 70}>
                <div
                  style={css(
                    "width:40px;height:40px;border-radius:11px;background:rgba(198,242,2,.12);color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center;font-family:'Broaven';font-weight:700;font-size:15px;margin-bottom:16px"
                  )}
                >
                  {s.n}
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, lineHeight: 1.3 }}>{s.t}</div>
                <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a);line-height:1.5')}>{s.d}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(56px,8vw,100px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b);border-top:1px solid var(--border,rgba(255,255,255,.08))')}>
        <div
          style={css(
            'max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr));gap:clamp(24px,4vw,48px);align-items:center'
          )}
        >
          <div>
            <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px')}>
              Vous cherchez à renforcer votre équipe ?
            </div>
            <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(26px,4.5vw,40px);letter-spacing:-1px;margin-bottom:16px;line-height:1.1")}>
              Parlons de votre besoin.
            </h2>
            <p style={css('font-size:15.5px;color:var(--muted,#8a8a8a);line-height:1.6;margin-bottom:26px')}>
              Présentez-nous votre besoin et GBÔ vous accompagne dans la recherche des profils adaptés à votre salle.
            </p>
            <Link
              href="/contact"
              className="btn-cta"
              style={css('display:inline-block;padding:16px 30px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:15px')}
            >
              Demander du personnel →
            </Link>
          </div>
          <div style={css('display:grid;gap:14px')}>
            {TRUST_POINTS.map((p) => (
              <div key={p.t} style={css('display:flex;align-items:center;gap:12px;font-size:14.5px;font-weight:600')}>
                <span
                  style={css(
                    'width:34px;height:34px;flex:0 0 auto;border-radius:10px;background:rgba(198,242,2,.12);color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center'
                  )}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {p.icon}
                  </svg>
                </span>
                {p.t}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
