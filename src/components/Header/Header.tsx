import dayjs from 'dayjs';
import React from 'react';

import { getBalance } from '@/api/balance';
import { auth } from '@/lib/auth';
import { toBRL } from '@/utils/mask';

import { HeaderOptions } from './HeaderOptions';

export const Header = async () => {
  const session = await auth();

  if (!session) return <></>;

  const params = {
    startDate: dayjs().startOf('month').toISOString(),
    endDate: dayjs().toISOString(),
  };

  const { balance } = await getBalance(params);

  return <HeaderOptions session={session} balance={toBRL(balance)} />;
};
