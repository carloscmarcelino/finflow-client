import { useMutation } from '@tanstack/react-query';

import { deleteExpense } from '../endpoints';

export const useDeleteExpense = () =>
  useMutation({
    mutationKey: ['delete-expense'],
    mutationFn: deleteExpense,
  });
