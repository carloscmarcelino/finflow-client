import { useMutation } from '@tanstack/react-query';

import { editInvestment } from '../endpoints';

export const useEditInvestment = () =>
  useMutation({
    mutationKey: ['edit-investment'],
    mutationFn: editInvestment,
  });
