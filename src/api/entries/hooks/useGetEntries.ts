import { useQuery } from '@tanstack/react-query';

import { getEntries } from '../endpoints';
import { GetEntriesParams } from '../types';

export const useGetEntries = (params: GetEntriesParams) =>
  useQuery({
    queryKey: ['get-entries', params],
    queryFn: () => {
      const skip = (params.page - 1) * params.limit;

      const queryParams = { ...params, skip, limit: params.limit };

      return getEntries(queryParams);
    },
  });
