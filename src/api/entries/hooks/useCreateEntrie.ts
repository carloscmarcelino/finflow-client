import { useMutation } from '@tanstack/react-query';

import { createEntries } from '../endpoints';

export const useCreateEntries = () =>
  useMutation({
    mutationKey: ['create-entries'],
    mutationFn: createEntries,
  });
