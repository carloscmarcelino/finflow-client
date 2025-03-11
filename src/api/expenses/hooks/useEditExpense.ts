import { useMutation } from '@tanstack/react-query';

import { editExpense } from '../endpoints';
import { expensesQueryKey } from '../queryKey';

export const useEditExpense = () =>
  useMutation({
    mutationKey: [expensesQueryKey.edit],
    mutationFn: editExpense,
  });
