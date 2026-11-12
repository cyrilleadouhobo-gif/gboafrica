import { redirect } from 'next/navigation';
import { getCurrentClient } from '../../../lib/clientAuth.js';
import SpaceTopBar from '../../../components/SpaceTopBar.js';

// Le contrôle qui fait foi : proxy.js ne vérifie que la présence du cookie (Edge, pas
// d'accès base de données), ce Server Component vérifie réellement la session avant de
// rendre quoi que ce soit sous /client.
export default async function ClientSpaceLayout({ children }) {
  const client = await getCurrentClient();
  if (!client) redirect('/client/login');
  if (client.mustChangePassword) redirect('/client/changer-mot-de-passe');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg,#000)' }}>
      <SpaceTopBar email={client.email} logoutUrl="/api/auth/client/logout" loginUrl="/client/login" />
      <main style={{ maxWidth: 960, margin: '0 auto', padding: '32px 20px 64px' }}>{children}</main>
    </div>
  );
}
