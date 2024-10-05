import { api } from '@/lib/FetchClient';

import { ApiResponse, ReadFn } from '../__common__/types';

import { CreateEntries, Entries } from './types';

export const createEntries = (body: CreateEntries) =>
  api.unauthorized.post('/entries', {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const getEntries: ReadFn<ApiResponse<Entries>> = ({ config } = {}) =>
  api.unauthorized.get('/entries', {
    ...config,
    next: {
      revalidate: 0,
      tags: ['entries'],
    },
  });
