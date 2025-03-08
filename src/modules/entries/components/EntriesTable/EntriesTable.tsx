import React, { Dispatch, SetStateAction } from 'react';

import { Entry } from '@/api';
import { Table } from '@/components/Table';

import { entriesColumns } from './columns';

type EntriesTableProps = {
  data?: Entry[];
  isLoading: boolean;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  isFetching: boolean;
};

export const EntriesTable = ({
  data,
  isLoading,
  currentPage,
  setCurrentPage,
  isFetching,
}: EntriesTableProps) => (
  <>
    <Table
      columns={entriesColumns}
      data={data ?? []}
      isLoading={isLoading}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      isFetching={isFetching}
    />
  </>
);
