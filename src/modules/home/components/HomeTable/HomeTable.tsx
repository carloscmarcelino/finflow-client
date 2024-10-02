import React from 'react';

import { Expense } from '@/api/home/types';
import { Table } from '@/components/Table';

import { expenseColumns } from './columns';

type HomeTableProps = {
  data: Expense[];
};

export const HomeTable = ({ data }: HomeTableProps) => (
  <Table columns={expenseColumns} data={data} />
);
