import api from '@/lib/api';
import { ApiResponse, SearchQueryParams } from '@/types';

import { Entry, TotalEntries } from './types';

export const createEntry = async (body: BodyInit) => {
  const response = await api.authorized().post('entries', {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};

export const getEntries = async (params: SearchQueryParams) => {
  const response = await api
    .authorized()
    .get<ApiResponse<Entry>>('entries', { searchParams: params });
  const data = await response.json();

  return data;
};

export const getTotalEntries = async (params: SearchQueryParams) => {
  const response = await api.authorized().get<TotalEntries>('entries/total', {
    searchParams: params,
  });
  const data = await response.json();

  return data;
};

export const deleteEntry = (id: string) => api.authorized().delete(`entries/${id}`);

export const editEntry = ({ id, body }: { id: string; body: BodyInit }) =>
  api.authorized().patch(`entries/${id}`, {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
