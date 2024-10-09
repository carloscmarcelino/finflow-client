import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';

import { getInvestments, getTotalInvestments } from '@/api/investments/endpoints';
import { InvestmentsPage } from '@/modules/investments';

const Page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['get-investments'],
    queryFn: () => getInvestments(),
  });

  await queryClient.prefetchQuery({
    queryKey: ['get-total-investments'],
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
