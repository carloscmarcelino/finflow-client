import api from '@/lib/api';
import { ApiResponse, SearchQueryParams } from '@/types';

import { CreateExpenseBody, EditExpenseBody, Expense, TotalExpenses } from './types';

export const getExpenses = async (params: SearchQueryParams) => {
  const response = await api.authorized().get<ApiResponse<Expense>>('expenses', {
    searchParams: params,
  });
  return response.json();
};

export const getTotalExpenses = async (params: SearchQueryParams) => {
  const response = await api.authorized().get<TotalExpenses>('expenses/total', {
    searchParams: params,
  });
  return response.json();
};

export const deleteExpense = (id: string) => api.authorized().delete(`expenses/${id}`);

export const createExpense = (body: CreateExpenseBody) =>
  api.authorized().post('expenses', {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const editExpense = ({ id, body }: { id: string; body: EditExpenseBody }) =>
  api.authorized().patch(`expenses/${id}`, {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
