import { Suspense } from 'react';

import { getExpenses } from '@/api/expenses';
import { ExpensesPage } from '@/modules/expenses';

const Page = async () => {
  const { data } = await getExpenses();

  return (
    <Suspense>
      <ExpensesPage data={data} />
    </Suspense>
  );
};

export default Page;
