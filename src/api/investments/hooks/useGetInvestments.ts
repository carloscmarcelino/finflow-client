import { useQuery } from '@tanstack/react-query';

import { getInvestments } from '../endpoints';

export const useGetInvestments = () =>
  useQuery({
    queryKey: ['get-investments'],
    queryFn: () => getInvestments(),
  });
