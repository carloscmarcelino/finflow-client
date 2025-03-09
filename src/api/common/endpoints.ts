import api from '@/lib/api';

import { Broker, PaymentMethod, TypesOfInvestment } from './types';

export const getPaymentMethods = async () => {
  const response = await api.authorized().get<PaymentMethod[]>('payment-methods');
  const data = await response.json();

  return data;
};

export const getBrokers = async () => {
  const response = await api.authorized().get<Broker[]>('broker');
  const data = await response.json();

  return data;
};

export const getTypesOfInvestments = async () => {
  const response = await api.authorized().get<TypesOfInvestment[]>('investments/types');
  const data = await response.json();

  return data;
};
