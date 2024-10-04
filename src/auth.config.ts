import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { AUTH_SECRET } from '@/config';

import { postLogin } from './api/auth/endpoints';
import { LoginSchema } from './modules/auth/pages/Login/schema';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access_token = user.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.access_token = token.access_token as string;
      }
      return session;
    },
    authorized({ auth }) {
      const isLoggedIn = !!auth?.user;

      return isLoggedIn;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const credentialsValidation = LoginSchema.safeParse(credentials);

        if (credentialsValidation.success) {
          const { username, password } = credentialsValidation.data;

          const response = await postLogin({ username, password });

          return {
            ...response,
          };
        }

        return null;
      },
    }),
  ],
  debug: false,
  secret: AUTH_SECRET,
} satisfies NextAuthConfig;
