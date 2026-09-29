'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { css } from '../../../lib/css.js';
import ImageSlot from '../../../components/ImageSlot.js';
import { stockPhotoDirect } from '../../../lib/stockPhoto.js';
import CoachApplicationForm from '../../../components/CoachApplicationForm.js';

function PostulerContent() {
  const searchParams = useSearchParams();
  const poste = searchParams.get('poste');

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,40px) clamp(64px,9vw,110px)' }}>
      <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr));gap:clamp(32px,5vw,48px);align-items:center')}>
        <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 24, overflow: 'hidden', border: '1px solid var(--border,rgba(255,255,255,.1))' }}>
          <ImageSlot placeholder="Rejoindre GBÔ" src={stockPhotoDirect('photo-1554244933-d876deb6b2ff', '900x1100')} />
          <div style={css('position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,5,5,0) 55%,rgba(5,5,5,.85) 100%)')} />
          <div style={{ position: 'absolute', left: 24, right: 24, bottom: 24 }}>
            <div style={css("font-family:'Broaven';font-weight:700;font-size:clamp(18px,2.4vw,24px);line-height:1.2")}>
              DES TALENTS <span style={{ color: 'var(--lime,#C6F202)' }}>POUR UN IMPACT DURABLE.</span>
            </div>
          </div>
        </div>

        <div>
          {poste && (
            <div style={css('display:inline-block;padding:5px 12px;border-radius:20px;background:var(--lime,#C6F202);color:#000;font-size:12px;font-weight:700;margin-bottom:16px')}>
              {poste}
            </div>
          )}
          <h1 style={css("font-family:'Broaven';font-weight:700;font-size:clamp(22px,5vw,38px);letter-spacing:-1.5px;margin-bottom:10px")}>
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
