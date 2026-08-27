import { NextResponse } from 'next/server';

// Edge-safe layer: security headers on every response, plus a cheap "is there even a
// session cookie" gate on /admin. The real, cryptographically-verified check against the
// database happens server-side in app/admin/(dashboard)/layout.js and in each
// /api/admin/* route handler (Prisma/SQLite needs the Node.js runtime, not Edge) — this
// middleware is a fast-fail convenience, never the sole security boundary.

const SESSION_COOKIE = 'gbo_session';

export function proxy(request) {
  const nonce = crypto.randomUUID().replace(/-/g, '');
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && pathname !== '/admin/login' && !request.cookies.get(SESSION_COOKIE)) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  if (pathname.startsWith('/api/admin') && !request.cookies.get(SESSION_COOKIE)) {
    return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });
  }
  if (pathname.startsWith('/partenaires/nutrition') && pathname !== '/partenaires/nutrition/login' && !request.cookies.get(SESSION_COOKIE)) {
    return NextResponse.redirect(new URL('/partenaires/nutrition/login', request.url));
  }
  if (pathname.startsWith('/api/partner') && !request.cookies.get(SESSION_COOKIE)) {
    return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 });
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  const isDev = process.env.NODE_ENV !== 'production';

  // Next.js dev mode compiles with eval()-based source maps for Fast Refresh — blocking
  // 'unsafe-eval' breaks hydration entirely in dev (not just HMR). This is a real gap
  // between dev and prod CSP that's well documented for Next.js; the strict, eval-free
  // policy below is what actually ships in production.
  const scriptSrc = isDev ? `script-src 'self' 'unsafe-eval' 'nonce-${nonce}' 'strict-dynamic'` : `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`;

  const csp = [
    "default-src 'self'",
    scriptSrc,
    // Inline style attributes (style={{...}}) can't carry a nonce — CSP has no nonce
    // mechanism for style="" attributes, only for <style> elements. Allowing unsafe-inline
    // for styles only (not scripts) keeps the high-value XSS protection on script-src
    // while accepting the much lower risk profile of inline CSS.
    "style-src 'self' 'unsafe-inline'",
    // TODO: drop images.unsplash.com once real GBÔ photography replaces the temporary
    // stock images (see lib/stockPhoto.js) — no third-party image host should be needed then.
    "img-src 'self' data: https://images.unsplash.com",
    // Broaven is self-hosted (public/fonts/broaven) — no external font host needed.
    "font-src 'self'",
    isDev ? "connect-src 'self' ws:" : "connect-src 'self'", // ws: for the dev-mode HMR websocket
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
