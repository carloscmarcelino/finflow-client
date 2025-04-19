import { useQuery } from '@tanstack/react-query';

import { getUsers } from '../endpoints';
import { usersQueryKey } from '../queryKey';

export const useGetUsers = () =>
  useQuery({
    queryKey: [usersQueryKey.get],
    queryFn: getUsers,
  });
