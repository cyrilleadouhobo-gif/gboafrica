import { POLE_DETAIL } from '../../../data/poles.js';
import { pageMetadata } from '../../../lib/site.js';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const detail = POLE_DETAIL[slug];
  if (!detail) return {};
  return pageMetadata({
    title: `${detail.name} — GBÔ AFRICA GROUP`,
    description: detail.heroText,
    path: `/poles/${slug}`,
    images: detail.photo ? [detail.photo] : undefined,
  });
}

export default function PoleLayout({ children }) {
  return children;
}
