import { useQuery } from '@tanstack/react-query';

import { GetExitsParams } from '@/api/entries';

import { getExits } from '../endpoints';

export const useGetExits = (params: GetExitsParams) =>
  useQuery({
    queryKey: ['get-exits', params],
    queryFn: () => {
      const skip = (params.page - 1) * params.limit;
      const queryParams = { ...params, skip, limit: params.limit };
      return getExits(queryParams);
    },
  });
