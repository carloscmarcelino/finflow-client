import { CreateFn, ReadFn } from '@/api/__common__/types';
import { api } from '@/lib/FetchClient';
import { ApiResponse } from '@/types';

import { Expense, StackBody, StackResponse } from './types';

export const postStack: CreateFn<StackBody, StackResponse> = ({ body, config }) =>
  api.unauthorized.post('/list', {
    ...config,
    body: body,
    next: {
      revalidate: 60 * 60 * 24,
      tags: ['stacks'],
    },
  });

export const getExpenses: ReadFn<ApiResponse<Expense>> = ({ config } = {}) =>
  api.unauthorized.get('/expense', {
    ...config,
    next: {
      revalidate: 0,
      tags: ['expense'],
    },
  });

export const deleteExpense = (id: string) => api.unauthorized.delete(`/expense/${id}`);
