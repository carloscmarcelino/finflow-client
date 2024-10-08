import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';

import { Investment } from '@/api/investments/types';
import { toBRL } from '@/utils/formatters/toBRL';

import { DeleteInvestmentModal } from '../DeleteInvestmentModal';
import { EditInvestmentModal } from '../EditInvestmentModal';

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
  columnHelper.accessor((row) => row.broker, {
    id: 'corretora',
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <p>Corretora</p>,
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
