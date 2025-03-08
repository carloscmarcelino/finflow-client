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
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.email = user.email as string;
        token.name = user.name as string;
        token.access_token = user.access_token as string;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.access_token = token.access_token as string;
      }
      return session;
    },
  },
  trustHost: true,
  secret: AUTH_SECRET,
} satisfies NextAuthConfig;
