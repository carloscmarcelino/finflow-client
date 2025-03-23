import { ChartData, ChartOptions, Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { Investment } from '@/api';
import { getRandomColor } from '@/utils';

ChartJS.register(ArcElement, Tooltip, Legend);

type InvestmentPerformancePieProps = Readonly<{
  investmentsData?: Investment[];
}>;

export const InvestmentPerformancePie = ({ investmentsData }: InvestmentPerformancePieProps) => {
  const groupedInvestments = investmentsData?.reduce(
    (acc, investment) => {
      const type = investment.type.name;
      const value = parseFloat(investment.value);

      if (!acc[type]) {
        acc[type] = 0;
      }
      acc[type] += value;

      return acc;
    },
    {} as Record<string, number>,
  );

  const groupedInvestmentsArray = Object.entries(groupedInvestments || {}).map(
    ([name, totalValue]) => ({
      name,
      totalValue,
    }),
  );

  const data: ChartData<'pie'> = {
    labels: groupedInvestmentsArray.map((item) => item.name),
    datasets: [
      {
        label: 'Tipos',
        data: groupedInvestmentsArray.map((item) => item.totalValue),
        backgroundColor: groupedInvestmentsArray.map(() => getRandomColor()),
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {};

  return <Pie data={data} options={options} />;
};
