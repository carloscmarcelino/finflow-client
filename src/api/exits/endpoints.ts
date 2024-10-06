import { ApiResponse, ReadFn } from '@/api/__common__/types';
import { api } from '@/lib/FetchClient';

import { Tags } from '../types';

import { CreateExit, Exit } from './types';

export const getExits: ReadFn<ApiResponse<Exit>> = ({ config } = {}) =>
  api.unauthorized.get('/exits', {
    ...config,
    next: {
      revalidate: 0,
      tags: [Tags.EXITS],
    },
  });

export const deleteExit = (id: string) => api.unauthorized.delete(`/exits/${id}`);

export const createExit = (body: CreateExit) =>
  api.unauthorized.post('/exits', {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const editExit = ({ id, body }: { id: string; body: CreateExit }) =>
  api.unauthorized.patch(`/exits/${id}`, {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
