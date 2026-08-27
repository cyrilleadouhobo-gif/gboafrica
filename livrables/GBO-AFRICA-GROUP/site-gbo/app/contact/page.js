'use client';

import { useState } from 'react';
import { css } from '../../lib/css.js';
import { useAppData } from '../../context/AppData.js';
import ImageSlot from '../../components/ImageSlot.js';
import Honeypot from '../../components/Honeypot.js';

const fieldStyle = css(
  "padding:15px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.14));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:15px"
);

export default function ContactPage() {
  const { showToast } = useAppData();
  const [submitting, setSubmitting] = useState(false);

  const submitContact = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const f = new FormData(e.target);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom: f.get('nom'), tel: f.get('tel'), email: f.get('email'), msg: f.get('msg'), website: f.get('website') }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Une erreur est survenue, réessayez.');
        return;
      }
      e.target.reset();
      showToast('Message envoyé. Nous revenons vers vous rapidement.');
    } catch {
      showToast('Connexion impossible. Réessayez.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,40px) clamp(64px,9vw,110px)' }}>
      <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:14px')}>Contact</div>
      <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(28px,6vw,50px);letter-spacing:-1.5px;margin-bottom:40px")}>Parlons de vos objectifs.</h1>
      <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px')}>
        <div>
          <form
            onSubmit={submitContact}
            style={css('display:grid;gap:12px;padding:28px;border-radius:20px;border:1px solid var(--border,rgba(255,255,255,.12));background:var(--surface,#0c0c0c)')}
          >
            <div style={css('display:grid;grid-template-columns:1fr 1fr;gap:12px')}>
              <input required name="nom" placeholder="Nom *" style={fieldStyle} />
              <input required name="tel" type="tel" placeholder="Téléphone *" style={fieldStyle} />
            </div>
            <input required name="email" type="email" placeholder="E-mail *" style={fieldStyle} />
            <textarea required name="msg" rows={4} placeholder="Votre message *" style={{ ...fieldStyle, resize: 'vertical' }} />
            <Honeypot />
            <button
              type="submit"
              disabled={submitting}
              style={css(`padding:16px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:16px;opacity:${submitting ? 0.6 : 1}`)}
            >
              {submitting ? 'Envoi…' : 'Envoyer'}
            </button>
          </form>
        </div>
        <div style={{ display: 'grid', gap: 12, alignContent: 'start' }}>
          <a
            href="https://wa.me/2250700000000"
            style={css('display:flex;gap:14px;align-items:center;padding:20px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--glass,rgba(255,255,255,.02))')}
          >
            <span
              style={css(
                'width:42px;height:42px;border-radius:12px;background:rgba(198,242,2,.14);color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center;flex:0 0 auto'
              )}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.4A10 10 0 1012 2z" />
              </svg>
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>WhatsApp</div>
              <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a)')}>+225 07 00 00 00 00</div>
            </div>
          </a>
          <div style={css('display:flex;gap:14px;align-items:center;padding:20px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.1))')}>
            <span
              style={css(
                'width:42px;height:42px;border-radius:12px;background:rgba(198,242,2,.14);color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center;flex:0 0 auto'
              )}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>E-mail</div>
              <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a)')}>contact@gboafrica.com</div>
            </div>
          </div>
          <div style={css('display:flex;gap:14px;align-items:center;padding:20px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.1))')}>
            <span
              style={css(
                'width:42px;height:42px;border-radius:12px;background:rgba(198,242,2,.14);color:var(--lime,#C6F202);display:flex;align-items:center;justify-content:center;flex:0 0 auto'
              )}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 1118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Abidjan, Côte d&apos;Ivoire</div>
              <div style={css('font-size:13.5px;color:var(--muted,#8a8a8a)')}>Lun–Sam · 8h–19h</div>
            </div>
          </div>
          <div style={{ aspectRatio: '16/10', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border,rgba(255,255,255,.1))', position: 'relative' }}>
            <ImageSlot placeholder="Carte Google Maps (localisation)" />
          </div>
        </div>
      </div>
    </div>
  );
}
