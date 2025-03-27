import { z } from 'zod';

import { INVALID_FORMAT } from '@/config';

export const expensesFilterSchema = z.object({
  search: z.string(),
  period: z.object({
    from: z.date(),
    to: z.date(),
  }),
  expenseCategory: z
    .object(
      {
        label: z.string(),
        value: z.record(z.string(), z.string()),
      },
      { message: INVALID_FORMAT },
    )
    .optional(),
});

export type ExpensesFilterType = z.infer<typeof expensesFilterSchema>;
