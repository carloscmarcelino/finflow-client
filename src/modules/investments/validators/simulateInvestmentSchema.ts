import { z } from 'zod';

import { INVALID_FORMAT } from '@/config';

export const simulateInvestmentSchema = z.object({
  initialValue: z.string().trim().min(1, INVALID_FORMAT),
  monthlyValue: z.string().trim().min(1, INVALID_FORMAT),
  interestRate: z.string().trim().min(1, INVALID_FORMAT),
  period: z.string().trim().min(1, INVALID_FORMAT),
});

export type SimulateInvestmentType = z.infer<typeof simulateInvestmentSchema>;
