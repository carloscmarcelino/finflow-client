import api from '@/lib/api';
import { ApiResponse, SearchQueryParams } from '@/types';

import { Expense, TotalExpenses } from './types';

export const getExpenses = async (params: SearchQueryParams) => {
  const response = await api.authorized().get<ApiResponse<Expense[]>>('expenses', {
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

export const createExpense = (body: BodyInit) =>
  api.authorized().post('expenses', {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const editExpense = ({ id, body }: { id: string; body: BodyInit }) =>
  api.authorized().patch(`expenses/${id}`, {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
