'use server';

import { auth } from '@/auth';

export const currentUser = async () => {
  'use server';

  const session = await auth();

  return session?.user;
};
