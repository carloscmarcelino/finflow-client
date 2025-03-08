import api from '@/lib/api';

import { Balance, GetBalanceParams } from './types';

export const getBalance = async (params?: GetBalanceParams) => {
  // const response = await api.authorized().get<Balance>('/balance', { searchParams: params });

  const response = await api.authorized().get<Balance>('balance');

  return response.json();
};
