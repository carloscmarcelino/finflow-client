import React from 'react';

import { Entrie } from '@/api/entries';
import { Table } from '@/components/Table';

import { entriesColumns } from './columns';

type EntriesTableProps = {
  data: Entrie[];
};

export const EntriesTable = ({ data }: EntriesTableProps) => (
  <Table columns={entriesColumns} data={data} />
);
