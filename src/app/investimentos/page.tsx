import { Suspense } from 'react';

import { getInvestments } from '@/api/investments/endpoints';
import { InvestmentsPage } from '@/modules/investments';

const Page = async () => {
  const { data } = await getInvestments();

  return (
    <Suspense>
      <InvestmentsPage data={data} />
    </Suspense>
  );
};

export default Page;
