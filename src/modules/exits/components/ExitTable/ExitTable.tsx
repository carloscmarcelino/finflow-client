import React, { Dispatch, SetStateAction } from 'react';

import { Exit } from '@/api/exits';
import { Table } from '@/components/Table';

import { exitColumns } from './exitColumns';

type ExitTableProps = {
  data?: Exit[];
  isLoading: boolean;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  isFetching: boolean;
};

export const ExitTable = ({
  data,
  isLoading,
  currentPage,
  setCurrentPage,
  isFetching,
}: ExitTableProps) => (
  <Table
    columns={exitColumns}
    data={data ?? []}
    isLoading={isLoading}
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}
    isFetching={isFetching}
  />
);
