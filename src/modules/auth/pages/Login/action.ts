'use server';

import { signIn } from 'next-auth/react';

import { LoginType } from '../../validators';

export async function loginAction(data: LoginType) {
  await signIn('credentials', data);
}
