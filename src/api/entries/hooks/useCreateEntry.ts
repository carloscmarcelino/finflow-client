import { useMutation } from '@tanstack/react-query';

import { createEntry } from '../endpoints';

export const useCreateEntry = () =>
  useMutation({
    mutationKey: ['create-entry'],
    mutationFn: createEntry,
  });
