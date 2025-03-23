import api from '@/lib/api';
import { ApiResponse } from '@/types';

import {
  Broker,
  CreateInvestmentTypeBody,
  CreatePaymentMethodBody,
  InvestmentType,
  PaymentMethod,
} from './types';

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

export const createPaymentMethod = async (body: CreatePaymentMethodBody) => {
  const response = await api.authorized().post<PaymentMethod>('payment-methods', {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

export const createInvestmentType = async (body: CreateInvestmentTypeBody) => {
  const response = await api.authorized().post<InvestmentType>('configurations/investments-type', {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

export const getInvestmentsTypes = async () => {
  const response = await api
    .authorized()
    .get<ApiResponse<InvestmentType>>('configurations/investments-type');
  const data = await response.json();
  return data;
};
