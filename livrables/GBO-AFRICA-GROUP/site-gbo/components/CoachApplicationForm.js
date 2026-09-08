'use client';

import { useRef, useState } from 'react';
import { css } from '../lib/css.js';
import { useAppData } from '../context/AppData.js';
import Honeypot from './Honeypot.js';

const fieldStyle = css(
  "padding:15px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.14));background:var(--inputbg,rgba(255,255,255,.04));color:var(--fg,#fff);font-size:15px"
);

// 3 Mo de fichier réel — une fois encodé en base64 (+33 %) et ajouté au reste du
// formulaire, ça reste sous la limite de taille de requête de Vercel (~4.5 Mo). Voir
// lib/validation.js careerSchema pour le même plafond côté serveur.
const MAX_CV_BYTES = 3 * 1024 * 1024;
const ACCEPTED_CV_TYPES = {
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
};

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1] || '');
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

// Used by /careers/postuler — posts to /api/careers, which stores every submission as a
// Message (type CAREER) for the admin to review. No dedicated Coach-application table:
// a coach only becomes a Coach record once GBÔ actually onboards them.
export default function CoachApplicationForm({ jobTitle }) {
  const { showToast } = useAppData();
  const [submitting, setSubmitting] = useState(false);
  const [cvFile, setCvFile] = useState(null);
  const fileInputRef = useRef(null);

  const pickCv = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ACCEPTED_CV_TYPES[file.type]) {
      showToast('Format non accepté. Utilisez un PDF, DOC ou DOCX.');
      e.target.value = '';
      return;
    }
    if (file.size > MAX_CV_BYTES) {
      showToast('Le fichier dépasse 3 Mo. Choisissez un fichier plus léger.');
      e.target.value = '';
      return;
    }
    setCvFile(file);
  };

  const removeCv = () => {
    setCvFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const submitCareer = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const f = new FormData(e.target);
    try {
      let cv = null;
      if (cvFile) {
        cv = { filename: cvFile.name, contentType: cvFile.type, base64: await readFileAsBase64(cvFile) };
      }
      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom: f.get('nom'), tel: f.get('tel'), email: f.get('email'), spec: f.get('spec'), msg: f.get('msg'), cv, website: f.get('website') }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Une erreur est survenue, réessayez.');
        return;
      }
      e.target.reset();
      removeCv();
      showToast('Candidature reçue. Merci de votre intérêt pour GBÔ.');
    } catch {
      showToast('Connexion impossible. Réessayez.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submitCareer}>
      <div style={css('display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px')}>
        <input required name="nom" placeholder="Nom complet *" style={fieldStyle} />
        <input required name="tel" type="tel" placeholder="Téléphone *" style={fieldStyle} />
        <input required name="email" type="email" placeholder="E-mail *" style={fieldStyle} />
        <input name="spec" placeholder="Spécialité (ex. prénatal, senior…)" style={fieldStyle} />
        <textarea
          name="msg"
          rows={3}
          placeholder="Parlez-nous de vous, vos certifications, vos zones"
          defaultValue={jobTitle ? `Poste souhaité : ${jobTitle}\n` : undefined}
          style={{ ...fieldStyle, gridColumn: '1/-1', resize: 'vertical' }}
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <input ref={fileInputRef} type="file" accept={Object.values(ACCEPTED_CV_TYPES).join(',')} onChange={pickCv} style={{ display: 'none' }} id="cv-input" />
        {!cvFile ? (
          <label
            htmlFor="cv-input"
            style={css(
              'display:flex;align-items:center;gap:10px;padding:15px;border-radius:12px;border:1px dashed var(--border,rgba(255,255,255,.2));color:var(--muted,#8a8a8a);font-size:14px;cursor:pointer'
            )}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
              <path d="M12 3v12M7 10l5-5 5 5" />
              <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
            </svg>
            Joindre votre CV (PDF, DOC — 3 Mo max)
          </label>
        ) : (
          <div
            style={css(
              'display:flex;align-items:center;gap:10px;padding:13px 15px;border-radius:12px;border:1px solid var(--border,rgba(255,255,255,.14));background:var(--inputbg,rgba(255,255,255,.04));font-size:14px'
            )}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--lime,#C6F202)" strokeWidth="2" style={{ flexShrink: 0 }}>
              <path d="M9 12l2 2 4-4" />
              <circle cx="12" cy="12" r="9" />
            </svg>
            <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cvFile.name}</span>
            <button
              type="button"
              onClick={removeCv}
              aria-label="Retirer le fichier"
              style={css('flex:0 0 auto;color:var(--muted,#8a8a8a);font-size:13px;font-weight:700;cursor:pointer')}
            >
              Retirer
            </button>
          </div>
        )}
      </div>

      <Honeypot />
      <button
        type="submit"
        disabled={submitting}
        style={css(`margin-top:20px;width:100%;padding:16px;border-radius:12px;background:var(--lime,#C6F202);color:#000;font-weight:700;font-size:16px;opacity:${submitting ? 0.6 : 1}`)}
      >
        {submitting ? 'Envoi…' : 'Envoyer ma candidature'}
      </button>
    </form>
  );
}
