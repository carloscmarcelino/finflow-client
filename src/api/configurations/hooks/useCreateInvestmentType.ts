import { useMutation } from '@tanstack/react-query';

import { createInvestmentType } from '../endpoints';
import { investmentTypeQueryKey } from '../queryKey';

export const useCreateInvestmentType = () =>
  useMutation({
    mutationKey: [investmentTypeQueryKey.post],
    mutationFn: createInvestmentType,
  });
