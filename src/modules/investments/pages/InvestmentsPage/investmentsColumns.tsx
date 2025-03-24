import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';

import { Investment } from '@/api';
import { toBRL } from '@/utils';

import { DeleteInvestmentModal, EditInvestmentModal } from '../../components';

const columnHelper = createColumnHelper<Investment>();

export const investmentsColumns = [
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
  columnHelper.accessor((row) => row.yield, {
    id: 'yield',
    cell: (info) => <p>{info.getValue()}%</p>,
    header: () => <p>Rendimento</p>,
  }),
  columnHelper.accessor((row) => row.type.name, {
    id: 'type',
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <p>Tipo</p>,
  }),
  columnHelper.accessor((row) => row.bank.name, {
    id: 'bank',
    cell: (info) => <p className="truncate max-w-40">{info.getValue()}</p>,
    header: () => <p>Banco</p>,
  }),
  columnHelper.accessor((row) => row, {
    id: 'acoes',
    cell: ({ getValue }) => (
      <div className="flex gap-5">
        <EditInvestmentModal data={getValue()} />
        <DeleteInvestmentModal data={getValue()} />
      </div>
    ),
    header: () => <p>Ações</p>,
  }),
];
