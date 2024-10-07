import { api } from '@/lib/FetchClient';

import { ApiResponse, ReadFn } from '../__common__/types';
import { Tags } from '../types';

import { CreateEntrie, Entrie } from './types';

export const createEntrie = (body: CreateEntrie) =>
  api.authorized.post('/entries', {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const getEntries: ReadFn<ApiResponse<Entrie>> = ({ config } = {}) =>
  api.authorized.get('/entries', {
    ...config,
    next: {
      revalidate: 0,
      tags: [Tags.ENTRIES],
    },
  });

export const deleteEntrie = (id: string) => api.authorized.delete(`/entries/${id}`);

export const editEntrie = ({ id, body }: { id: string; body: CreateEntrie }) =>
  api.authorized.patch(`/entries/${id}`, {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
