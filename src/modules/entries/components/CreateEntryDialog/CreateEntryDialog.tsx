'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { balanceQueryKey, entriesQueryKey, useCreateEntry } from '@/api';
import { DialogDispatch, DialogDispatchVariant } from '@/components/DialogDispatch';
import { DatePicker, InputText } from '@/components/Form';
import { TOAST_ERROR_MESSAGE } from '@/config';
import { useDisclosure } from '@/hooks';
import { brlToNumber, Mask } from '@/utils';

import { createEntrySchema, CreateEntrySchemaType } from '../../validators';

export const CreateEntryDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<CreateEntrySchemaType>({
    resolver: zodResolver(createEntrySchema),
    defaultValues: {
      date: dayjs().toDate(),
    },
  });

  const { mutate, isPending } = useCreateEntry();

  const queryClient = useQueryClient();

  const onSubmit = (values: CreateEntrySchemaType) => {
    mutate(
      {
        ...values,
        value: brlToNumber(values.value),
        date: values.date.toISOString(),
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: [entriesQueryKey.get],
          });
          await queryClient.invalidateQueries({
            queryKey: [entriesQueryKey.getTotal],
          });
          await queryClient.invalidateQueries({
            queryKey: [balanceQueryKey.get],
          });
          toast.success('Entrada criada com sucesso');
          onClose();
          reset();
        },
        onError: () => {
          toast.error(TOAST_ERROR_MESSAGE);
        },
      },
    );
  };

  return (
    <DialogDispatch
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isPending}
      variant={DialogDispatchVariant.CREATE}
    >
      <DatePicker label="Data" name="date" control={control} error={errors.date?.message} />
      <InputText
        label="Valor"
        error={errors.value?.message}
        register={register('value')}
        mask={Mask.brl}
      />
      <InputText
        label="Descrição"
        error={errors.description?.message}
        register={register('description')}
      />
    </DialogDispatch>
  );
};
