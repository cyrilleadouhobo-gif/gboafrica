export function css(str) {
  const out = {};
  if (!str) return out;
  String(str)
    .split(';')
    .forEach((rule) => {
      const idx = rule.indexOf(':');
      if (idx === -1) return;
      const prop = rule.slice(0, idx).trim();
      const val = rule.slice(idx + 1).trim();
      if (!prop || !val) return;
      const camel = prop.startsWith('--') ? prop : prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      out[camel] = val;
    });
  return out;
}
