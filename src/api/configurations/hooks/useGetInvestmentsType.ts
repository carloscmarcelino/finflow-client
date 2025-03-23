import { useQuery } from '@tanstack/react-query';
import { investmentTypeQueryKey } from '../queryKey';
import { getInvestmentsTypes } from '../endpoints';

export const useGetInvestmentsType = () =>
  useQuery({
    queryKey: [investmentTypeQueryKey.get],
    queryFn: getInvestmentsTypes,
  });
