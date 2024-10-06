export type Exit = {
  id: string;
  date: string;
  description: string;
  amount: string;
  paymentMethod: string;
};

export type CreateExit = {
  description: string;
  amount: number;
  paymentMethod: string;
};
