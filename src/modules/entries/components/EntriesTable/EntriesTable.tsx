import React from 'react';

import { Entrie } from '@/api/entries';
import { Table } from '@/components/Table';

import { entriesColumns } from './columns';

type EntriesTableProps = {
  data?: Entrie[];
  isLoading: boolean;
};

export const EntriesTable = ({ data, isLoading }: EntriesTableProps) => (
  <Table columns={entriesColumns} data={data ?? []} isLoading={isLoading} />
);
