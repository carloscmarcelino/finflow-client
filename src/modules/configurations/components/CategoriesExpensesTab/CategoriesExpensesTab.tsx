'use client';

import React from 'react';

import { useGetExpensesCategories } from '@/api';
import { Table } from '@/components/Table';
import { TabsContent } from '@/components/ui';

import { categoriesExpensesColumns } from './columns';
import { CreateCategoryExpenseDialog } from './CreateCategoryExpenseDialog';

export const CategoriesExpensesTab = () => {
  const { data: expenses, isLoading: isLoadingExpenses } = useGetExpensesCategories();

  return (
    <TabsContent value="expenses">
      <div className="flex justify-end">
        <CreateCategoryExpenseDialog />
      </div>
      <Table
        columns={categoriesExpensesColumns}
        data={expenses?.data ?? []}
        isLoading={isLoadingExpenses}
      />
    </TabsContent>
  );
};
