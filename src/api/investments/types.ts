export type Investment = {
  id: string;
  date: string;
  type: string;
  value: number;
  yield: string;
  broker: string;
};

export type CreateInvestment = {
  type: string;
  value: number;
  yield: number;
  broker: string;
};
