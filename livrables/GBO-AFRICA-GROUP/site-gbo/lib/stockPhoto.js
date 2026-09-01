// Temporary stock photos (hand-picked on Unsplash — free tier, hotlink-safe CDN) so the
// site isn't full of gray boxes before GBÔ supplies its own brand photography. Chosen to
// feature Black/African subjects, matching the brand's Abidjan context. `seed` picks a
// deterministic photo per slot (stable across reloads) from the matching category.
// Swap these for real GBÔ photos by editing BANK below, or per-usage in the page files.

// Every ID below was individually downloaded and eyeballed before being added here —
// don't add more without doing the same (Unsplash search results include mismatches).
const BANK = {
  // Men, gym/strength training
  fitnessMen: ['photo-1572459815549-873917ec8c0a', 'photo-1504364269860-8be73aabdff2', 'photo-1633956287950-4a482f0356c8', 'photo-1633956319625-df645828880d'],
  // Women, fitness/movement/yoga
  fitnessWomen: [
    'photo-1603503363848-6952525df449',
    'photo-1572224384995-f9529873f379',
    'photo-1554244933-d876deb6b2ff',
    'photo-1651525764791-3ae6ce60094c',
  ],
  // Team / corporate / community
  team: ['photo-1573164574511-73c773193279', 'photo-1573164574397-dd250bc8a598', 'photo-1584365132623-e273491c69d2'],
  // Nutrition / food
  nutrition: ['photo-1605552981700-68484762d021', 'photo-1578121786255-aa255d1cff6f'],
  // Senior
  senior: ['photo-1590697442615-a381b5b557c7'],
  // Gym interior / equipment (modern, bright)
  gymInterior: ['photo-1534438327276-14e5300c3a48'],
  // Group / network / community — several people together, team spirit
  community: ['photo-1584365132623-e273491c69d2'],
  // General portrait / lifestyle (testimonials, avatars) — dropped photo-1634826225912-905141f688f3
  // (café/breakfast shot, not fitness-appropriate — was showing up for unrelated names/contexts).
  portrait: ['photo-1572224384995-f9529873f379', 'photo-1603503363848-6952525df449'],
};

function hashSeed(seed) {
  const str = String(seed);
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

export function stockPhoto(category, seed, size = '800x600') {
  const pool = BANK[category] || BANK.fitnessMen;
  const id = pool[hashSeed(seed) % pool.length];
  const [w, h] = size.split('x');
  return `https://images.unsplash.com/${id}?w=${w}&h=${h}&q=75&auto=format&fit=crop`;
}

// Formats a specific Unsplash photo id directly, bypassing the hash-based pool pick above.
// Use when a slot needs a guaranteed, hand-matched photo (e.g. one portrait per named
// person) rather than whatever the hash happens to land on.
export function stockPhotoDirect(id, size = '800x600') {
  const [w, h] = size.split('x');
  return `https://images.unsplash.com/${id}?w=${w}&h=${h}&q=75&auto=format&fit=crop`;
}
