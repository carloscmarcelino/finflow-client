import { useQuery } from '@tanstack/react-query';

import { SearchQueryParams } from '@/types';

import { getEntries } from '../endpoints';
import { entriesQueryKey } from '../queryKey';

export const useGetEntries = (params: SearchQueryParams) =>
  useQuery({
    queryKey: [entriesQueryKey.get, ...Object.values(params)],
    queryFn: () => {
      if (params.page && params.limit) {
        const skip = (params.page - 1) * params.limit;

        const queryParams = { ...params, skip, limit: params.limit };

        return getEntries(queryParams);
      }
    },
  });
