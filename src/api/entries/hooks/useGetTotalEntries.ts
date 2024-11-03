import { useQuery } from '@tanstack/react-query';

import { getTotalEntries } from '../endpoints';

type UseGetTotalEntriesParams = {
  startDate?: string;
  endDate?: string;
};

export const useGetTotalEntries = (params: UseGetTotalEntriesParams) =>
  useQuery({
    queryKey: ['get-total-entries', ...Object.values(params)],
    queryFn: () => getTotalEntries({ params }),
  });
