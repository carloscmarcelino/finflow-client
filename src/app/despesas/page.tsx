import { Suspense } from 'react';

import { getExpenses } from '@/api/expenses';
import { ExpensesPage } from '@/modules/Expenses';

const Page = async () => {
  const { data } = await getExpenses();

  return (
    <Suspense>
      <ExpensesPage data={data} />
    </Suspense>
  );
};

export default Page;
