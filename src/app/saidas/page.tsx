import { Suspense } from 'react';

import { getExits } from '@/api/exits';
import { ExitsPage } from '@/modules/exits';

const Page = async () => {
  const { data } = await getExits();

  return (
    <Suspense>
      <ExitsPage data={data} />
    </Suspense>
  );
};

export default Page;
