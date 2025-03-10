import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import React from 'react';

import { Entry } from '@/api';
import { toBRL } from '@/utils/mask';

import { DeleteEntryModal, EditEntryModal } from '../../components';

const columnHelper = createColumnHelper<Entry>();

export const entriesColumns = [
  columnHelper.accessor((row) => row.date, {
    id: 'date',
    cell: (info) => {
      const dateFormmated = dayjs(info.getValue()).format('DD/MM/YYYY');

      return <p>{dateFormmated}</p>;
    },
    header: () => <p>Data</p>,
  }),
  columnHelper.accessor((row) => row.value, {
    id: 'value',
    cell: (info) => <p>{toBRL(Number(info.getValue()))}</p>,
    header: () => <p>Valor</p>,
  }),
  columnHelper.accessor((row) => row.description, {
    id: 'description',
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <p>Descrição</p>,
  }),
  columnHelper.accessor((row) => row, {
    id: 'acoes',
    cell: ({ getValue }) => (
      <div className="flex gap-5">
        <EditEntryModal data={getValue()} />
        <DeleteEntryModal data={getValue()} />
      </div>
    ),
    header: () => <p>Ações</p>,
  }),
];
