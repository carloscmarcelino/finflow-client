import { useMutation } from '@tanstack/react-query';

import { editExit } from '../endpoints';

export const useEditExit = () =>
  useMutation({
    mutationKey: ['edit-exit'],
    mutationFn: editExit,
  });
