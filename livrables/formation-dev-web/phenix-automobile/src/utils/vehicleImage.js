export function vehiclePhoto(brand, seed) {
  const brandSlug = (brand || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const tag = brandSlug ? `car,${brandSlug}` : 'car';
  return `https://loremflickr.com/400/300/${tag}?lock=${seed}`;
}
