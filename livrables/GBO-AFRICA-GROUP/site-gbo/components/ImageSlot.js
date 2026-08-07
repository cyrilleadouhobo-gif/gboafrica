import { css } from '../lib/css.js';

export default function ImageSlot({ shape = 'rect', placeholder = 'Image à venir', src, style }) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={placeholder}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: shape === 'circle' ? '50%' : 0,
          ...style,
        }}
      />
    );
  }

  return (
    <div
      style={{
        ...css(
          'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:12px;font-size:12px;font-weight:600;color:var(--muted,#8a8a8a);background:var(--surface2,#161616);border:1px dashed var(--border,rgba(255,255,255,.16))'
        ),
        borderRadius: shape === 'circle' ? '50%' : 0,
        ...style,
      }}
    >
      {placeholder}
    </div>
  );
}
