import { useQuery } from '@tanstack/react-query';

import { categoriesQueryKey } from '../categoriesQueryKey';
import { getExpensesCategories } from '../endpoints';

export const useGetExpensesCategories = () =>
  useQuery({
    queryKey: [categoriesQueryKey.expenses.get],
    queryFn: getExpensesCategories,
  });
