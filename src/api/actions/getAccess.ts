'use server';

import { auth } from '@/auth';

export async function getAccess() {
  const session = await auth();
  return session?.access_token;
}
