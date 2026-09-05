'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import { css } from '../../../lib/css.js';
import Honeypot from '../../../components/Honeypot.js';
import ImageSlot from '../../../components/ImageSlot.js';
import Reveal from '../../../components/Reveal.js';
import GlowBlobs from '../../../components/GlowBlobs.js';
import { POLE_DETAIL } from '../../../data/poles.js';

export default function PolePage({ params }) {
  const { slug } = use(params);
  const detail = POLE_DETAIL[slug];
  if (!detail) notFound();

  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const submitWaitlist = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);
    const f = new FormData(e.target);

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.get('name'),
          email: f.get('email'),
          phone: f.get('phone'),
          pole: detail.name.replace('GBÔ ', ''),
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

  const headline = detail.headline;
  const lastLine = headline[headline.length - 1];
  const firstLines = headline.slice(0, -1);

  return (
    <div>
      <section
        style={css(
          'position:relative;overflow:hidden;padding:clamp(70px,9vw,110px) clamp(20px,5vw,64px) clamp(40px,5vw,56px);border-bottom:1px solid var(--border,rgba(255,255,255,.08))'
        )}
      >
        <div style={{ position: 'absolute', inset: 0 }}>
          <ImageSlot placeholder={`Visuel ${detail.name}`} src={detail.photo} />
        </div>
        <div
          style={css(
            'position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.85) 0%,rgba(0,0,0,.6) 45%,rgba(0,0,0,.3) 75%),linear-gradient(180deg,rgba(0,0,0,.5) 0%,rgba(0,0,0,.35) 45%,rgba(0,0,0,.85) 100%);pointer-events:none'
          )}
        />
        <GlowBlobs />

        {detail.corner && (
          <div
            data-hidemobile=""
            style={css(
              "position:absolute;top:clamp(80px,10vw,110px);right:clamp(20px,5vw,64px);text-align:right;font-family:'Broaven';font-weight:700;font-size:clamp(14px,1.6vw,20px);line-height:1.25;color:rgba(255,255,255,.85);z-index:2;max-width:24ch"
            )}
          >
            {detail.corner.join(' ')}
          </div>
        )}

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
          <div style={css('display:flex;align-items:center;gap:10px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:16px')}>
            {detail.name.toUpperCase()} <span style={{ width: 26, height: 2, background: '#C6F202', display: 'inline-block' }} />
          </div>
          <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,6vw,54px);letter-spacing:-1.5px;line-height:1.02;max-width:16ch")}>
            {firstLines.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
            <span style={{ color: 'var(--lime,#C6F202)' }}>{lastLine}</span>
          </h1>
          <p style={css('font-size:clamp(15px,1.8vw,18px);color:var(--muted,#c8c8c8);max-width:58ch;margin-top:20px;line-height:1.55')}>{detail.heroText}</p>
        </div>
      </section>

      <Reveal as="section" style={css('padding:clamp(32px,5vw,56px) clamp(20px,5vw,64px) clamp(56px,9vw,110px)')}>
        <div
          style={css(
            'max-width:1200px;margin:0 auto;padding:clamp(26px,4vw,40px);border-radius:24px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr));gap:clamp(20px,3vw,36px);align-items:center'
          )}
        >
          <div>
            <h2 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(22px,2.6vw,30px);letter-spacing:-1px;line-height:1.05")}>
              BIENTÔT
              <br />
              DISPONIBLE
            </h2>
            <span style={{ display: 'inline-block', width: 26, height: 3, background: '#C6F202', marginTop: 12 }} />
          </div>
          <p style={css('font-size:14.5px;color:var(--muted,#8a8a8a);line-height:1.6')}>
            Soyez informé dès le lancement. Laissez-nous vos coordonnées et nous vous préviendrons.
          </p>
          {done ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={css(
                  'width:40px;height:40px;flex:0 0 auto;border-radius:50%;background:var(--lime,#C6F202);color:#000;display:flex;align-items:center;justify-content:center'
                )}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 12l5 5L20 6" />
                </svg>
              </div>
              <span style={css('font-size:14px;color:var(--muted,#8a8a8a);line-height:1.4')}>
                Vous êtes sur la liste ! Vous serez notifié en priorité à l&apos;ouverture de {detail.name}.
              </span>
            </div>
          ) : (
            <form onSubmit={submitWaitlist} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input
                required
                name="name"
                placeholder="Nom et prénom"
                style={css(
                  'padding:13px 14px;border-radius:10px;border:1px solid var(--border,rgba(255,255,255,.16));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:14px'
                )}
              />
              <input
                required
                type="email"
                name="email"
                placeholder="E-mail"
                style={css(
                  'padding:13px 14px;border-radius:10px;border:1px solid var(--border,rgba(255,255,255,.16));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:14px'
                )}
              />
              <input
                name="phone"
                type="tel"
                placeholder="Téléphone"
                style={css(
                  'padding:13px 14px;border-radius:10px;border:1px solid var(--border,rgba(255,255,255,.16));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:14px'
                )}
              />
              <Honeypot />
              {errorMsg && <div style={{ fontSize: 12.5, color: '#f87171', fontWeight: 600 }}>{errorMsg}</div>}
              <button
                type="submit"
                disabled={submitting}
                className="btn-cta"
                style={css(
                  `padding:13px;border-radius:10px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:14.5px;opacity:${submitting ? 0.6 : 1}`
                )}
              >
                {submitting ? '…' : 'Me prévenir →'}
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </div>
  );
}
