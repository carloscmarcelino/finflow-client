import { z } from 'zod';

import { INVALID_FORMAT } from '@/config';

export const createExitSchema = z.object({
  amount: z.string().refine((val) => val !== '', { message: INVALID_FORMAT }),
  description: z.string().refine((val) => val !== '', { message: INVALID_FORMAT }),
  paymentMethod: z.object(
    {
      label: z.string(),
      value: z.object({
        id: z.string(),
        name: z.string(),
      }),
    },
    { message: INVALID_FORMAT },
  ),
});

export type CreateExitSchemaType = z.infer<typeof createExitSchema>;
