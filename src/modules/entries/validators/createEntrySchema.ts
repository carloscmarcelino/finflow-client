import { z } from 'zod';

import { INVALID_FORMAT } from '@/config';

export const createEntrySchema = z.object({
  value: z.string().refine((val) => val !== '', { message: INVALID_FORMAT }),
  description: z.string().refine((val) => val !== '', { message: INVALID_FORMAT }),
  date: z.date(),
});

export type CreateEntrySchemaType = z.infer<typeof createEntrySchema>;
