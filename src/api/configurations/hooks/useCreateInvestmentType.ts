import { useMutation } from '@tanstack/react-query';
import { investmentTypeQueryKey } from '../queryKey';
import { createInvestmentType } from '../endpoints';

export const useCreateInvestmentType = () =>
  useMutation({
    mutationKey: [investmentTypeQueryKey.post],
    mutationFn: createInvestmentType,
  });
