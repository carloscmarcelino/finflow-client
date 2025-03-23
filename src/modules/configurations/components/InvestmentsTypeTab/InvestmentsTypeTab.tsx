'use client';

import React from 'react';

import { useGetInvestmentsType } from '@/api';
import { Table } from '@/components/Table';
import { TabsContent } from '@/components/ui';

import { CreateInvestmentTypeDialog } from './CreateInvestmentTypeDialog';
import { investmentsTypeColumns } from './investmentsTypeColumns';

export const InvestmentsTypeTab = () => {
  const { data: investmentsData, isPending: isLoadingInvestments } = useGetInvestmentsType();

  return (
    <TabsContent value="investmentsTypes">
      <div className="flex justify-end">
        <CreateInvestmentTypeDialog />
      </div>
      <Table
        columns={investmentsTypeColumns}
        data={investmentsData?.data ?? []}
        isLoading={isLoadingInvestments}
      />
    </TabsContent>
  );
};
