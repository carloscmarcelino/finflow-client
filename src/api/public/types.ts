export type StackResponse = Array<{
  id: string;
  name: string;
  developers: number;
}>;

export type StackBody = {
  name: string;
  developers: number;
};

export type Expense = {
  id: string;
  date: string;
  description: string;
  amount: string;
  paymentMethod: string;
};
