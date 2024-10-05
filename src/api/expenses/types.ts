export type Expense = {
  id: string;
  date: string;
  description: string;
  amount: string;
  paymentMethod: string;
};

export type CreateExpense = {
  description: string;
  amount: number;
  paymentMethod: string;
};
