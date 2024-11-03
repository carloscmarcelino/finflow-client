import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Suspense } from 'react';

import { getEntries, GetEntriesParams, getTotalEntries } from '@/api/entries';
import { EntriesPage } from '@/modules/entries';

const Page = async () => {
  const queryClient = new QueryClient();

  const params = {
    startDate: dayjs().startOf('month').toISOString(),
    endDate: dayjs().toISOString(),
    limit: 5,
    page: 1,
  } as GetEntriesParams;

  await queryClient.prefetchQuery({
    queryKey: ['get-entries', ...Object.values(params)],
    queryFn: () => getEntries({ params }),
  });

  await queryClient.prefetchQuery({
    queryKey: ['get-total-entries', ...Object.values(params)],
    queryFn: () =>
      getTotalEntries({
        params: {
          startDate: params.startDate,
          endDate: params.endDate,
        },
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense>
        <EntriesPage params={params} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
