import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { destroyMemberSessionCookie, getCurrentMember, MEMBER_SESSION_COOKIE } from '../../../../../lib/memberAuth.js';
import { logAudit } from '../../../../../lib/auth.js';
import { isSameOrigin } from '../../../../../lib/security.js';

export async function POST(request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const member = await getCurrentMember();
  const cookieStore = await cookies();
  const raw = cookieStore.get(MEMBER_SESSION_COOKIE)?.value;
  if (raw) await destroyMemberSessionCookie(raw);
  if (member) await logAudit({ adminUserId: null, action: 'member_logout', targetType: 'Member', targetId: member.id });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(MEMBER_SESSION_COOKIE, '', { httpOnly: true, path: '/', expires: new Date(0) });
  return response;
}
