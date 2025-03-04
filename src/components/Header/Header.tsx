import React from 'react';

import { auth } from '@/auth';
import { toBRL } from '@/utils/formatters/toBRL';

import { HeaderOptions } from './HeaderOptions';

export const Header = async () => {
  const session = await auth();

  if (!session?.user) return <></>;

  // const params = {
  //   startDate: dayjs().startOf('month').toISOString(),
  //   endDate: dayjs().toISOString(),
  // };

  // const balance = await getBalance({ params });

  // return <HeaderOptions session={session} balance={toBRL(balance.total)} />;
  return <HeaderOptions session={session} balance={toBRL(0)} />;
};
