import { z } from 'zod';

import { INVALID_FORMAT } from '@/config';

export const createEntriesSchema = z.object({
  value: z.string().refine((val) => val !== '', { message: INVALID_FORMAT }),
  description: z.string().refine((val) => val !== '', { message: INVALID_FORMAT }),
});

export type CreateEntriesSchema = z.infer<typeof createEntriesSchema>;
