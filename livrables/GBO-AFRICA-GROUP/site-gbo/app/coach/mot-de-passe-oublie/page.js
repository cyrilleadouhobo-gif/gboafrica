'use client';

import { useState } from 'react';
import Link from 'next/link';
import { css } from '../../../lib/css.js';

export default function CoachForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/coach/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Une erreur est survenue.');
        return;
      }
      setSent(true);
    } catch {
      setError('Connexion impossible. Vérifiez votre réseau et réessayez.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'var(--bg,#000)' }}>
      <div
        style={css(
          'width:100%;max-width:400px;padding:36px;border-radius:20px;border:1px solid var(--border,rgba(255,255,255,.12));background:var(--surface,#0c0c0c)'
        )}
      >
        <div style={css('display:flex;justify-content:center;margin-bottom:22px')}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-full.png" alt="GBÔ — Plus qu'une pratique, un style de vie" width={111} height={40} style={{ height: 40, width: 'auto' }} />
        </div>
        <h1 style={css("font-family:'Broaven';font-weight:700;font-size:24px;text-align:center;margin-bottom:6px")}>
          Mot de passe oublié
        </h1>
        <p style={css('text-align:center;color:var(--muted,#8a8a8a);font-size:13.5px;margin-bottom:26px')}>
          Saisissez votre e-mail, nous vous envoyons un lien de réinitialisation.
        </p>

        {sent ? (
          <>
            <div style={css('padding:14px;border-radius:12px;background:rgba(198,242,2,.1);border:1px solid rgba(198,242,2,.3);color:var(--fg,#fff);font-size:13.5px;text-align:center')}>
              Si cette adresse correspond à un compte, un e-mail avec un lien de réinitialisation vient d&apos;être envoyé. Pensez à vérifier vos spams.
            </div>
            <p style={css('text-align:center;margin-top:18px')}>
              <Link href="/coach/login" style={css('color:var(--lime,#C6F202);font-size:13.5px;font-weight:600')}>
                ← Retour à la connexion
              </Link>
            </p>
          </>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
            <input
              type="email"
              required
              autoComplete="username"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={css(
                "padding:15px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.14));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:15px"
              )}
            />
            {error && (
              <div style={css('padding:12px;border-radius:10px;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.4);color:#f87171;font-size:13.5px')}>
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={submitting}
              style={css(`padding:15px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:15px;opacity:${submitting ? 0.6 : 1}`)}
            >
              {submitting ? 'Envoi…' : 'Envoyer le lien'}
            </button>
            <Link href="/coach/login" style={css('text-align:center;color:var(--muted,#8a8a8a);font-size:13px')}>
              ← Retour à la connexion
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
