import { Suspense } from 'react';

import { getEntries } from '@/api/entries';
import { EntriesPage } from '@/modules/entries/pages';

const Page = async () => {
  const { data } = await getEntries();

  return (
    <Suspense>
      <EntriesPage data={data} />
    </Suspense>
  );
};

export default Page;
