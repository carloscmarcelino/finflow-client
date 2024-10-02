import { Suspense } from 'react';

import { getExpenses } from '@/api/home/endpoints';
import { Home } from '@/modules/home/pages/Home';

const PublicPage = async () => {
  const { data } = await getExpenses();

  return (
    <Suspense>
      <Home data={data} />
    </Suspense>
  );
};

export default PublicPage;
