import { ChartData, ChartOptions, Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { Expense } from '@/api';
import { getRandomColor } from '@/utils';

ChartJS.register(ArcElement, Tooltip, Legend);

type ExpensesPerformancePieProps = Readonly<{
  expensesData?: Expense[];
}>;

export const ExpensesPerformancePie = ({ expensesData }: ExpensesPerformancePieProps) => {
  const groupedExpenses = expensesData?.reduce(
    (acc, expense) => {
      const type = expense.expensesCategory?.name ?? expense.paymentMethod?.name ?? '';
      const value = parseFloat(expense.amount);

      if (!acc[type]) {
        acc[type] = 0;
      }
      acc[type] += value;

      return acc;
    },
    {} as Record<string, number>,
  );

  const groupedExpensesArray = Object.entries(groupedExpenses || {}).map(([name, totalValue]) => ({
    name,
    totalValue,
  }));

  const data: ChartData<'pie'> = {
    labels: groupedExpensesArray.map((item) => item.name),
    datasets: [
      {
        data: groupedExpensesArray.map((item) => item.totalValue),
        backgroundColor: groupedExpensesArray.map(() => getRandomColor()),
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'pie'> = { responsive: true };

  return (
    <div className="w-[40rem]">
      <Pie data={data} options={options} />
    </div>
  );
};
