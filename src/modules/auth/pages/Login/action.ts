'use server';

import { signIn } from '@/auth';

import { LoginType } from '../../validators';

export async function loginAction(data: LoginType) {
  await signIn('credentials', data);
}
