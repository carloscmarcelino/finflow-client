import { ExpensesCategory } from '../categories';
import { PaymentMethod } from '../configurations';

export type Expense = {
  id: string;
  date: string;
  description: string;
  amount: string;
  paymentMethod: PaymentMethod;
  expensesCategory: ExpensesCategory;
};

export type TotalExpenses = {
  total: number;
};
