'use client';

import { useState } from 'react';
import Link from 'next/link';
import { css } from '../../../../../lib/css.js';
import PasswordInput from '../../../../../components/PasswordInput.js';

function ChangeEmailForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/partner/nutrition/change-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newEmail }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Une erreur est survenue.');
        return;
      }
      setSuccess(`Identifiant mis à jour : ${data.email}`);
      setCurrentPassword('');
      setNewEmail('');
    } catch {
      setError('Connexion impossible. Vérifiez votre réseau et réessayez.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 14 }}>
      <label style={{ display: 'block' }}>
        <span style={css('font-size:13px;font-weight:600;color:var(--muted,#8a8a8a);display:block;margin-bottom:6px')}>Nouvel identifiant (e-mail)</span>
        <input
          type="email"
          required
          autoComplete="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          style={css(
            "width:100%;padding:13px;border-radius:10px;border:1px solid var(--border,rgba(255,255,255,.14));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:14px"
          )}
        />
      </label>
      <label style={{ display: 'block' }}>
        <span style={css('font-size:13px;font-weight:600;color:var(--muted,#8a8a8a);display:block;margin-bottom:6px')}>Mot de passe actuel</span>
        <PasswordInput required autoComplete="current-password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
      </label>
      {error && (
        <div style={css('padding:12px;border-radius:10px;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.4);color:#f87171;font-size:13.5px')}>{error}</div>
      )}
      {success && (
        <div style={css('padding:12px;border-radius:10px;background:rgba(198,242,2,.1);border:1px solid rgba(198,242,2,.3);color:var(--fg,#fff);font-size:13.5px')}>{success}</div>
      )}
      <button
        type="submit"
        disabled={submitting}
        style={css(`padding:13px;border-radius:10px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:14px;opacity:${submitting ? 0.6 : 1}`)}
      >
        {submitting ? 'Enregistrement…' : "Changer l'identifiant"}
      </button>
    </form>
  );
}

function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (newPassword !== confirmPassword) {
      setError('Les deux mots de passe ne correspondent pas.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/partner/nutrition/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Une erreur est survenue.');
        return;
      }
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      setError('Connexion impossible. Vérifiez votre réseau et réessayez.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 14 }}>
      <label style={{ display: 'block' }}>
        <span style={css('font-size:13px;font-weight:600;color:var(--muted,#8a8a8a);display:block;margin-bottom:6px')}>Mot de passe actuel</span>
        <PasswordInput required autoComplete="current-password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
      </label>
      <label style={{ display: 'block' }}>
        <span style={css('font-size:13px;font-weight:600;color:var(--muted,#8a8a8a);display:block;margin-bottom:6px')}>Nouveau mot de passe</span>
        <PasswordInput required autoComplete="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </label>
      <label style={{ display: 'block' }}>
        <span style={css('font-size:13px;font-weight:600;color:var(--muted,#8a8a8a);display:block;margin-bottom:6px')}>Confirmez le nouveau mot de passe</span>
        <PasswordInput required autoComplete="new-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </label>
      <p style={css('color:var(--muted,#8a8a8a);font-size:12px;margin:-4px 0 0')}>Au moins 10 caractères, avec une majuscule, une minuscule et un chiffre.</p>
      {error && (
        <div style={css('padding:12px;border-radius:10px;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.4);color:#f87171;font-size:13.5px')}>{error}</div>
      )}
      {success && (
        <div style={css('padding:12px;border-radius:10px;background:rgba(198,242,2,.1);border:1px solid rgba(198,242,2,.3);color:var(--fg,#fff);font-size:13.5px')}>
          Mot de passe mis à jour.
        </div>
      )}
      <button
        type="submit"
        disabled={submitting}
        style={css(`padding:13px;border-radius:10px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:14px;opacity:${submitting ? 0.6 : 1}`)}
      >
        {submitting ? 'Enregistrement…' : 'Changer le mot de passe'}
      </button>
    </form>
  );
}

export default function NutritionPartnerSettingsPage() {
  return (
    <div style={{ padding: 'clamp(24px,4vw,40px) clamp(16px,4vw,48px) 90px' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <Link href="/partenaires/nutrition" style={css('display:inline-block;color:var(--muted,#8a8a8a);font-size:13px;margin-bottom:18px')}>
          ← Retour
        </Link>
        <h1 style={css("font-family:'Broaven';font-weight:700;font-size:22px;margin-bottom:6px")}>Paramètres du compte</h1>
        <p style={css('color:var(--muted,#8a8a8a);font-size:13.5px;margin-bottom:28px')}>
          Vous êtes seul à connaître votre identifiant et votre mot de passe — l&apos;équipe GBÔ ne peut pas se connecter à votre espace.
        </p>

        <div
          style={css('padding:24px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c);margin-bottom:20px')}
        >
          <h2 style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Identifiant de connexion</h2>
          <ChangeEmailForm />
        </div>

        <div style={css('padding:24px;border-radius:16px;border:1px solid var(--border,rgba(255,255,255,.1));background:var(--surface,#0c0c0c)')}>
          <h2 style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Mot de passe</h2>
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
