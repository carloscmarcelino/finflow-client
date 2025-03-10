import { useMutation } from '@tanstack/react-query';

import { editInvestment } from '../endpoints';
import { investmentsQueryKey } from '../queryKey';

export const useEditInvestment = () =>
  useMutation({
    mutationKey: [investmentsQueryKey.edit],
    mutationFn: editInvestment,
  });
