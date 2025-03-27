import { createColumnHelper } from '@tanstack/react-table';
import { Pencil } from 'lucide-react';

import { ExpensesCategory } from '@/api';

import { DeleteCategoryExpenseDialog } from './DeleteCategoryExpenseDialog';

const columnHelper = createColumnHelper<ExpensesCategory>();

export const categoriesExpensesColumns = [
  columnHelper.accessor((row) => row.name, {
    id: 'name',
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <p>Nome</p>,
  }),
  columnHelper.accessor((row) => row, {
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex gap-4">
        <Pencil className="w-4 h-4" />
        <DeleteCategoryExpenseDialog id={row.original.id} />
      </div>
    ),
    header: () => <p>Ações</p>,
  }),
];
