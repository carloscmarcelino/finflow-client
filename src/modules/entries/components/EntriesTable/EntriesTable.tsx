import React from 'react';

import { Entries } from '@/api/entries';
import { Table } from '@/components/Table';

import { entriesColumns } from './columns';

type EntriesTableProps = {
  data: Entries[];
};

export const EntriesTable = ({ data }: EntriesTableProps) => (
  <Table columns={entriesColumns} data={data} />
);
