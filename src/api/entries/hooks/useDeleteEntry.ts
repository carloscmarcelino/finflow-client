import { useMutation } from '@tanstack/react-query';

import { deleteEntry } from '../endpoints';

export const useDeleteEntry = () =>
  useMutation({
    mutationKey: ['delete-entry'],
    mutationFn: deleteEntry,
  });
