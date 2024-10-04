'use server';

import { auth, signOut } from '@/auth';

export const currentUser = async () => {
  'use server';

  const session = await auth();

  return session?.user;
};
