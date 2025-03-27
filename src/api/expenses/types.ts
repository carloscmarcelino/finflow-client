import { ExpensesCategory } from '../categories';
import { PaymentMethod } from '../configurations';

export type Expense = {
  id: string;
  date: string;
  description: string;
  amount: string;
  paymentMethod?: PaymentMethod;
  expensesCategory?: ExpensesCategory;
};

export type TotalExpenses = {
  total: number;
};

export type CreateExpenseBody = {
  amount: number;
  date: string;
  description: string;
  paymentMethodId: string;
  categoryId: string;
};

export type EditExpenseBody = {
  amount: number;
  date: string;
  description: string;
  paymentMethodId: string;
  categoryId: string;
};
