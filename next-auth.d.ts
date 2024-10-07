import { type DefaultSession } from 'next-auth';
declare module 'next-auth' {
  interface User extends DefaultSession['user'] {
    access_token: string;
    username: string;
  }
}

interface User extends DefaultSession['user'] {
  id: string;
  username: string;
  name: string;
}

declare module '@auth/core/types' {
  interface Session {
    access_token: string;
  }

  interface User extends User {
    access_token: string;
  }
}

declare module '@auth/core/jwt' {
  interface JWT extends User {
    access_token: string;
  }
}
