import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { AUTH_SECRET } from './config';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: AUTH_SECRET });

  const { pathname } = req.nextUrl;

  const protectedPaths = ['/', '/despesas', '/investimentos', 'entradas', 'saidas'];

  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtectedPath && !token && pathname !== '/login') {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (token && pathname === '/login') {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/despesas/:path*', '/investimentos/:path*', '/login'],
};
