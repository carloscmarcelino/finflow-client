import { useQuery } from '@tanstack/react-query';

import { getTotalEntries } from '../endpoints';
import { GetTotalEntriesParams } from '../types';

export const useGetTotalEntries = (params: GetTotalEntriesParams) =>
  useQuery({
    queryKey: ['get-total-entries', ...Object.values(params)],
    queryFn: () => getTotalEntries(params),
  });
