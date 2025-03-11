import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Suspense } from 'react';

import { expensesQueryKey, getExpenses, getTotalExpenses } from '@/api';
import { ExpensesPage } from '@/modules/expenses';
import { SearchQueryParams } from '@/types';

const Page = async () => {
  const queryClient = new QueryClient();

  const params = {
    startDate: dayjs().startOf('month').toISOString(),
    endDate: dayjs().toISOString(),
    limit: 5,
    page: 1,
  } as SearchQueryParams;

  await queryClient.prefetchQuery({
    queryKey: [expensesQueryKey.get, ...Object.values(params)],
    queryFn: () => getExpenses(params),
  });

  await queryClient.prefetchQuery({
    queryKey: [expensesQueryKey.getTotal, ...Object.values(params)],
    queryFn: () => getTotalExpenses(params),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense>
        <ExpensesPage params={params} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
