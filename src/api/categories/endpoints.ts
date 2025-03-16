import api from '@/lib/api';
import { ApiResponse } from '@/types';

import { CreateExpenseCategodyBody, ExpensesCategory } from './types';

export const createExpenseCategory = async (body: CreateExpenseCategodyBody) => {
  const response = await api.authorized().post('configurations/expenses-category', {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};

export const getExpensesCategories = async () => {
  const response = await api
    .authorized()
    .get<ApiResponse<ExpensesCategory>>('configurations/expenses-category');
  return response.json();
};
