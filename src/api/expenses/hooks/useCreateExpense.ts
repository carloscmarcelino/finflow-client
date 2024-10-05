import { useMutation } from '@tanstack/react-query';

import { createExpense } from '../endpoints';

export const useCreateExpense = () =>
  useMutation({
    mutationKey: ['create-expense'],
    mutationFn: createExpense,
  });
