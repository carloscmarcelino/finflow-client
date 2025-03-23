import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Suspense } from 'react';

import { getEntries, getTotalEntries, entriesQueryKey } from '@/api';
import { ContentSkeleton } from '@/components/skeleton';
import { EntriesPage } from '@/modules/entries';
import { SearchQueryParams } from '@/types';

const EntriesContent = async () => {
  const queryClient = new QueryClient();

  const params = {
    startDate: dayjs().startOf('month').toISOString(),
    endDate: dayjs().toISOString(),
    limit: 5,
    page: 1,
  } as SearchQueryParams;

  await queryClient.prefetchQuery({
    queryKey: [entriesQueryKey.get, ...Object.values(params)],
    queryFn: () => getEntries(params),
  });

  await queryClient.prefetchQuery({
    queryKey: [entriesQueryKey.getTotal, ...Object.values(params)],
    queryFn: () =>
      getTotalEntries({
        startDate: params.startDate,
        endDate: params.endDate,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EntriesPage params={params} />
    </HydrationBoundary>
  );
};

const Page = () => (
  <Suspense fallback={<ContentSkeleton />}>
    <EntriesContent />
  </Suspense>
);

export default Page;
