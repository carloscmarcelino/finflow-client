import { useMutation } from '@tanstack/react-query';

import { deleteEntry } from '../endpoints';
import { entriesQueryKey } from '../queryKey';

export const useDeleteEntry = () =>
  useMutation({
    mutationKey: [entriesQueryKey.delete],
    mutationFn: deleteEntry,
  });
