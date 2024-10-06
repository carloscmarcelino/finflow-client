import { useMutation } from '@tanstack/react-query';

import { editEntrie } from '../endpoints';

export const useEditEntrie = () =>
  useMutation({
    mutationKey: ['delete-entrie'],
    mutationFn: editEntrie,
  });
