import React from 'react';

import { Exit } from '@/api/exits';
import { Table } from '@/components/Table';

import { exitColumns } from './exitColumns';

type ExitTableProps = {
  data: Exit[];
};

export const ExitTable = ({ data }: ExitTableProps) => <Table columns={exitColumns} data={data} />;
