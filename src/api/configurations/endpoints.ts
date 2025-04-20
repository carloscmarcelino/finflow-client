import api from '@/lib/api';
import { ApiResponse } from '@/types';

import {
  Bank,
  CreateBankBody,
  CreateInvestmentTypeBody,
  CreatePaymentMethodBody,
  InvestmentType,
  PaymentMethod,
} from './types';

export const getPaymentMethods = async () => {
  const response = await api
    .authorized()
    .get<ApiResponse<PaymentMethod>>('configurations/payment-methods');
  const data = await response.json();

  return data;
};

export const createPaymentMethod = async (body: CreatePaymentMethodBody) => {
  const response = await api.authorized().post<PaymentMethod>('configurations/payment-methods', {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

export const createInvestmentType = async (body: CreateInvestmentTypeBody) => {
  const response = await api.authorized().post<InvestmentType>('configurations/investments-types', {
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
    .get<ApiResponse<InvestmentType>>('configurations/investments-types');
  const data = await response.json();
  return data;
};

export const getBanks = async () => {
  const response = await api.authorized().get<ApiResponse<Bank>>('configurations/banks');
  const data = await response.json();
  return data;
};

export const createBank = async (body: CreateBankBody) => {
  const response = await api.authorized().post<Bank>('configurations/banks', {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};
