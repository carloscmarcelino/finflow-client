import { PaymentMethod } from '../common';

export type Expense = {
  id: string;
  date: string;
  description: string;
  amount: string;
  paymentMethod: PaymentMethod;
};

export type TotalExpenses = {
  total: number;
};
