import { useMutation } from '@tanstack/react-query';

import { createEntrie } from '../endpoints';

export const useCreateEntrie = () =>
  useMutation({
    mutationKey: ['create-entrie'],
    mutationFn: createEntrie,
  });
