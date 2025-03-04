import { z } from 'zod';

export const exitsFilterValidator = z.object({
  search: z.string(),
  period: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

export type ExitsFilterType = z.infer<typeof exitsFilterValidator>;
