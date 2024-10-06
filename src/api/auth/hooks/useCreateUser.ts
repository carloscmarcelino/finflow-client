import { useMutation } from '@tanstack/react-query';

import { createUser } from '../endpoints';

export const useCreateUser = () =>
  useMutation({
    mutationKey: ['create-user'],
    mutationFn: createUser,
  });
