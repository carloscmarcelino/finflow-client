// export { auth as middleware } from '@/auth';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { AUTH_SECRET } from './config';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: AUTH_SECRET });

  console.log('middleware token --> ', token);

  const { pathname } = req.nextUrl;

  // Se o token não estiver presente e o usuário estiver acessando uma rota protegida, redireciona para login
  const protectedPaths = ['/', '/despesas', '/investimentos'];
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtectedPath && !token && pathname !== '/login') {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Se o usuário estiver autenticado e tentar acessar a página de login, redireciona para home
  if (token && pathname === '/login') {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // Se tudo estiver ok, permite a continuação do fluxo
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/despesas/:path*', '/investimentos/:path*', '/login'],
};
