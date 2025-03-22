import React from 'react';

import { DialogDispatch, DialogDispatchVariant } from '@/components/DialogDispatch';
import { InputText } from '@/components/Form';
import { useForm } from 'react-hook-form';
import { useDisclosure } from '@/hooks';
import { z } from 'zod';
import { INVALID_FORMAT, TOAST_ERROR_MESSAGE } from '@/config';
import { paymentMethodQueryKey, useCreatePaymentMethod } from '@/api';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  type: z.string().trim().min(1, INVALID_FORMAT),
});

export type CreatePaymentMethodType = z.infer<typeof schema>;

export const CreatePaymentMethodDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreatePaymentMethodType>({
    defaultValues: {
      type: '',
    },
    resolver: zodResolver(schema),
  });

  const { mutateAsync: createPaymentMethod, isPending } = useCreatePaymentMethod();

  const queryClient = useQueryClient();

  const onSubmit = (data: CreatePaymentMethodType) => {
    createPaymentMethod(
      {
        name: data.type,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: [paymentMethodQueryKey.get],
          });
          toast.success('Método de pagamento criado com sucesso');
          reset();
          onClose();
        },
        onError: () => {
          toast.error(TOAST_ERROR_MESSAGE);
        },
      },
    );
  };

  return (
    <DialogDispatch
      variant={DialogDispatchVariant.CREATE}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isPending}
    >
      <InputText label="Tipo" register={register('type')} error={errors.type?.message}></InputText>
    </DialogDispatch>
  );
};
