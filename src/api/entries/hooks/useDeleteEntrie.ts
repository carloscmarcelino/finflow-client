import { useMutation } from '@tanstack/react-query';

import { deleteEntrie } from '../endpoints';

export const useDeleteEntrie = () =>
  useMutation({
    mutationKey: ['delete-entrie'],
    mutationFn: deleteEntrie,
  });
