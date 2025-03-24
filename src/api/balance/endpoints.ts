import api from '@/lib/api';
import { SearchQueryParams } from '@/types';

import { balanceQueryKey } from './queryKey';
import { Balance } from './types';

export const getBalance = async (params?: SearchQueryParams) => {
  const response = await api.authorized().get<Balance>('balance', {
    searchParams: params,
    next: { tags: [balanceQueryKey.get] },
  });
  return response.json();
};
