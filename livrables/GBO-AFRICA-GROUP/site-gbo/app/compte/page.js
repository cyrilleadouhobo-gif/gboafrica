'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { css } from '../../lib/css.js';
import PasswordInput from '../../components/PasswordInput.js';

const inputStyle = css(
  "padding:15px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.14));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:15px;width:100%"
);

function LoginForm({ onSwitch }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/member/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Identifiants incorrects.');
        return;
      }
      router.replace('/compte/espace');
      router.refresh();
    } catch {
      setError('Connexion impossible. Vérifiez votre réseau et réessayez.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
      <input
        type="email"
        required
        autoComplete="username"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
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
      <button type="button" onClick={onSwitch} style={css('padding:4px;color:var(--muted,#8a8a8a);font-size:13.5px;text-align:center')}>
        Pas encore de compte ? <span style={{ color: 'var(--lime,#C6F202)' }}>Rejoindre le Club GBÔ</span>
      </button>
    </form>
  );
}

function RegisterForm({ onSwitch }) {
  const router = useRouter();
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/member/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prenom, nom, email, password, consent }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Une erreur est survenue, réessayez.');
        return;
      }
      router.replace('/compte/espace');
      router.refresh();
    } catch {
      setError('Connexion impossible. Vérifiez votre réseau et réessayez.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
      <div style={css('display:grid;grid-template-columns:1fr 1fr;gap:14px')}>
        <input required placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} style={inputStyle} />
        <input required placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} style={inputStyle} />
      </div>
      <input
        type="email"
        required
        autoComplete="username"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />
      <PasswordInput
        required
        autoComplete="new-password"
        placeholder="Mot de passe (8 caractères min.)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label style={css('display:flex;gap:10px;align-items:flex-start;font-size:13px;color:var(--muted,#8a8a8a);cursor:pointer')}>
        <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} style={{ marginTop: 3 }} />
        J&apos;accepte que GBÔ traite mes données personnelles afin de créer et gérer mon compte membre.
      </label>
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
        {submitting ? 'Création…' : 'Créer mon compte'}
      </button>
      <button type="button" onClick={onSwitch} style={css('padding:4px;color:var(--muted,#8a8a8a);font-size:13.5px;text-align:center')}>
        Déjà membre ? <span style={{ color: 'var(--lime,#C6F202)' }}>Se connecter</span>
      </button>
    </form>
  );
}

export default function ComptePage() {
  const [mode, setMode] = useState('login');

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 64px' }}>
      <div
        style={css(
          'width:100%;max-width:420px;padding:36px;border-radius:20px;border:1px solid var(--border,rgba(255,255,255,.12));background:var(--surface,#0c0c0c)'
        )}
      >
        <h1 style={css("font-family:'Broaven';font-weight:700;font-size:26px;text-align:center;margin-bottom:6px")}>
          {mode === 'login' ? 'Mon compte GBÔ' : 'Rejoindre le Club GBÔ'}
        </h1>
        <p style={css('text-align:center;color:var(--muted,#8a8a8a);font-size:13.5px;margin-bottom:26px')}>
          {mode === 'login' ? 'Accédez à votre espace membre.' : 'Créez votre compte gratuit en 1 minute.'}
        </p>
        {mode === 'login' ? (
          <LoginForm onSwitch={() => setMode('register')} />
        ) : (
          <RegisterForm onSwitch={() => setMode('login')} />
        )}
      </div>
    </div>
  );
}
