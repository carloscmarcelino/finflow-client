import api from '@/lib/api';
import { ApiResponse, SearchQueryParams } from '@/types';

import { CreateEntryBody, EditEntryBody, Entry, TotalEntries } from './types';

export const createEntry = async (body: CreateEntryBody) => {
  const response = await api.authorized().post('entries', {
    body: JSON.stringify(body),
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

export const editEntry = ({ id, body }: { id: string; body: EditEntryBody }) =>
  api.authorized().patch(`entries/${id}`, {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
