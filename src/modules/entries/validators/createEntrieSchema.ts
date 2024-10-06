import { z } from 'zod';

import { INVALID_FORMAT } from '@/config';

export const createEntrieSchema = z.object({
  value: z.string().refine((val) => val !== '', { message: INVALID_FORMAT }),
  description: z.string().refine((val) => val !== '', { message: INVALID_FORMAT }),
});

export type CreateEntrieSchemaType = z.infer<typeof createEntrieSchema>;
