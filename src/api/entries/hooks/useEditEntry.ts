import { useMutation } from '@tanstack/react-query';

import { editEntry } from '../endpoints';
import { entriesQueryKey } from '../queryKey';

export const useEditEntry = () =>
  useMutation({
    mutationKey: [entriesQueryKey.edit],
    mutationFn: editEntry,
  });
