'use client';

import React from 'react';

import { useGetPaymentMethods } from '@/api';
import { Table } from '@/components/Table';
import { TabsContent } from '@/components/ui';

import { paymentsColumns } from './columns';
import { CreatePaymentMethodDialog } from './CreatePaymentMethodDialog';

export const PaymentsTab = () => {
  const { data: paymentMethodsData, isPending: isLoadingPaymentMethods } = useGetPaymentMethods();

  return (
    <TabsContent value="payments">
      <div className="flex justify-end my-10 rounded-xl bg-white shadow-2xl px-14 py-7 ">
        <CreatePaymentMethodDialog />
      </div>
      <Table
        columns={paymentsColumns}
        data={paymentMethodsData?.data ?? []}
        isLoading={isLoadingPaymentMethods}
      />
    </TabsContent>
  );
};
