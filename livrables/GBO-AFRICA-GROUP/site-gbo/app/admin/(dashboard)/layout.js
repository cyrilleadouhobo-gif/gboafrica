import { redirect } from 'next/navigation';
import { getCurrentStaffAdmin } from '../../../lib/auth.js';

// The authoritative gate. Middleware only checks "is there a cookie at all" (Edge, no
// DB access); this Server Component runs in the Node.js runtime and actually verifies
// the session against the database before rendering anything under /admin.
export default async function AdminDashboardLayout({ children }) {
  const admin = await getCurrentStaffAdmin();
  if (!admin) {
    redirect('/admin/login');
  }
  return children;
}
