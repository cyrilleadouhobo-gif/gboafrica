'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { css } from '../../../../lib/css.js';

export default function NutritionPartnerLoginPage() {
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
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Identifiants incorrects.');
        return;
      }
      router.replace('/partenaires/nutrition');
      router.refresh();
    } catch {
      setError('Connexion impossible. Vérifiez votre réseau et réessayez.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 68px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div
        style={css(
          'width:100%;max-width:400px;padding:36px;border-radius:20px;border:1px solid var(--border,rgba(255,255,255,.12));background:var(--surface,#0c0c0c)'
        )}
      >
        <div style={css('font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--lime,#C6F202);font-weight:600;margin-bottom:10px;text-align:center')}>
          Espace partenaire
        </div>
        <h1 style={css("font-family:'Big Shoulders Display';font-weight:700;font-size:26px;text-align:center;margin-bottom:6px")}>
          Centre Médico Nutrition
        </h1>
        <p style={css('text-align:center;color:var(--muted,#8a8a8a);font-size:13.5px;margin-bottom:26px')}>Suivi des clients transmis par GBÔ.</p>

        <form onSubmit={handleLogin} style={{ display: 'grid', gap: 14 }}>
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
          <input
            type="password"
            required
            autoComplete="current-password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            {submitting ? 'Connexion…' : 'Connexion'}
          </button>
        </form>
      </div>
    </div>
  );
}
