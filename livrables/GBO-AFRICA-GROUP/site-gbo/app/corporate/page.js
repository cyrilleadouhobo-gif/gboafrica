'use client';

import { useState } from 'react';
import Link from 'next/link';
import { css } from '../../lib/css.js';
import Honeypot from '../../components/Honeypot.js';
import Reveal from '../../components/Reveal.js';
import { CORPORATE_SOLUTIONS } from '../../data/content.js';

const fieldStyle = css(
  "width:100%;padding:15px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.14));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:15px"
);
const labelStyle = css('font-size:13px;font-weight:600;color:var(--muted,#8a8a8a);display:block;margin-bottom:6px');

export default function CorporatePage() {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const submitCompany = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);
    const f = new FormData(e.target);

    try {
      const res = await fetch('/api/leads/company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entreprise: f.get('entreprise'),
          contact: f.get('contact'),
          tel: f.get('tel'),
          email: f.get('email'),
          effectif: f.get('effectif'),
          besoin: f.get('besoin'),
          consent: f.get('consent') === 'on',
          website: f.get('website'),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Une erreur est survenue, réessayez.');
        return;
      }
      setDone(true);
    } catch {
      setErrorMsg('Connexion impossible. Vérifiez votre réseau et réessayez.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <section style={css('padding:clamp(80px,10vw,120px) clamp(20px,5vw,64px) clamp(40px,5vw,60px);border-bottom:1px solid var(--border,rgba(255,255,255,.08));position:relative;overflow:hidden')}>
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={css('font-size:13px;color:var(--muted,#8a8a8a);margin-bottom:20px')}>
            <Link href="/fitness">GBÔ Fitness</Link> <span style={{ opacity: 0.5 }}>/</span> Entreprise
          </div>
          <span style={css('display:inline-block;padding:5px 12px;border-radius:20px;border:1px solid var(--border,rgba(255,255,255,.2));font-size:12px;font-weight:700;margin-bottom:16px;color:var(--muted,#8a8a8a)')}>
            Solutions corporate
          </span>
          <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(26px,5.5vw,50px);letter-spacing:-1.5px;line-height:1.02;max-width:20ch")}>
            Le sport, moteur de performance de vos équipes.
          </h1>
          <p style={css('font-size:clamp(16px,2.2vw,20px);color:var(--muted,#8a8a8a);max-width:60ch;margin-top:20px;line-height:1.5')}>
            Pensé pour les DRH, responsables QHSE, dirigeants et CSE : un programme Sport &amp; Bien-être qui réduit l&apos;absentéisme, renforce la cohésion et
            valorise votre marque employeur.
          </p>
        </div>
      </section>

      <Reveal as="section" style={css('padding:clamp(48px,7vw,90px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(24px,3.5vw,34px);letter-spacing:-1px;margin-bottom:30px")}>Nos solutions</h2>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px')}>
            {CORPORATE_SOLUTIONS.map((c, i) => (
              <Reveal
                key={c.t}
                delay={i * 60}
                className="hover-card"
                style={css('padding:26px;border-radius:18px;border:1px solid var(--border,rgba(255,255,255,.09));background:var(--glass,rgba(255,255,255,.02))')}
              >
                <div style={css('width:10px;height:10px;border-radius:3px;background:var(--lime,#C6F202);margin-bottom:16px')} />
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{c.t}</div>
                <div style={css('font-size:14px;color:var(--muted,#8a8a8a);line-height:1.55')}>{c.d}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" style={css('padding:clamp(20px,3vw,40px) clamp(20px,5vw,64px) clamp(64px,9vw,110px)')}>
        <div
          style={css(
            'max-width:760px;margin:0 auto;padding:clamp(28px,4vw,44px);border-radius:24px;border:1px solid var(--border,rgba(255,255,255,.12));background:var(--surface,#0c0c0c)'
          )}
        >
          {done ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div
                style={css(
                  'width:70px;height:70px;border-radius:50%;background:var(--lime,#C6F202);color:#000;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;animation:pop .5s both'
                )}
              >
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 12l5 5L20 6" />
                </svg>
              </div>
              <h3 style={css("font-family:'Broaven';font-weight:700;font-size:26px;margin-bottom:10px")}>Demande envoyée !</h3>
              <p style={css('color:var(--muted,#8a8a8a);font-size:15.5px;line-height:1.6;max-width:44ch;margin:0 auto')}>
                Un conseiller Entreprise GBÔ vous recontacte pour établir une proposition commerciale sur mesure. Confirmation par e-mail et WhatsApp.
              </p>
              <Link href="/" style={css('margin-top:24px;padding:14px 26px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.2));color:var(--fg,#fff);font-weight:700;display:inline-block')}>
                Retour à l&apos;accueil
              </Link>
            </div>
          ) : (
            <form onSubmit={submitCompany}>
              <h2 style={css("font-family:'Broaven';font-weight:700;font-size:26px;margin-bottom:6px")}>Demander une proposition</h2>
              <p style={css('color:var(--muted,#8a8a8a);font-size:14.5px;margin-bottom:24px')}>Réponse sous 48h ouvrées.</p>
              <div style={css('display:grid;grid-template-columns:1fr 1fr;gap:12px')}>
                <label style={{ display: 'block' }}>
                  <span style={labelStyle}>Entreprise *</span>
                  <input required name="entreprise" style={fieldStyle} />
                </label>
                <label style={{ display: 'block' }}>
                  <span style={labelStyle}>Nom du contact *</span>
                  <input required name="contact" style={fieldStyle} />
                </label>
                <label style={{ display: 'block' }}>
                  <span style={labelStyle}>Téléphone *</span>
                  <input required name="tel" type="tel" placeholder="+225…" style={fieldStyle} />
                </label>
                <label style={{ display: 'block' }}>
                  <span style={labelStyle}>E-mail *</span>
                  <input required name="email" type="email" style={fieldStyle} />
                </label>
                <label style={{ display: 'block' }}>
                  <span style={labelStyle}>Effectif</span>
                  <select name="effectif" style={fieldStyle}>
                    <option>1–20</option>
                    <option>21–100</option>
                    <option>101–500</option>
                    <option>500+</option>
                  </select>
                </label>
                <label style={{ display: 'block' }}>
                  <span style={labelStyle}>Besoin principal</span>
                  <select name="besoin" style={fieldStyle}>
                    <option>Coaching en entreprise</option>
                    <option>Team building sportif</option>
                    <option>Challenges inter-équipes</option>
                    <option>Prévention santé</option>
                    <option>Fitness en entreprise</option>
                    <option>Événement corporate</option>
                  </select>
                </label>
              </div>
              <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginTop: 18, cursor: 'pointer' }}>
                <input required name="consent" type="checkbox" style={{ marginTop: 3, width: 18, height: 18, accentColor: '#C6F202', flex: '0 0 auto' }} />
                <span style={css('font-size:13.5px;color:var(--muted,#8a8a8a);line-height:1.5')}>J&apos;accepte que GBÔ traite ces données pour répondre à ma demande.</span>
              </label>
              <Honeypot />
              {errorMsg && (
                <div style={css('margin-top:14px;padding:12px 16px;border-radius:10px;background:rgba(248,113,113,.1);border:1px solid rgba(248,113,113,.3);color:#f87171;font-size:13.5px')}>
                  {errorMsg}
                </div>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="btn-cta"
                style={css(
                  `margin-top:24px;width:100%;padding:17px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:16px;opacity:${submitting ? 0.6 : 1}`
                )}
              >
                {submitting ? 'Envoi en cours…' : 'Envoyer la demande'}
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </div>
  );
}
