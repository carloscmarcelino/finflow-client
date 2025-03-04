import { api } from '@/lib/FetchClient';

import { ApiResponse, Broker, ReadFn, TypesOfInvestment } from './types';

export const getPaymentMethods: ReadFn<ApiResponse<{ name: string; id: string }>> = ({
  config,
} = {}) =>
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

export const getTypesOfInvestments: ReadFn<ApiResponse<TypesOfInvestment>> = ({ config } = {}) =>
  api.authorized.get('/investments/types', {
    ...config,
    next: {
      tags: ['investments-types'],
    },
  });
