import api from '@/lib/api';

import { balanceQueryKey } from './queryKey';
import { Balance, GetBalanceParams } from './types';

export const getBalance = async (params?: GetBalanceParams) => {
  const response = await api.authorized().get<Balance>('balance', {
    searchParams: params,
    next: { tags: [balanceQueryKey.get] },
  });
  return response.json();
};
