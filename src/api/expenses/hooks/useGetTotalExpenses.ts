import { useQuery } from '@tanstack/react-query';

import { SearchQueryParams } from '@/types';

import { getTotalExpenses } from '../endpoints';
import { expensesQueryKey } from '../queryKey';

export const useGetTotalExpenses = (params: SearchQueryParams) =>
  useQuery({
    queryKey: [expensesQueryKey.getTotal, ...Object.values(params)],
    queryFn: () => getTotalExpenses(params),
  });
