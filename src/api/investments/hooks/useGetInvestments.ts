import { useQuery } from '@tanstack/react-query';

import { getInvestments } from '../endpoints';
import { investmentsQueryKey } from '../queryKey';

export const useGetInvestments = () =>
  useQuery({
    queryKey: [investmentsQueryKey.get],
    queryFn: () => getInvestments(),
  });
