import { useQuery } from '@tanstack/react-query';

import { getTotalInvestments } from '../endpoints';
import { investmentsQueryKey } from '../queryKey';

export const useGetTotalInvestments = () =>
  useQuery({
    queryKey: [investmentsQueryKey.getTotal],
    queryFn: () => getTotalInvestments(),
  });
