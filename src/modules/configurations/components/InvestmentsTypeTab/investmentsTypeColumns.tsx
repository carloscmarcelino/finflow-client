import { createColumnHelper } from '@tanstack/react-table';
import { Pencil, Trash } from 'lucide-react';

import { InvestmentType } from '@/api';

const columnHelper = createColumnHelper<InvestmentType>();

export const investmentsTypeColumns = [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <p>Tipo</p>,
  }),
  columnHelper.accessor((row) => row, {
    id: 'actions',
    cell: () => (
      <div className="flex gap-4">
        <Pencil className="w-4 h-4" />
        <Trash className="w-4 h-4" />
      </div>
    ),
    header: () => <p>Ações</p>,
  }),
];
