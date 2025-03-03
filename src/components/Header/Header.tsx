import dayjs from 'dayjs';
import React from 'react';

import { getTotalEntries } from '@/api/entries';
import { getTotalExits } from '@/api/exits';
import { auth } from '@/auth';
import { toBRL } from '@/utils/formatters/toBRL';

import { HeaderOptions } from './HeaderOptions';

export const Header = async () => {
  const session = await auth();

  const formatDateParams = () => {
    const startOfMonth = dayjs().startOf('month').toISOString();
    const endOfMonth = dayjs().endOf('month').toISOString();

    return {
      startDate: startOfMonth,
      endDate: endOfMonth,
    };
  };

  if (!session?.user) return <></>;

  const totalEntries = await getTotalEntries({ params: formatDateParams() });

  const totalExits = await getTotalExits();

  const balance = toBRL(totalEntries.total - totalExits.total);

  return <HeaderOptions session={session} balance={balance} />;
};
