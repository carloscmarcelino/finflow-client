import { Suspense } from 'react';

import { getInvestments, getTotalInvestments } from '@/api/investments/endpoints';
import { InvestmentsPage } from '@/modules/investments';

const Page = async () => {
  const { data } = await getInvestments();

  const tatalData = await getTotalInvestments();

  return (
    <Suspense>
      <InvestmentsPage data={data} totalData={tatalData} />
    </Suspense>
  );
};

export default Page;
