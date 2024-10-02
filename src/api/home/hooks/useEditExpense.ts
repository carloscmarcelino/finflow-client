import { useMutation } from '@tanstack/react-query';

import { editExpense } from '../endpoints';

export const useEditExpense = () =>
  useMutation({
    mutationKey: ['edit-expense'],
    mutationFn: editExpense,
  });
