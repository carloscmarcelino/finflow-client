export type Investment = {
  id: string;
  date: string;
  type: string;
  value: number;
  yield: string;
  bank: string;
};

export type CreateInvestment = {
  type: string;
  value: number;
  yield: number;
  bank: string;
};
