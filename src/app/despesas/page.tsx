import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Suspense } from 'react';

import { expensesQueryKey, getExpenses, getTotalExpenses } from '@/api';
import { ContentSkeleton } from '@/components/skeleton';
import { ExpensesPage } from '@/modules/expenses';
import { SearchQueryParams } from '@/types';

const ExpensesContent = async () => {
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
      <ExpensesPage params={params} />
    </HydrationBoundary>
  );
};

const Page = () => (
  <Suspense fallback={<ContentSkeleton />}>
    <ExpensesContent />
  </Suspense>
);

export default Page;
