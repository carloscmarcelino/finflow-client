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

import { Investment } from '@/api';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

type InvestmentPerformanceChartProps = Readonly<{
  investmentsData?: Investment[];
}>;

export const InvestmentPerformanceChart = ({
  investmentsData,
}: InvestmentPerformanceChartProps) => {
  const data: ChartData<'line'> = {
    labels: investmentsData?.map((investment) => dayjs(investment.date).format('DD/MM/YYYY')) ?? [],
    datasets: [
      {
        label: 'Investimentos',
        data: investmentsData?.map((investment) => Number(investment.value)) ?? [],
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
        text: 'Performance',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};
