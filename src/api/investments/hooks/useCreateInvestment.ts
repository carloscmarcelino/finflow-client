import { useMutation } from '@tanstack/react-query';

import { createInvestment } from '../endpoints';
import { investmentsQueryKey } from '../queryKey';

export const useCreateInvestment = () =>
  useMutation({
    mutationKey: [investmentsQueryKey.create],
    mutationFn: createInvestment,
  });
