import { redirect } from 'next/navigation';
import { getCurrentNutritionPartner } from '../../../../lib/auth.js';

// Authoritative gate, mirrors app/admin/(dashboard)/layout.js: middleware only checks
// cookie presence (Edge, no DB access), this Server Component verifies the session AND
// the role against the database. An 'admin' session gets redirected here just like a
// logged-out visitor — this space is exclusively for role === 'nutrition_partner'.
export default async function NutritionPartnerDashboardLayout({ children }) {
  const partner = await getCurrentNutritionPartner();
  if (!partner) {
    redirect('/partenaires/nutrition/login');
  }
  return children;
}
