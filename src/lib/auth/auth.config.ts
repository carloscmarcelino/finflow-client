import type { NextAuthConfig } from 'next-auth';

import { AUTH_SECRET } from '@/config';

import { CredentialsProvier } from './providers';

export const authConfig = {
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [CredentialsProvier],
  trustHost: true,
  secret: AUTH_SECRET,
} satisfies NextAuthConfig;
