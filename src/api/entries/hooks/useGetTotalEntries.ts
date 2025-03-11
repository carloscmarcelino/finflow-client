import { useQuery } from '@tanstack/react-query';

import { SearchQueryParams } from '@/types';

import { getTotalEntries } from '../endpoints';
import { entriesQueryKey } from '../queryKey';

export const useGetTotalEntries = (params: SearchQueryParams) =>
  useQuery({
    queryKey: [entriesQueryKey.getTotal, ...Object.values(params)],
    queryFn: () => getTotalEntries(params),
  });
