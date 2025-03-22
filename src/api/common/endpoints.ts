import api from '@/lib/api';
import { ApiResponse } from '@/types';

import { Broker, CreatePaymentMethodBody, PaymentMethod, TypesOfInvestment } from './types';

export const getPaymentMethods = async () => {
  const response = await api.authorized().get<ApiResponse<PaymentMethod>>('payment-methods');
  const data = await response.json();

  return data;
};

export const getBrokers = async () => {
  const response = await api.authorized().get<ApiResponse<Broker>>('broker');
  const data = await response.json();

  return data;
};

export const getTypesOfInvestments = async () => {
  const response = await api.authorized().get<ApiResponse<TypesOfInvestment>>('investments/types');
  const data = await response.json();

  return data;
};

export const createPaymentMethod = async (body: CreatePaymentMethodBody) => {
  const response = await api.authorized().post<ApiResponse<PaymentMethod>>('payment-methods', {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};
