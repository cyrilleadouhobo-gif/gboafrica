import { POLE_DETAIL } from '../../../data/poles.js';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const detail = POLE_DETAIL[slug];
  if (!detail) return {};
  return { title: `${detail.name} — GBÔ AFRICA GROUP` };
}

export default function PoleLayout({ children }) {
  return children;
}
