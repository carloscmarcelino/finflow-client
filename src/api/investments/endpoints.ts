import api from '@/lib/api';

import { Investment, TotalInvestments } from './types';

export const getInvestments = async () => {
  const response = await api.authorized().get<Investment[]>('/investments');

  return response.json();
};

export const getTotalInvestments = async () => {
  const response = await api.authorized().get<TotalInvestments>('/investments/total');

  return response.json();
};

export const createInvestment = (body: BodyInit) =>
  api.authorized().post('/investments', {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const deleteInvestment = (id: string) => api.authorized().delete(`/investments/${id}`);

export const editInvestment = ({ id, body }: { id: string; body: BodyInit }) =>
  api.authorized().patch(`/investments/${id}`, {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
