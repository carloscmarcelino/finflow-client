import { useQuery } from '@tanstack/react-query';

import { getTotalEntries } from '../endpoints';
import { entriesQueryKey } from '../queryKey';
import { GetTotalEntriesParams } from '../types';

export const useGetTotalEntries = (params: GetTotalEntriesParams) =>
  useQuery({
    queryKey: [entriesQueryKey.getTotal, ...Object.values(params)],
    queryFn: () => getTotalEntries(params),
  });
