import { NextResponse } from 'next/server';
import { getCurrentAdmin } from '../../../../lib/auth.js';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ admin: null }, { status: 401 });
  return NextResponse.json({ admin: { email: admin.email, role: admin.role } });
}
