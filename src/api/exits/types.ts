export type Exit = {
  id: string;
  date: string;
  description: string;
  amount: string;
  paymentMethod: {
    id: '6f050d31-839b-4bcb-a6f1-9d6b75c3d198';
    name: 'Cartão de crédito';
  };
};

export type CreateExit = {
  description: string;
  amount: number;
  paymentMethodId: string;
};
