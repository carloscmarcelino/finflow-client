import { api } from '@/lib/FetchClient';

import { ApiResponse, ReadFn } from '../__common__/types';

import { CreateInvestment, Investment } from './types';

export const getInvestments: ReadFn<ApiResponse<Investment>> = ({ config } = {}) =>
  api.unauthorized.get('/investment', {
    ...config,
    next: {
      revalidate: 0,
      tags: ['investment'],
    },
  });

export const createInvestment = (body: CreateInvestment) =>
  api.unauthorized.post('/investment', {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const deleteInvestment = (id: string) => api.unauthorized.delete(`/investment/${id}`);

export const editInvestment = ({ id, body }: { id: string; body: CreateInvestment }) =>
  api.unauthorized.patch(`/investment/${id}`, {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
