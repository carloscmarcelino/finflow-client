import { z } from 'zod';

import { INVALID_FORMAT } from '@/config';

export const loginSchema = z.object({
  username: z.string({ required_error: INVALID_FORMAT }).trim(),
  password: z.string({ required_error: INVALID_FORMAT }).trim(),
});

export type LoginType = z.infer<typeof loginSchema>;
