import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';

import { investmentsQueryKey } from '@/api';
import { getInvestments, getTotalInvestments } from '@/api/investments/endpoints';
import { InvestmentsPage } from '@/modules/investments';

const Page = async () => {
  const queryClient = new QueryClient();

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
        <InvestmentsPage />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
