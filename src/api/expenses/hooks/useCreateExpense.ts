import { useMutation } from '@tanstack/react-query';

import { createExpense } from '../endpoints';
import { expensesQueryKey } from '../queryKey';

export const useCreateExpense = () =>
  useMutation({
    mutationKey: [expensesQueryKey.create],
    mutationFn: createExpense,
  });
