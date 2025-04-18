import { createColumnHelper } from '@tanstack/react-table';

import { User } from '@/api/auth/types';

import { DeleteUserModal } from '../../components';

const columnHelper = createColumnHelper<User>();

export const usersColumns = [
  columnHelper.accessor((row) => row.username, {
    id: 'username',
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <p>Nome</p>,
  }),
  columnHelper.accessor((row) => row, {
    id: 'acoes',
    cell: ({ getValue }) => (
      <div className="flex gap-5">
        <DeleteUserModal data={getValue()} />
      </div>
    ),
    header: () => <p>Ações</p>,
  }),
];
