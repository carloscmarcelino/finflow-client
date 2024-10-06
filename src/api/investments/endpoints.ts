import { api } from '@/lib/FetchClient';

import { ApiResponse, ReadFn } from '../__common__/types';
import { Tags } from '../types';

import { CreateInvestment, Investment } from './types';

export const getInvestments: ReadFn<ApiResponse<Investment>> = ({ config } = {}) =>
  api.unauthorized.get('/investments', {
    ...config,
    next: {
      revalidate: 0,
      tags: [Tags.INVESTMENTS],
    },
  });

export const createInvestment = (body: CreateInvestment) =>
  api.unauthorized.post('/investments', {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const deleteInvestment = (id: string) => api.unauthorized.delete(`/investments/${id}`);

export const editInvestment = ({ id, body }: { id: string; body: CreateInvestment }) =>
  api.unauthorized.patch(`/investments/${id}`, {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
