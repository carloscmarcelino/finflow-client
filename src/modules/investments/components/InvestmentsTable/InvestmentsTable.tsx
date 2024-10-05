import React from 'react';

import { Investment } from '@/api/investments/types';
import { Table } from '@/components/Table';

import { investmentsColumns } from './investmentsColumns';

type InvestmentsTableProps = {
  data: Investment[];
};

export const InvestmentsTable = ({ data }: InvestmentsTableProps) => (
  <Table columns={investmentsColumns} data={data} />
);
