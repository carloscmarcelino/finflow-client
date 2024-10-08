import { api } from '@/lib/FetchClient';

import { ApiResponse, Broker, ReadFn } from './types';

export const getPaymentMethods: ReadFn<ApiResponse<{ name: string }>> = ({ config } = {}) =>
  api.authorized.get('/payment-methods', {
    ...config,
    next: {
      revalidate: 0,
      tags: ['payment-methods'],
    },
  });

export const getBrokers: ReadFn<ApiResponse<Broker>> = ({ config } = {}) =>
  api.authorized.get('/broker', {
    ...config,
    next: {
      tags: ['broker'],
    },
  });
