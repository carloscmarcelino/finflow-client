import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Suspense } from 'react';

import { GetExitsParams } from '@/api';
import { getExits, getTotalExits } from '@/api/exits';
import { ExitsPage } from '@/modules/exits';

const Page = async () => {
  const queryClient = new QueryClient();

  const params = {
    startDate: dayjs().startOf('month').toISOString(),
    endDate: dayjs().toISOString(),
    limit: 5,
    page: 1,
  } as GetExitsParams;

  await queryClient.prefetchQuery({
    queryKey: ['get-exits', ...Object.values(params)],
    queryFn: () => getExits(params),
  });

  await queryClient.prefetchQuery({
    queryKey: ['get-total-exits', ...Object.values(params)],
    queryFn: () =>
      getTotalExits({
        startDate: params.startDate,
        endDate: params.endDate,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense>
        <ExitsPage params={params} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
