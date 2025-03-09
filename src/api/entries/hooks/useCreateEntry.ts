import { useMutation } from '@tanstack/react-query';

import { createEntry } from '../endpoints';
import { entriesQueryKey } from '../queryKey';

export const useCreateEntry = () =>
  useMutation({
    mutationKey: [entriesQueryKey.create],
    mutationFn: createEntry,
  });
