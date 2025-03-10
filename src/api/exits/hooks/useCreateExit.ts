import { useMutation } from '@tanstack/react-query';

import { createExit } from '../endpoints';
import { exitsQueryKey } from '../queryKey';

export const useCreateExit = () =>
  useMutation({
    mutationKey: [exitsQueryKey.create],
    mutationFn: createExit,
  });
