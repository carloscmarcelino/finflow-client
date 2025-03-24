'use client';

import React from 'react';

import { useGetBanks } from '@/api';
import { Table } from '@/components/Table';
import { TabsContent } from '@/components/ui';

import { bankColumns } from './bankColumns';
import { CreateBankDialog } from './CreateBankDialog';

export const BanksTab = () => {
  const { data: banksData, isPending: isLoadingBanks } = useGetBanks();

  return (
    <TabsContent value="banks">
      <div className="flex justify-end my-10 rounded-xl bg-white shadow-2xl px-14 py-7 ">
        <CreateBankDialog />
      </div>
      <Table columns={bankColumns} data={banksData?.data ?? []} isLoading={isLoadingBanks} />
    </TabsContent>
  );
};
