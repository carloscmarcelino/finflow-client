import { ApiResponse, ReadFn } from '@/api/__common__/types';
import { api } from '@/lib/FetchClient';

import { CreateExpense, Expense } from './types';

export const getExpenses: ReadFn<ApiResponse<Expense>> = ({ config } = {}) =>
  api.unauthorized.get('/expense', {
    ...config,
    next: {
      revalidate: 0,
      tags: ['expense'],
    },
  });

export const deleteExpense = (id: string) => api.unauthorized.delete(`/expense/${id}`);

export const createExpense = (body: CreateExpense) =>
  api.unauthorized.post('/expense', {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
