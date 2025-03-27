import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import dayjs from 'dayjs';
import { Line } from 'react-chartjs-2';

import { Expense } from '@/api';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

type ExpensesPerformanceChartProps = Readonly<{
  expensesData?: Expense[];
}>;

export const ExpensesPerformanceChart = ({ expensesData }: ExpensesPerformanceChartProps) => {
  const data: ChartData<'line'> = {
    labels: expensesData?.map((expense) => dayjs(expense.date).format('DD/MM/YYYY')) ?? [],
    datasets: [
      {
        label: 'Gastos',
        data: expensesData?.map((expense) => Number(expense.amount)) ?? [],
        borderColor: '#6523e9',
        backgroundColor: '#6523e9',
        borderWidth: 7.5,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Gastos',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-[60rem]">
      <Line data={data} options={options} />
    </div>
  );
};
