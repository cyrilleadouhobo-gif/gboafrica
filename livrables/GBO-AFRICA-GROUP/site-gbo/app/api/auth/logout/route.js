import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { destroySessionCookie, getCurrentAdmin, logAudit, SESSION_COOKIE } from '../../../../lib/auth.js';

export async function POST() {
  const admin = await getCurrentAdmin();
  const raw = cookies().get(SESSION_COOKIE)?.value;
  if (raw) await destroySessionCookie(raw);
  if (admin) await logAudit({ adminUserId: admin.id, action: 'logout', targetType: 'AdminUser', targetId: admin.id });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, '', { httpOnly: true, path: '/', expires: new Date(0) });
  return response;
}
