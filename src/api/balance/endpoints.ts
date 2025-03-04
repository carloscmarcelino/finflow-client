import { api } from '@/lib/FetchClient';

import { ReadManyFn } from '../__common__/types';
import { Tags } from '../types';

export const getBalance: ReadManyFn<{ total: number }> = ({ config }) =>
  api.authorized.get('/balance', {
    ...config,
    next: {
      revalidate: 0,
      tags: [Tags.BALANCE],
    },
  });
