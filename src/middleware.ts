import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { auth } from './lib/auth';

const protectedRoutes = ['/', '/entradas', '/investimentos', '/dashboard'];

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname.startsWith(route) || pathname === route,
  );

  if (isProtectedRoute && !session) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
};
