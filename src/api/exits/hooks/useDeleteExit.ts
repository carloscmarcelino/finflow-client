import { useMutation } from '@tanstack/react-query';

import { deleteExit } from '../endpoints';
import { exitsQueryKey } from '../queryKey';

export const useDeleteExit = () =>
  useMutation({
    mutationKey: [exitsQueryKey.delete],
    mutationFn: deleteExit,
  });
