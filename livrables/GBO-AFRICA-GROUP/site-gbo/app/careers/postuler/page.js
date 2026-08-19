'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { css } from '../../../lib/css.js';
import CoachApplicationForm from '../../../components/CoachApplicationForm.js';

function PostulerContent() {
  const searchParams = useSearchParams();
  const poste = searchParams.get('poste');

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,40px) clamp(64px,9vw,110px)' }}>
      <div style={css('font-size:13px;color:var(--muted,#8a8a8a);margin-bottom:20px')}>
        <Link href="/careers">Carrières</Link> <span style={{ opacity: 0.5 }}>/</span> Postuler
      </div>
      {poste && (
        <div style={css('display:inline-block;padding:5px 12px;border-radius:20px;background:var(--lime,#C6F202);color:#000;font-size:12px;font-weight:700;margin-bottom:16px')}>
          {poste}
        </div>
      )}
      <h1 style={css("font-family:'Big Shoulders Display';font-weight:700;font-size:clamp(28px,5vw,44px);letter-spacing:-1.5px;margin-bottom:10px")}>
        Votre candidature
      </h1>
      <p style={css('color:var(--muted,#8a8a8a);font-size:15px;margin-bottom:30px;line-height:1.5')}>
        Un conseiller GBÔ revient vers vous rapidement.
      </p>
      <div
        style={css(
          'padding:clamp(28px,4vw,44px);border-radius:24px;border:1px solid var(--border,rgba(255,255,255,.12));background:var(--surface,#0c0c0c)'
        )}
      >
        <CoachApplicationForm jobTitle={poste} />
      </div>
    </div>
  );
}

export default function PostulerPage() {
  return (
    <Suspense fallback={null}>
      <PostulerContent />
    </Suspense>
  );
}
