import { z } from 'zod';

import { INVALID_FORMAT } from '@/config';

export const createExitSchema = z.object({
  amount: z.string().refine((val) => val !== '', { message: INVALID_FORMAT }),
  description: z.string().refine((val) => val !== '', { message: INVALID_FORMAT }),
  paymentMethod: z.object(
    {
      label: z.string(),
      value: z.record(z.string(), z.unknown()),
    },
    { message: INVALID_FORMAT },
  ),
});

export type CreateExitSchemaType = z.infer<typeof createExitSchema>;
