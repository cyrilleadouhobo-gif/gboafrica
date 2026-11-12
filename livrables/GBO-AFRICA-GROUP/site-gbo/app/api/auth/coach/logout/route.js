import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { destroyCoachSessionCookie, COACH_SESSION_COOKIE } from '../../../../../lib/coachAuth.js';
import { logAudit } from '../../../../../lib/auth.js';
import { isSameOrigin } from '../../../../../lib/security.js';

export async function POST(request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 });

  const cookieStore = await cookies();
  const raw = cookieStore.get(COACH_SESSION_COOKIE)?.value;
  if (raw) {
    await destroyCoachSessionCookie(raw);
    await logAudit({ adminUserId: null, action: 'coach_logout', targetType: 'CoachSession', targetId: raw.split('.')[0] });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COACH_SESSION_COOKIE, '', { httpOnly: true, path: '/', expires: new Date(0) });
  return response;
}
