import { Suspense } from 'react';

import { getExits, getTotalExits } from '@/api/exits';
import { ExitsPage } from '@/modules/exits';

const Page = async () => {
  const { data } = await getExits();

  const totalData = await getTotalExits();

  return (
    <Suspense>
      <ExitsPage data={data} totalData={totalData} />
    </Suspense>
  );
};

export default Page;
