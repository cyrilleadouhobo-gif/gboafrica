'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { css } from '../../../lib/css.js';
import Honeypot from '../../../components/Honeypot.js';
import ImageSlot from '../../../components/ImageSlot.js';
import { POLES, POLE_DETAIL } from '../../../data/poles.js';

export default function PolePage({ params }) {
  const detail = POLE_DETAIL[params.slug];
  if (!detail) notFound();

  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const mono = (POLES.find((p) => p.key === params.slug) || {}).mono || 'G';

  const submitWaitlist = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);
    const f = new FormData(e.target);

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: f.get('email'), pole: detail.name.replace('GBÔ ', ''), website: f.get('website') }),
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
      <section style={css('position:relative;padding:clamp(80px,10vw,130px) clamp(20px,5vw,64px) clamp(48px,6vw,80px);overflow:hidden;background:#060606')}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
          <ImageSlot placeholder="Illustration premium du pôle" />
        </div>
        <div style={css('position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.55),rgba(0,0,0,.9));pointer-events:none')} />
        <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto' }}>
          <div style={css('font-size:13px;color:rgba(255,255,255,.6);margin-bottom:20px')}>
            <Link href="/" style={{ color: 'rgba(255,255,255,.6)' }}>
              Accueil
            </Link>{' '}
            <span style={{ opacity: 0.5 }}>/</span> Pôles <span style={{ opacity: 0.5 }}>/</span> {detail.name}
          </div>
          <span
            style={css(
              'display:inline-flex;align-items:center;gap:7px;padding:6px 13px;border-radius:20px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:#fff;font-size:12px;font-weight:700;margin-bottom:18px'
            )}
          >
            <span style={css('width:7px;height:7px;border-radius:50%;background:#fbbf24;animation:pulse 1.6s infinite')} /> Bientôt disponible
          </span>
          <h1 style={css("font-family:'Space Grotesk';font-weight:700;font-size:clamp(36px,7vw,72px);letter-spacing:-2px;line-height:.98;color:#fff")}>{detail.name}</h1>
          <p style={css('font-size:clamp(17px,2.4vw,22px);color:rgba(255,255,255,.85);max-width:56ch;margin-top:20px;line-height:1.45')}>{detail.tagline}</p>
          <button
            onClick={() => document.getElementById('waitlist-box')?.scrollIntoView({ behavior: 'smooth' })}
            style={css('margin-top:30px;padding:16px 30px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:16px')}
          >
            Rejoindre la liste d&apos;attente
          </button>
        </div>
      </section>

      <section style={css('padding:clamp(56px,8vw,100px) clamp(20px,5vw,64px)')}>
        <div style={css('max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:clamp(30px,5vw,64px)')}>
          <div>
            <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px')}>Ce que ce sera</div>
            <p style={css('font-size:clamp(16px,2vw,19px);line-height:1.6')}>{detail.intro}</p>
          </div>
          <div>
            <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px')}>Notre vision</div>
            <p style={css('font-size:clamp(16px,2vw,19px);line-height:1.6;font-weight:500')}>{detail.vision}</p>
          </div>
        </div>
      </section>

      <section
        style={css(
          'padding:clamp(48px,7vw,90px) clamp(20px,5vw,64px);background:var(--surface,#0b0b0b);border-top:1px solid var(--border,rgba(255,255,255,.08));border-bottom:1px solid var(--border,rgba(255,255,255,.08))'
        )}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={css("font-family:'Space Grotesk';font-weight:700;font-size:clamp(24px,3.5vw,34px);letter-spacing:-1px;margin-bottom:28px")}>Services à venir</h2>
          <div style={css('display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px')}>
            {detail.services.map((sv) => (
              <div key={sv} style={css('display:flex;gap:12px;align-items:center;padding:18px;border-radius:14px;border:1px solid var(--border,rgba(255,255,255,.09))')}>
                <span
                  style={css(
                    'width:26px;height:26px;flex:0 0 auto;border-radius:8px;background:rgba(198,242,2,.14);color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center'
                  )}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12l5 5L20 6" />
                  </svg>
                </span>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{sv}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={css('padding:clamp(48px,7vw,90px) clamp(20px,5vw,64px)')}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <h2 style={css("font-family:'Space Grotesk';font-weight:700;font-size:clamp(24px,3.5vw,34px);letter-spacing:-1px;margin-bottom:24px")}>Questions fréquentes</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {detail.faqs.map((f) => (
              <div key={f.q} style={css('padding:22px;border-radius:14px;border:1px solid var(--border,rgba(255,255,255,.09));background:var(--glass,rgba(255,255,255,.02))')}>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{f.q}</div>
                <div style={css('font-size:14.5px;color:var(--muted,#8a8a8a);line-height:1.55')}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="waitlist-box" style={css('padding:0 clamp(20px,5vw,64px) clamp(64px,9vw,110px)')}>
        <div style={css('max-width:640px;margin:0 auto;padding:clamp(28px,4vw,44px);border-radius:24px;background:var(--lime,#C6F202);color:#000;text-align:center')}>
          {done ? (
            <div style={{ animation: 'fadeUp .4s both' }}>
              <div
                style={css(
                  'width:64px;height:64px;border-radius:50%;background:#000;color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center;margin:0 auto 18px;animation:pop .5s both'
                )}
              >
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 12l5 5L20 6" />
                </svg>
              </div>
              <h3 style={css("font-family:'Space Grotesk';font-weight:700;font-size:24px;margin-bottom:8px")}>Vous êtes sur la liste !</h3>
              <p style={{ fontSize: 15, opacity: 0.8, lineHeight: 1.5 }}>
                Vous serez notifié en priorité à l&apos;ouverture de {detail.name}. Un e-mail de confirmation vient de vous être envoyé.
              </p>
            </div>
          ) : (
            <form onSubmit={submitWaitlist}>
              <h3 style={css("font-family:'Space Grotesk';font-weight:700;font-size:clamp(22px,3.5vw,30px);margin-bottom:8px")}>Soyez prévenu au lancement</h3>
              <p style={{ fontSize: 15, opacity: 0.8, marginBottom: 22, lineHeight: 1.5 }}>Laissez votre e-mail — priorité absolue à la liste d&apos;attente {detail.name}.</p>
              <div style={css('display:flex;flex-wrap:wrap;gap:10px')}>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Votre e-mail"
                  style={css('flex:1;min-width:200px;padding:16px;border-radius:12px;border:1px solid rgba(0,0,0,.25);background:rgba(255,255,255,.6);color:#000;font-size:15px')}
                />
                <button type="submit" disabled={submitting} style={css(`padding:16px 26px;border-radius:12px;background:#000;color:var(--lime,#C6F202);font-weight:700;font-size:15px;opacity:${submitting ? 0.6 : 1}`)}>
                  {submitting ? '…' : 'Rejoindre'}
                </button>
              </div>
              <Honeypot />
              {errorMsg && <div style={{ fontSize: 13, marginTop: 12, textAlign: 'left', fontWeight: 600 }}>{errorMsg}</div>}
              <div style={{ fontSize: 12, opacity: 0.65, marginTop: 12, textAlign: 'left' }}>Aucune sollicitation commerciale non désirée. Désinscription à tout moment.</div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
