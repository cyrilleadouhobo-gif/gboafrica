import { redirect } from 'next/navigation';
import { getCurrentCoach } from '../../../lib/coachAuth.js';

export const metadata = { title: 'Changer de mot de passe — Espace coach GBÔ', robots: { index: false, follow: false } };

export default async function CoachChangePasswordLayout({ children }) {
  const coach = await getCurrentCoach();
  if (!coach) redirect('/coach/login');
  return children;
}
