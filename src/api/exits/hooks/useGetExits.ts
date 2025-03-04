import { useQuery } from '@tanstack/react-query';

import { getExits } from '../endpoints';

export type GetExitsParams = {
  startDate?: string;
  endDate?: string;
  limit: number;
  page: number;
  search?: string;
};

export const useGetExits = (params: GetExitsParams) =>
  useQuery({
    queryKey: ['get-exits', params],
    queryFn: () => {
      const skip = (params.page - 1) * params.limit;
      return getExits({ params: { ...params, skip, limit: params.limit } });
    },
  });
