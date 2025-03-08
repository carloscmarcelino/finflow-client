import api from '@/lib/api';

import { GetExitsParams } from '../entries';

import { Exit, GetTotalExitsParams, TotalExits } from './types';

export const getExits = async (params: GetExitsParams) => {
  const response = await api.authorized().get<Exit[]>('/exits', { searchParams: params });
  return response.json();
};

export const getTotalExits = async (params: GetTotalExitsParams) => {
  const response = await api.authorized().get<TotalExits>('/exits/total', {
    searchParams: params,
  });
  return response.json();
};

export const deleteExit = (id: string) => api.authorized().delete(`/exits/${id}`);

export const createExit = (body: BodyInit) =>
  api.authorized().post('/exits', {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const editExit = ({ id, body }: { id: string; body: BodyInit }) =>
  api.authorized().patch(`/exits/${id}`, {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
