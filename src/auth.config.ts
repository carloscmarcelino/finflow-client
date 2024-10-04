import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { postLogin } from './api/auth/endpoints';
import { AUTH_SECRET } from './config';
import { LoginSchema } from './modules/auth/pages/Login/schema';

export const authConfig = {
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
