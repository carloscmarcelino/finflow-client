import { api } from '@/lib/FetchClient';

import { ApiResponse, ReadFn } from '../__common__/types';
import { Tags } from '../types';

import { CreateInvestment, Investment } from './types';

export const getInvestments: ReadFn<ApiResponse<Investment>> = ({ config } = {}) =>
  api.authorized.get('/investments', {
    ...config,
    next: {
      tags: [Tags.INVESTMENTS],
    },
  });

export const createInvestment = (body: CreateInvestment) =>
  api.authorized.post('/investments', {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const deleteInvestment = (id: string) => api.authorized.delete(`/investments/${id}`);

export const editInvestment = ({ id, body }: { id: string; body: CreateInvestment }) =>
  api.authorized.patch(`/investments/${id}`, {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
