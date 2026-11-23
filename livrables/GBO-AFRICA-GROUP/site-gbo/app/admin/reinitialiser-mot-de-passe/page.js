'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { css } from '../../../lib/css.js';
import PasswordInput from '../../../components/PasswordInput.js';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (newPassword !== confirmPassword) {
      setError('Les deux mots de passe ne correspondent pas.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Une erreur est survenue.');
        return;
      }
      setDone(true);
      setTimeout(() => router.replace('/admin/login'), 2500);
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
          Choisissez un nouveau mot de passe
        </h1>

        {!token ? (
          <>
            <p style={css('color:var(--muted,#8a8a8a);font-size:13.5px;margin-bottom:22px')}>
              Ce lien est incomplet. Refaites une demande de réinitialisation.
            </p>
            <Link href="/admin/mot-de-passe-oublie" style={css('color:var(--lime,#C6F202);font-size:13.5px;font-weight:600')}>
              ← Demander un nouveau lien
            </Link>
          </>
        ) : done ? (
          <div style={css('padding:14px;border-radius:12px;background:rgba(198,242,2,.1);border:1px solid rgba(198,242,2,.3);color:var(--fg,#fff);font-size:13.5px;text-align:center')}>
            Mot de passe mis à jour. Redirection vers la connexion…
          </div>
        ) : (
          <>
            <p style={css('color:var(--muted,#8a8a8a);font-size:13.5px;margin-bottom:26px')}>
              Ce lien est à usage unique et expire dans 1 heure.
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 14 }}>
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
          </>
        )}
      </div>
    </div>
  );
}

export default function AdminResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordContent />
    </Suspense>
  );
}
