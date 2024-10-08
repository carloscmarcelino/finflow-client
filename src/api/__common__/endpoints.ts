import { api } from '@/lib/FetchClient';

import { ApiResponse, ReadFn } from './types';

export const getPaymentMethods: ReadFn<ApiResponse<{ name: string }>> = ({ config } = {}) =>
  api.authorized.get('/payment-methods', {
    ...config,
    next: {
      revalidate: 0,
      tags: ['payment-methods'],
    },
  });
