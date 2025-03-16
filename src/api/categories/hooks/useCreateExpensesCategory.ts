import { useMutation } from '@tanstack/react-query';

import { categoriesQueryKey } from '../categoriesQueryKey';
import { createExpenseCategory } from '../endpoints';

export const useCreateExpensesCategory = () =>
  useMutation({
    mutationKey: [categoriesQueryKey.expenses.post],
    mutationFn: createExpenseCategory,
  });
