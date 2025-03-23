import { useQuery } from '@tanstack/react-query';

import { getInvestmentsTypes } from '../endpoints';
import { investmentTypeQueryKey } from '../queryKey';

export const useGetInvestmentsType = () =>
  useQuery({
    queryKey: [investmentTypeQueryKey.get],
    queryFn: getInvestmentsTypes,
  });
