import { ApiResponse, ReadFn } from '@/api/__common__/types';
import { api } from '@/lib/FetchClient';

import { Tags } from '../types';

import { CreateExit, Exit } from './types';

export const getExits: ReadFn<ApiResponse<Exit>> = ({ config } = {}) =>
  api.authorized.get('/exits', {
    ...config,
    next: {
      revalidate: 0,
      tags: [Tags.EXITS],
    },
  });

export const deleteExit = (id: string) => api.authorized.delete(`/exits/${id}`);

export const createExit = (body: CreateExit) =>
  api.authorized.post('/exits', {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const editExit = ({ id, body }: { id: string; body: CreateExit }) =>
  api.authorized.patch(`/exits/${id}`, {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
