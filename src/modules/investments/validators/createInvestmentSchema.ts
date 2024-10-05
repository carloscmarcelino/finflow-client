import { z } from 'zod';

import { INVALID_FORMAT } from '@/config';

export const createInvestmentSchema = z.object({
  type: z.string().refine((val) => val !== '', { message: INVALID_FORMAT }),
  value: z.string().refine((val) => val !== '', { message: INVALID_FORMAT }),
  yield: z.string().refine((val) => val !== '', { message: INVALID_FORMAT }),
  bank: z.string().refine((val) => val !== '', { message: INVALID_FORMAT }),
});

export type CreateInvestmentType = z.infer<typeof createInvestmentSchema>;
