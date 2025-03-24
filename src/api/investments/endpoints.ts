import api from '@/lib/api';
import { ApiResponse } from '@/types';

import { CreateInvestmentBody, EditInvestmentBody, Investment, TotalInvestments } from './types';

export const getInvestments = async () => {
  const response = await api.authorized().get<ApiResponse<Investment>>('investments');

  return response.json();
};

export const getTotalInvestments = async () => {
  const response = await api.authorized().get<TotalInvestments>('investments/total');

  return response.json();
};

export const createInvestment = (body: CreateInvestmentBody) =>
  api.authorized().post('investments', {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const deleteInvestment = (id: string) => api.authorized().delete(`investments/${id}`);

export const editInvestment = ({ id, body }: { id: string; body: EditInvestmentBody }) =>
  api.authorized().patch(`investments/${id}`, {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
