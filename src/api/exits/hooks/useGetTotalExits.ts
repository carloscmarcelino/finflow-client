import { useQuery } from '@tanstack/react-query';

import { getTotalExits } from '../endpoints';

type UseGetTotalExitsParams = {
  startDate?: string;
  endDate?: string;
};

export const useGetTotalExits = (params: UseGetTotalExitsParams) =>
  useQuery({
    queryKey: ['get-total-exits', ...Object.values(params)],
    queryFn: () => getTotalExits({ params }),
  });
