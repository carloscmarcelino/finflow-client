import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';

import { Expense } from '@/api/public/types';

import { DeleteExpense } from '../DeleteExpense';

const columnHelper = createColumnHelper<Expense>();

export const expenseColumns = [
  columnHelper.accessor((row) => row.date, {
    id: 'date',
    cell: (info) => {
      const dateFormmated = dayjs(info.getValue()).format('DD/MM/YYYY');

      return <p>{dateFormmated}</p>;
    },
    header: () => <p>Data</p>,
  }),
  columnHelper.accessor((row) => row.amount, {
    id: 'amount',
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <p>Valor</p>,
  }),
  columnHelper.accessor((row) => row.description, {
    id: 'description',
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <p>Descrição</p>,
  }),
  columnHelper.accessor((row) => row, {
    id: 'acoes',
    cell: ({ getValue }) => <DeleteExpense data={getValue()} />,
    header: () => <p>Deletar</p>,
  }),
];
