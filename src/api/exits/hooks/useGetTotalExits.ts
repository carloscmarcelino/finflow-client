import { useQuery } from '@tanstack/react-query';

import { getTotalExits } from '../endpoints';
import { GetTotalExitsParams } from '../types';

export const useGetTotalExits = (params: GetTotalExitsParams) =>
  useQuery({
    queryKey: ['get-total-exits', ...Object.values(params)],
    queryFn: () => getTotalExits(params),
  });
