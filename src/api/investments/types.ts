import { Bank, InvestmentType } from '../configurations';

export type Investment = {
  id: string;
  date: string;
  type: InvestmentType;
  value: string;
  yield: string;
  bank: Bank;
};

export type TotalInvestments = {
  total: number;
  totalInvestedThisMonth: number;
};
