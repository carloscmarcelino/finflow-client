import { useQuery } from '@tanstack/react-query';

import { getTotalEntries } from '../endpoints';

export const useGetTotalEntries = () =>
  useQuery({
    queryKey: ['get-total-entries'],
    queryFn: () => getTotalEntries(),
  });
