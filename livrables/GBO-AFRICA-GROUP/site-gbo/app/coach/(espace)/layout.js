import { redirect } from 'next/navigation';
import { getCurrentCoach } from '../../../lib/coachAuth.js';
import SpaceTopBar from '../../../components/SpaceTopBar.js';

// Le contrôle qui fait foi : proxy.js ne vérifie que la présence du cookie (Edge, pas
// d'accès base de données), ce Server Component vérifie réellement la session avant de
// rendre quoi que ce soit sous /coach.
export default async function CoachSpaceLayout({ children }) {
  const coach = await getCurrentCoach();
  if (!coach) redirect('/coach/login');
  if (coach.mustChangePassword) redirect('/coach/changer-mot-de-passe');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg,#000)' }}>
      <SpaceTopBar email={coach.email} logoutUrl="/api/auth/coach/logout" loginUrl="/coach/login" />
      <main style={{ maxWidth: 960, margin: '0 auto', padding: '32px 20px 64px' }}>{children}</main>
    </div>
  );
}
