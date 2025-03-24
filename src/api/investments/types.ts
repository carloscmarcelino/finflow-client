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

export type CreateInvestmentBody = {
  value: number;
  yield: number;
  bank: Bank;
  type: InvestmentType;
  date: string;
};

export type EditInvestmentBody = {
  value: number;
  yield: number;
  bank: Bank;
  type: InvestmentType;
  date: string;
};
