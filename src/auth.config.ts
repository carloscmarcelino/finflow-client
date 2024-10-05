import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { postLogin } from './api/auth/endpoints';
import { AUTH_SECRET } from './config';
import { LoginSchema } from './modules/auth/pages/Login/schema';

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
      console.log('async jwt --> ', { token, user });

      return token;
    },
    async session({ session, token }) {
      console.log('async session -->', { session, token });

      return session;
    },
    async redirect() {
      return '/investimentos';
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const credentialsValidation = LoginSchema.safeParse(credentials);

        if (credentialsValidation.success) {
          const { username, password } = credentialsValidation.data;

          const response = await postLogin({ username, password });

          return { ...response, name: response.username };
        }

        return null;
      },
    }),
  ],
  secret: AUTH_SECRET,
} satisfies NextAuthConfig;
