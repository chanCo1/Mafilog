/**
 * @file: middleware.ts
 * @author: chad
 * @since: 2026.05.17 ~
 * @description: 접근 권한 제어 미들웨어
 */

import { auth } from '@/app/api/[...nextauth]/route';
import { NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/', '/login', '/register'];

export default auth((req) => {
  const { pathname } = req.nextUrl;

  const isLoggedIn = !!req.auth;
  const isPublicPath = PUBLIC_ROUTES.includes(pathname);

  if (!isLoggedIn && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', req.nextUrl.origin));
  }

  if (isLoggedIn && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/', req.nextUrl.origin));
  }
});

export const config = {
  matcher: [
    '/my-map/:path*',
    '/my-page/:path*',
    '/my-travel/:path*',
    '/login',
    '/register',
    // '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
