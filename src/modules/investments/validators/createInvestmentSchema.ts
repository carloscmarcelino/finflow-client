import { z } from 'zod';

import { INVALID_FORMAT } from '@/config';

export const createInvestmentSchema = z.object({
  type: z.object(
    {
      label: z.string(),
      value: z.string(),
    },
    { message: INVALID_FORMAT },
  ),
  value: z.string().refine((val) => val !== '', { message: INVALID_FORMAT }),
  yield: z.string().refine((val) => val !== '', { message: INVALID_FORMAT }),
  broker: z.object(
    {
      label: z.string(),
      value: z.string(),
    },
    { message: INVALID_FORMAT },
  ),
  date: z.date(),
});

export type CreateInvestmentType = z.infer<typeof createInvestmentSchema>;
