import { NextResponse } from 'next/server';

// Edge-safe layer: security headers on every response, plus a cheap "is there even a
// session cookie" gate on /admin. The real, cryptographically-verified check against the
// database happens server-side in app/admin/(dashboard)/layout.js and in each
// /api/admin/* route handler (Prisma/SQLite needs the Node.js runtime, not Edge) — this
// middleware is a fast-fail convenience, never the sole security boundary.

const SESSION_COOKIE = 'gbo_session';

export function middleware(request) {
  const nonce = crypto.randomUUID().replace(/-/g, '');
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && pathname !== '/admin/login' && !request.cookies.get(SESSION_COOKIE)) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  if (pathname.startsWith('/api/admin') && !request.cookies.get(SESSION_COOKIE)) {
    return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    // Inline style attributes (style={{...}}) can't carry a nonce — CSP has no nonce
    // mechanism for style="" attributes, only for <style> elements. Allowing unsafe-inline
    // for styles only (not scripts) keeps the high-value XSS protection on script-src
    // while accepting the much lower risk profile of inline CSS.
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    'upgrade-insecure-requests',
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(), camera=(), microphone=(), payment=()');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
