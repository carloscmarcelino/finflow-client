'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { Pencil, Trash } from 'lucide-react';
import React from 'react';

import { ExpensesCategory, useGetExpensesCategories } from '@/api';
import { Table } from '@/components/Table';
import { TabsContent } from '@/components/ui/tabs';

import { CreateExpenseDialog } from './CreateExpenseDialog';

const columnHelper = createColumnHelper<ExpensesCategory>();

const expenseColumns = [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <p>Tipo</p>,
  }),
  columnHelper.accessor((row) => row, {
    id: 'actions',
    cell: () => (
      <div className="flex gap-4">
        <Pencil className="w-4 h-4" />
        <Trash className="w-4 h-4" />
      </div>
    ),
    header: () => <p>Ações</p>,
  }),
];

export const ExpensesTab = () => {
  const { data: expenses, isLoading: isLoadingExpenses } = useGetExpensesCategories();

  return (
    <TabsContent value="expenses">
      <div className="flex justify-end">
        <CreateExpenseDialog />
      </div>
      <Table columns={expenseColumns} data={expenses?.data ?? []} isLoading={isLoadingExpenses} />
    </TabsContent>
  );
};
