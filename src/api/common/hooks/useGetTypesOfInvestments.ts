import { useQuery } from '@tanstack/react-query';

import { getTypesOfInvestments } from '../endpoints';

export const useGetTypesOfInvestments = () =>
  useQuery({
    queryKey: ['get-types-of-investments'],
    queryFn: () => getTypesOfInvestments(),
  });
