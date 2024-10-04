'use server';

import { signIn } from '@/auth';

import { LoginType } from './schema';

export async function loginAction(data: LoginType) {
  await signIn('credentials', data);
}
