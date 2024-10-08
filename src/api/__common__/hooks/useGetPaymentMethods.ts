import { useQuery } from '@tanstack/react-query';

import { getPaymentMethods } from '../endpoints';

export const useGetPaymentMethods = () =>
  useQuery({
    queryKey: ['get-payment-methods'],
    queryFn: () => getPaymentMethods(),
  });
