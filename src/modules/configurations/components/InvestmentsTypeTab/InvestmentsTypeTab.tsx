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
      <div className="flex justify-end my-10 rounded-xl bg-white shadow-2xl px-14 py-7 ">
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
