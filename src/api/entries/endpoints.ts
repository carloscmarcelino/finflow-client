import { api } from '@/lib/FetchClient';

import { ApiResponse, ReadFn } from '../__common__/types';
import { Tags } from '../types';

import { CreateEntrie, Entrie } from './types';

export const createEntrie = (body: CreateEntrie) =>
  api.unauthorized.post('/entries', {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const getEntries: ReadFn<ApiResponse<Entrie>> = ({ config } = {}) =>
  api.unauthorized.get('/entries', {
    ...config,
    next: {
      revalidate: 0,
      tags: [Tags.ENTRIES],
    },
  });

export const deleteEntrie = (id: string) => api.unauthorized.delete(`/entries/${id}`);

export const editEntrie = ({ id, body }: { id: string; body: CreateEntrie }) =>
  api.unauthorized.patch(`/entries/${id}`, {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
