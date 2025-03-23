import { InvestmentType } from '../configurations';

export type Investment = {
  id: string;
  date: string;
  type: InvestmentType;
  value: string;
  yield: string;
  broker: string;
};

export type TotalInvestments = {
  total: number;
  totalInvestedThisMonth: number;
};
