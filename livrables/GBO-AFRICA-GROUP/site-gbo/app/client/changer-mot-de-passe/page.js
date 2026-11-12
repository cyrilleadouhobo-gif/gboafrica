'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { css } from '../../../lib/css.js';
import PasswordInput from '../../../components/PasswordInput.js';

export default function ChangePasswordPage() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (newPassword !== confirmPassword) {
      setError('Les deux mots de passe ne correspondent pas.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/client/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Une erreur est survenue.');
        return;
      }
      router.replace('/client');
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
          'width:100%;max-width:420px;padding:36px;border-radius:20px;border:1px solid var(--border,rgba(255,255,255,.12));background:var(--surface,#0c0c0c)'
        )}
      >
        <h1 style={css("font-family:'Broaven';font-weight:700;font-size:24px;margin-bottom:6px")}>
          Choisissez votre mot de passe
        </h1>
        <p style={css('color:var(--muted,#8a8a8a);font-size:13.5px;margin-bottom:26px')}>
          Votre coach vous a transmis un mot de passe temporaire. Remplacez-le par le vôtre pour continuer.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 14 }}>
          <PasswordInput
            required
            autoComplete="current-password"
            placeholder="Mot de passe temporaire"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <PasswordInput
            required
            autoComplete="new-password"
            placeholder="Nouveau mot de passe"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <PasswordInput
            required
            autoComplete="new-password"
            placeholder="Confirmez le nouveau mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <p style={css('color:var(--muted,#8a8a8a);font-size:12px;margin:-4px 0 0')}>
            Au moins 10 caractères, avec une majuscule, une minuscule et un chiffre.
          </p>
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
            {submitting ? 'Enregistrement…' : 'Valider'}
          </button>
        </form>
      </div>
    </div>
  );
}
