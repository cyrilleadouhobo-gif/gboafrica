'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { css } from '../../../lib/css.js';
import PasswordInput from '../../../components/PasswordInput.js';

export default function ClientLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/client/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Email ou mot de passe incorrect.');
        return;
      }
      router.replace(data.mustChangePassword ? '/client/changer-mot-de-passe' : '/client');
      router.refresh();
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
        <h1 style={css("font-family:'Broaven';font-weight:700;font-size:26px;text-align:center;margin-bottom:6px")}>
          Espace Client
        </h1>
        <p style={css('text-align:center;color:var(--muted,#8a8a8a);font-size:13.5px;margin-bottom:26px')}>
          Retrouvez vos séances, votre coach et vos comptes rendus.
        </p>

        <form onSubmit={handleLogin} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 14 }}>
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
          <PasswordInput
            required
            autoComplete="current-password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            {submitting ? 'Connexion…' : 'Connexion'}
          </button>
        </form>

        <p style={css('text-align:center;color:var(--muted,#8a8a8a);font-size:12.5px;margin-top:22px')}>
          Identifiants oubliés ou pas encore reçus ? Contactez votre coach ou l&apos;équipe GBÔ.
        </p>
      </div>
    </div>
  );
}
