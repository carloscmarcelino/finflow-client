import React from 'react';

import { Expense } from '@/api/expenses';
import { Table } from '@/components/Table';

import { expenseColumns } from './columns';

type ExpenseTableProps = {
  data: Expense[];
};

export const ExpenseTable = ({ data }: ExpenseTableProps) => (
  <Table columns={expenseColumns} data={data} />
);
