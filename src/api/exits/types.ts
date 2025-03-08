import { DateRangeParams } from '@/types';

export type Exit = {
  id: string;
  date: string;
  description: string;
  amount: string;
  paymentMethod: {
    id: string;
    name: string;
  };
};

export type TotalExits = {
  total: number;
};

export type GetTotalExitsParams = DateRangeParams;
