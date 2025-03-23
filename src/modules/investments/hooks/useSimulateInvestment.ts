import { brlToNumber, toBRL } from '@/utils';

import { SimulateInvestmentType } from '../validators';

export const useSimulateInvestment = () => {
  const handleCalculate = (values: SimulateInvestmentType) => {
    const initialValueFormattedToNumber = brlToNumber(values.initialValue);
    const monthlyValueFormattedToNumber = brlToNumber(values.monthlyValue);
    const annualInterestRateFormattedToMonthly = Number(
      (Number(values.interestRate.replace('%', '')) / 100).toFixed(4),
    );
    const periodFormattedToMonthly = Number(values.period);

    const monthlyInterestRate = annualInterestRateFormattedToMonthly / 12;
    const totalMonths = periodFormattedToMonthly * 12;

    const totalInvested =
      initialValueFormattedToNumber + monthlyValueFormattedToNumber * totalMonths;

    const totalValue =
      initialValueFormattedToNumber * Math.pow(1 + monthlyInterestRate, totalMonths) +
      monthlyValueFormattedToNumber *
        ((Math.pow(1 + monthlyInterestRate, totalMonths) - 1) / monthlyInterestRate);

    const totalInterest = totalValue - totalInvested;

    return {
      totalValue: toBRL(totalValue),
      totalInvested: toBRL(totalInvested),
      totalInterest: toBRL(totalInterest),
    };
  };

  return { handleCalculate };
};
