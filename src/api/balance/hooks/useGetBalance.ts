import { useQuery } from '@tanstack/react-query';

import { getBalance } from '../endpoints';
import { balanceQueryKey } from '../queryKey';

export const useGetBalance = () =>
  useQuery({
    queryKey: [balanceQueryKey.get],
    queryFn: () => getBalance(),
  });
