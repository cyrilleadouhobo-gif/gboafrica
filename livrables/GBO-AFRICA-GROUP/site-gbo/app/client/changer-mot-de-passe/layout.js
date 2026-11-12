import { redirect } from 'next/navigation';
import { getCurrentClient } from '../../../lib/clientAuth.js';

export const metadata = { title: 'Changer de mot de passe — Espace client GBÔ', robots: { index: false, follow: false } };

export default async function ChangePasswordLayout({ children }) {
  const client = await getCurrentClient();
  if (!client) redirect('/client/login');
  return children;
}
