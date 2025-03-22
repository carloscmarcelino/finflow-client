import { z } from 'zod';

export const investmentsFilterSchema = z.object({
  search: z.string(),
  period: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

export type InvestmentsFilterType = z.infer<typeof investmentsFilterSchema>;
