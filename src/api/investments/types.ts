import { TypesOfInvestment } from '../common';

export type Investment = {
  id: string;
  date: string;
  type: TypesOfInvestment;
  value: number;
  yield: string;
  broker: string;
};

export type TotalInvestments = {
  total: number;
  totalInvestedThisMonth: number;
};
