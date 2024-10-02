import { Suspense } from 'react';

import { getExpenses } from '@/api/public/endpoints';
import { Public } from '@/modules/public/pages';

const PublicPage = async () => {
  const { data } = await getExpenses();

  return (
    <Suspense>
      <Public data={data} />
    </Suspense>
  );
};

export default PublicPage;
