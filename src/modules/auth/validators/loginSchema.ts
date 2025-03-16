import { z } from 'zod';

import { INVALID_FORMAT } from '@/config';

export const loginSchema = z.object({
  username: z.string().trim().min(1, { message: INVALID_FORMAT }),
  password: z.string().trim().min(1, { message: INVALID_FORMAT }),
});

export type LoginType = z.infer<typeof loginSchema>;
