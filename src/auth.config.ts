import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { postLogin } from './api/auth/endpoints';
import { AUTH_SECRET } from './config';
import { loginSchema } from './modules/auth/validators';

export const authConfig = {
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;

      return session;
    },
    async redirect() {
      return '/investimentos';
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const credentialsValidation = loginSchema.safeParse(credentials);

        if (credentialsValidation.success) {
          const { username, password } = credentialsValidation.data;

          const response = await postLogin({ username, password });

          return { ...response, name: response.username, id: response.id };
        }

        return null;
      },
    }),
  ],
  secret: AUTH_SECRET,
} satisfies NextAuthConfig;
