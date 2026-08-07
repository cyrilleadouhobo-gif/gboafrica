'use client';

import { css } from '../lib/css.js';
import { useAppData } from '../context/AppData.js';

export default function Toast() {
  const { toast } = useAppData();
  if (!toast) return null;

  return (
    <div
      style={css(
        "position:fixed;left:50%;bottom:26px;transform:translateX(-50%);z-index:120;display:flex;align-items:center;gap:12px;padding:14px 22px;border-radius:14px;background:#141414;border:1px solid var(--lime,#C6F202);color:#fff;box-shadow:0 20px 50px rgba(0,0,0,.5);animation:fadeUp .3s both;max-width:90vw"
      )}
    >
      <span
        style={css(
          'width:26px;height:26px;border-radius:50%;background:var(--lime,#C6F202);color:#000;display:flex;align-items:center;justify-content:center;flex:0 0 auto'
        )}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M5 12l5 5L20 6" />
        </svg>
      </span>
      <span style={{ fontSize: 14, fontWeight: 500 }}>{toast}</span>
    </div>
  );
}
