import { useMutation } from '@tanstack/react-query';

import { deleteInvestment } from '../endpoints';
import { investmentsQueryKey } from '../queryKey';

export const useDeleteInvestment = () =>
  useMutation({
    mutationKey: [investmentsQueryKey.delete],
    mutationFn: deleteInvestment,
  });
