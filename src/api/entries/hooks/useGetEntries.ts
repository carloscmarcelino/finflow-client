import { useQuery } from '@tanstack/react-query';

import { getEntries } from '../endpoints';

export type GetEntriesParams = {
  startDate?: string;
  endDate?: string;
};

export const useGetEntries = (params: GetEntriesParams) =>
  useQuery({
    queryKey: ['get-entries', ...Object.values(params)],
    queryFn: () => getEntries({ params }),
  });
