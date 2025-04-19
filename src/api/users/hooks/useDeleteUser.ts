import { useMutation } from '@tanstack/react-query';

import { deleteUser } from '../endpoints';
import { usersQueryKey } from '../queryKey';

export const useDeleteUser = () =>
  useMutation({
    mutationKey: [usersQueryKey.delete],
    mutationFn: deleteUser,
  });
