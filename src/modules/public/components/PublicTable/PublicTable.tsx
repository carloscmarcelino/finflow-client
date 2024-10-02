import React from 'react';

import { Expense } from '@/api/public/types';
import { Table } from '@/components/Table';

import { expenseColumns } from './columns';

type PublicTableProps = {
  data: Expense[];
};

export const PublicTable = ({ data }: PublicTableProps) => (
  <Table columns={expenseColumns} data={data} />
);
