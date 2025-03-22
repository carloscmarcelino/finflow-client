import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { createPaymentMethod } from '../endpoints';
import { paymentMethodQueryKey } from '../queryKey';

export const useCreatePaymentMethod = () =>
  useMutation({
    mutationKey: [paymentMethodQueryKey.post],
    mutationFn: createPaymentMethod,
  });
