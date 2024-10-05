import { useMutation } from '@tanstack/react-query';

import { createInvestment } from '../endpoints';

export const useCreateInvestment = () =>
  useMutation({
    mutationKey: ['create-investment'],
    mutationFn: createInvestment,
  });
