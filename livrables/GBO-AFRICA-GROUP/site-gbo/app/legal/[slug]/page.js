import Link from 'next/link';
import { notFound } from 'next/navigation';
import { css } from '../../../lib/css.js';
import { LEGAL } from '../../../data/legal.js';

const TABS = [
  { key: 'mentions', label: 'Mentions légales' },
  { key: 'cgu', label: 'CGU' },
  { key: 'cgv', label: 'CGV' },
  { key: 'privacy', label: 'Confidentialité' },
];

export default async function LegalPage({ params }) {
  const { slug } = await params;
  const legal = LEGAL[slug];
  if (!legal) notFound();

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,40px) clamp(64px,9vw,110px)' }}>
      <div style={css('display:flex;gap:8px;flex-wrap:wrap;margin-bottom:34px')}>
        {TABS.map((t) => (
          <Link
            key={t.key}
            href={`/legal/${t.key}`}
            style={css(
              `padding:8px 14px;border-radius:20px;border:1px solid ${
                t.key === slug ? 'var(--lime,#C6F202)' : 'var(--border,rgba(255,255,255,.14))'
              };font-size:13px;font-weight:600;cursor:pointer;color:${t.key === slug ? 'var(--lime,#C6F202)' : 'var(--muted,#8a8a8a)'}`
            )}
          >
            {t.label}
          </Link>
        ))}
      </div>
      <h1 style={css("font-family:'Big Shoulders Display';font-weight:700;font-size:clamp(30px,5vw,46px);letter-spacing:-1px;margin-bottom:6px")}>{legal.title}</h1>
      <div style={css('font-size:13px;color:var(--muted,#8a8a8a);margin-bottom:34px')}>{legal.updated}</div>
      <div style={{ display: 'grid', gap: 26 }}>
        {legal.sections.map((sec) => (
          <div key={sec.h}>
            <h2 style={css("font-family:'Big Shoulders Display';font-weight:700;font-size:20px;margin-bottom:10px")}>{sec.h}</h2>
            <p style={css('font-size:15px;color:var(--muted,#8a8a8a);line-height:1.65')}>{sec.p}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
