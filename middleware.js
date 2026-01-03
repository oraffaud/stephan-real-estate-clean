import { NextResponse } from 'next/server';

const SUPPORTED = ['en', 'fr'];

function detectLang(request) {
  const header = request.headers.get('accept-language') || '';
  const lower = header.toLowerCase();
  if (lower.includes('fr')) return 'fr';
  return 'en';
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip Next internals and API.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap.xml')
  ) {
    return NextResponse.next();
  }

  // Root -> lang
  if (pathname === '/') {
    const lang = detectLang(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${lang}`;
    return NextResponse.redirect(url);
  }

  // Already language-prefixed?
  const seg = pathname.split('/')[1];
  if (SUPPORTED.includes(seg)) return NextResponse.next();

  // Otherwise prefix with detected lang.
  const lang = detectLang(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${lang}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!.*\\..*).*)'],
};
