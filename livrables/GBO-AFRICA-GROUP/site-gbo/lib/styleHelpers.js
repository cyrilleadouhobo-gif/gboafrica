export function leadBadge(status) {
  const map = {
    Nouveau: '#C6F202',
    'À contacter': '#7dd3fc',
    Qualifié: '#a78bfa',
    'Coach attribué': '#fbbf24',
    Client: '#34d399',
    'Perdu / En pause': '#f87171',
  };
  const c = map[status] || '#8a8a8a';
  return 'display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:20px;font-size:11.5px;font-weight:700;background:' + c + '1f;color:' + c + ';border:1px solid ' + c + '55';
}

export function tabStyle(active) {
  return (
    'padding:11px 18px;border-radius:11px;font-size:14px;font-weight:600;cursor:pointer;white-space:nowrap;border:1px solid ' +
    (active ? 'var(--lime,#C6F202)' : 'transparent') +
    ';background:' +
    (active ? 'rgba(198,242,2,.12)' : 'transparent') +
    ';color:' +
    (active ? 'var(--lime,#C6F202)' : 'var(--muted,#8a8a8a)')
  );
}

export function chip(selected) {
  return (
    'text-align:left;padding:16px 18px;border-radius:14px;border:1px solid ' +
    (selected ? 'var(--lime,#C6F202)' : 'var(--border,rgba(255,255,255,.12))') +
    ';background:' +
    (selected ? 'rgba(198,242,2,.12)' : 'var(--glass,rgba(255,255,255,.03))') +
    ';cursor:pointer;transition:.16s;font-size:15px;font-weight:600;color:var(--fg,#fff);width:100%;box-shadow:' +
    (selected ? '0 0 0 1px var(--lime,#C6F202) inset' : 'none')
  );
}
