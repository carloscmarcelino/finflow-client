import { useMutation } from '@tanstack/react-query';

import { createExit } from '../endpoints';

export const useCreateExit = () =>
  useMutation({
    mutationKey: ['create-exit'],
    mutationFn: createExit,
  });
