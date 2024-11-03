import { z } from 'zod';

export const entriesFilterValidator = z.object({
  search: z.string(),
  period: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

export type EntiresFilterType = z.infer<typeof entriesFilterValidator>;
