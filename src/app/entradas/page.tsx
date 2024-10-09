import { Suspense } from 'react';

import { getEntries, getTotalEntries } from '@/api/entries';
import { EntriesPage } from '@/modules/entries';

const Page = async () => {
  const { data } = await getEntries();

  const totalEntries = await getTotalEntries();

  return (
    <Suspense>
      <EntriesPage data={data} totalEntries={totalEntries} />
    </Suspense>
  );
};

export default Page;
