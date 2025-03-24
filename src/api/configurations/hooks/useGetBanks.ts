import { useQuery } from '@tanstack/react-query';

import { getBanks } from '../endpoints';
import { bankQueryKey } from '../queryKey';

export const useGetBanks = () =>
  useQuery({
    queryKey: [bankQueryKey.get],
    queryFn: getBanks,
  });
