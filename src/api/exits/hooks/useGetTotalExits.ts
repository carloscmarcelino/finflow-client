import { useQuery } from '@tanstack/react-query';

import { getTotalExits } from '../endpoints';
import { exitsQueryKey } from '../queryKey';
import { GetTotalExitsParams } from '../types';

export const useGetTotalExits = (params: GetTotalExitsParams) =>
  useQuery({
    queryKey: [exitsQueryKey.getTotal, ...Object.values(params)],
    queryFn: () => getTotalExits(params),
  });
