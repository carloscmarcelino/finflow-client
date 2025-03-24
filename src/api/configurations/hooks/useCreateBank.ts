import { useMutation } from '@tanstack/react-query';

import { createBank } from '../endpoints';
import { bankQueryKey } from '../queryKey';

export const useCreateBank = () =>
  useMutation({
    mutationKey: [bankQueryKey.post],
    mutationFn: createBank,
  });
