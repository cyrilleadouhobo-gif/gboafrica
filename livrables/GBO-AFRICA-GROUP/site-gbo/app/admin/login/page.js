'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { css } from '../../../lib/css.js';

export default function AdminLoginPage() {
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
      router.replace('/admin');
      router.refresh();
    } catch {
      setError('Connexion impossible. Vérifiez votre réseau et réessayez.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={css(
        "font-family:'Inter',sans-serif;background:linear-gradient(135deg,#D32F2F 0%,#1976D2 100%);min-height:calc(100vh - 68px);display:flex;align-items:center;justify-content:center;padding:24px"
      )}
    >
      <div style={{ background: 'white', padding: 32, borderRadius: 8, boxShadow: '0 10px 40px rgba(0,0,0,0.2)', width: '100%', maxWidth: 400 }}>
        <h1 style={css("font-family:'Poppins',sans-serif;text-align:center;color:#1A1A1A;margin:0 0 8px")}>Espace Admin GBÔ</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: 24, fontSize: 13.5 }}>Accès réservé à l&apos;équipe GBÔ AFRICA GROUP.</p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontWeight: 500, marginBottom: 8, color: '#1A1A1A' }}>E-mail</label>
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: 12, border: '1px solid #DDD', borderRadius: 4, boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 500, marginBottom: 8, color: '#1A1A1A' }}>Mot de passe</label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: 12, border: '1px solid #DDD', borderRadius: 4, boxSizing: 'border-box' }}
            />
          </div>
          {error && <div style={{ background: '#FFEBEE', color: '#C62828', padding: 12, borderRadius: 4, fontSize: 13.5 }}>{error}</div>}
          <button
            type="submit"
            disabled={submitting}
            style={{ padding: 12, background: submitting ? '#e57373' : '#D32F2F', color: 'white', border: 'none', borderRadius: 4, fontWeight: 600, cursor: 'pointer' }}
          >
            {submitting ? 'Connexion…' : 'Connexion'}
          </button>
        </form>
      </div>
    </div>
  );
}
