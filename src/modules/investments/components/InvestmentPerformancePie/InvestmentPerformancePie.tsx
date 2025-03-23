import { ChartData, ChartOptions } from 'chart.js';
import { PieChart } from 'lucide-react';
import React from 'react';

import { Investment } from '@/api';

type InvestmentPerformancePieProps = Readonly<{
  investmentsData?: Investment[];
}>;

export const InvestmentPerformancePie = ({ investmentsData }: InvestmentPerformancePieProps) => {
  const data: ChartData<'pie'> = {};

  const options: ChartOptions<'pie'> = {};

  return <PieChart data={data} options={options} />;
};
