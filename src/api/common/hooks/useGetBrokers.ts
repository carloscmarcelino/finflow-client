import { useQuery } from '@tanstack/react-query';

import { getBrokers } from '../endpoints';

export const useGetBrokers = () =>
  useQuery({
    queryKey: ['get-brokers'],
    queryFn: () => getBrokers(),
  });
