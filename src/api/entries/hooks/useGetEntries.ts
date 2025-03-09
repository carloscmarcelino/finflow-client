import { useQuery } from '@tanstack/react-query';

import { getEntries } from '../endpoints';
import { entriesQueryKey } from '../queryKey';
import { GetEntriesParams } from '../types';

export const useGetEntries = (params: GetEntriesParams) =>
  useQuery({
    queryKey: [entriesQueryKey.get, ...Object.values(params)],
    queryFn: () => {
      const skip = (params.page - 1) * params.limit;

      const queryParams = { ...params, skip, limit: params.limit };

      return getEntries(queryParams);
    },
  });
