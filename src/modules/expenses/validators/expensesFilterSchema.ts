import { z } from 'zod';

export const expensesFilterSchema = z.object({
  search: z.string(),
  period: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

export type ExpensesFilterType = z.infer<typeof expensesFilterSchema>;
