import { useQuery } from '@tanstack/react-query';

import { getTotalInvestments } from '../endpoints';

export const useGetTotalInvestments = () =>
  useQuery({
    queryKey: ['get-total-investments'],
    queryFn: () => getTotalInvestments(),
  });
