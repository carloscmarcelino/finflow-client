import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';

import { Expense } from '@/api';
import { toBRL } from '@/utils';

import { EditExpenseModal, DeleteExpenseModal } from '../../components';

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
    cell: (info) => <p>{toBRL(Number(info.getValue()))}</p>,
    header: () => <p>Valor</p>,
  }),
  columnHelper.accessor((row) => row.description, {
    id: 'description',
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <p>Descrição</p>,
  }),
  columnHelper.accessor((row) => row?.expensesCategory?.name ?? '', {
    id: 'expensesCategory',
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <p>Categoria da despesa</p>,
  }),
  columnHelper.accessor((row) => row?.paymentMethod?.name ?? '', {
    id: 'paymentMethod',
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <p>Pagamento</p>,
  }),
  columnHelper.accessor((row) => row, {
    id: 'acoes',
    cell: ({ getValue }) => (
      <div className="flex gap-5" key={getValue().id}>
        <EditExpenseModal data={getValue()} />
        <DeleteExpenseModal data={getValue()} />
      </div>
    ),
    header: () => <p>Ações</p>,
  }),
];
