import { redirect } from 'next/navigation';
import { getCurrentMember } from '../../../lib/memberAuth.js';

// Contrôle faisant autorité — le proxy ne vérifie que la présence du cookie (Edge, pas
// d'accès BDD) ; ce Server Component vérifie réellement la session avant tout rendu.
export default async function EspaceMembreLayout({ children }) {
  const member = await getCurrentMember();
  if (!member) {
    redirect('/compte');
  }
  return children;
}
