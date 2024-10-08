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

export type CreateExit = {
  description: string;
  amount: number;
  paymentMethodId: string;
  date: string;
};
