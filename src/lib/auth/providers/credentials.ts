import Credentials from 'next-auth/providers/credentials';

import { postLogin } from '@/api/auth';
import { loginSchema } from '@/modules/auth/validators';

export const CredentialsProvier = Credentials({
  async authorize(credentials) {
    const credentialsValidation = loginSchema.safeParse(credentials);

    if (credentialsValidation.success) {
      const { username, password } = credentialsValidation.data;

      const response = await postLogin(JSON.stringify({ username, password }));

      return {
        ...response,
        name: response.username,
        id: response.id,
        access_token: response.access_token,
      };
    }

    return null;
  },
});
