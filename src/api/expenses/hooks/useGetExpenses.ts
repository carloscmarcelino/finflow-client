import { useQuery } from '@tanstack/react-query';

import { SearchQueryParams } from '@/types';

import { getExpenses } from '../endpoints';
import { expensesQueryKey } from '../queryKey';

export const useGetExpenses = (params: SearchQueryParams) =>
  useQuery({
    queryKey: [expensesQueryKey.get, ...Object.values(params)],
    queryFn: () => {
      if (params.page && params.limit) {
        const skip = (params.page - 1) * params.limit;
        const queryParams = { ...params, skip, limit: params.limit };
        return getExpenses(queryParams);
      }
    },
  });
