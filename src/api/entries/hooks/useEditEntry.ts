import { useMutation } from '@tanstack/react-query';

import { editEntry } from '../endpoints';

export const useEditEntry = () =>
  useMutation({
    mutationKey: ['delete-entry'],
    mutationFn: editEntry,
  });
