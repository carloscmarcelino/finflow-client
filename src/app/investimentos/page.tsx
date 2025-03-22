import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Suspense } from 'react';

import { investmentsQueryKey, getInvestments, getTotalInvestments } from '@/api';
import { InvestmentsPage } from '@/modules/investments';
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
    queryKey: [investmentsQueryKey.get],
    queryFn: () => getInvestments(),
  });

  await queryClient.prefetchQuery({
    queryKey: [investmentsQueryKey.getTotal],
    queryFn: () => getTotalInvestments(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<></>}>
        <InvestmentsPage params={params} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
