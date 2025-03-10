import { useMutation } from '@tanstack/react-query';

import { editExit } from '../endpoints';
import { exitsQueryKey } from '../queryKey';

export const useEditExit = () =>
  useMutation({
    mutationKey: [exitsQueryKey.edit],
    mutationFn: editExit,
  });
