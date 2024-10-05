import { useMutation } from '@tanstack/react-query';

import { deleteInvestment } from '../endpoints';

export const useDeleteInvestment = () =>
  useMutation({
    mutationKey: ['delete-investment'],
    mutationFn: deleteInvestment,
  });
