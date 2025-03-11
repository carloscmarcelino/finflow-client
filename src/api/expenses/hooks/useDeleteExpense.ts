import { useMutation } from '@tanstack/react-query';

import { deleteExpense } from '../endpoints';
import { expensesQueryKey } from '../queryKey';

export const useDeleteExpense = () =>
  useMutation({
    mutationKey: [expensesQueryKey.delete],
    mutationFn: deleteExpense,
  });
