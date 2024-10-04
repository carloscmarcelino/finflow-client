import React from 'react';

import { auth } from '@/auth';

import { HeaderOptions } from './HeaderOptions';

export const Header = async () => {
  const session = await auth();

  return <HeaderOptions session={session} />;
};
