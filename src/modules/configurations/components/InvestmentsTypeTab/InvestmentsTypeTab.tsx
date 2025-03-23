'use client';

import React from 'react';

import { Table } from '@/components/Table';
import { TabsContent } from '@/components/ui';

import { investmentsTypeColumns } from './investmentsTypeColumns';
import { CreateInvestmentTypeDialog } from './CreateInvestmentTypeDialog';
import { useGetInvestmentsType } from '@/api';

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
