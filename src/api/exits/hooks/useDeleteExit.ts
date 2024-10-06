import { useMutation } from '@tanstack/react-query';

import { deleteExit } from '../endpoints';

export const useDeleteExit = () =>
  useMutation({
    mutationKey: ['delete-expense'],
    mutationFn: deleteExit,
  });
