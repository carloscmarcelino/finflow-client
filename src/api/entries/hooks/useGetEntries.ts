import { useQuery } from '@tanstack/react-query';

import { getEntries } from '../endpoints';

export type GetEntriesParams = {
  startDate?: string;
  endDate?: string;
  limit: number;
  page: number;
};

export const useGetEntries = (params: GetEntriesParams) =>
  useQuery({
    queryKey: ['get-entries', params],
    queryFn: () => {
      const skip = (params.page - 1) * params.limit;
      return getEntries({ params: { ...params, skip, limit: params.limit } });
    },
  });
