import { TypesOfInvestment } from '../__common__/types';

export type Investment = {
  id: string;
  date: string;
  type: TypesOfInvestment;
  value: number;
  yield: string;
  broker: string;
};

export type CreateInvestment = {
  type: TypesOfInvestment;
  value: number;
  yield: number;
  broker: string;
};
