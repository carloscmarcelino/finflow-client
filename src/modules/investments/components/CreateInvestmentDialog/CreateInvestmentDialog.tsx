'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  useCreateInvestment,
  investmentsQueryKey,
  useGetInvestmentsType,
  useGetBanks,
} from '@/api';
import { DialogDispatch, DialogDispatchVariant } from '@/components/DialogDispatch';
import { CustomSelect, DatePicker, InputText } from '@/components/Form';
import { TOAST_ERROR_MESSAGE } from '@/config';
import { useDisclosure } from '@/hooks';
import { brlToNumber, Mask } from '@/utils/mask';

import { createInvestmentSchema, CreateInvestmentType } from '../../validators';

export const CreateInvestmentDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<CreateInvestmentType>({
    resolver: zodResolver(createInvestmentSchema),
    defaultValues: {
      date: dayjs().toDate(),
    },
  });

  const { data: typesData, isLoading: isLoadingTypes } = useGetInvestmentsType();

  const typeOptions = typesData?.data?.map((type) => ({ label: type.name, value: type.id }));

  const { data: bankData, isLoading } = useGetBanks();

  const bankOptions = bankData?.data?.map((bank) => ({
    label: bank.name,
    value: bank.id,
  }));

  const { mutate, isPending } = useCreateInvestment();

  const queryClient = useQueryClient();

  const onSubmit = (values: CreateInvestmentType) => {
    mutate(
      {
        value: brlToNumber(values.value),
        yield: Number(values.yield.replace('%', '')),
        bank: {
          id: values.bank.value,
          name: values.bank.label,
        },
        type: {
          id: values.type.value,
          name: values.type.label,
        },
        date: values.date.toISOString(),
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: [investmentsQueryKey.get],
          });
          await queryClient.invalidateQueries({
            queryKey: [investmentsQueryKey.getTotal],
          });
          toast.success('Investimento criado com sucesso');
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
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isPending}
      variant={DialogDispatchVariant.CREATE}
    >
      <DatePicker label="Data" name="date" control={control} error={errors.date?.message} />
      <CustomSelect
        label="Tipo"
        name="type"
        options={typeOptions}
        isLoading={isLoadingTypes}
        control={control}
        error={errors.type?.message}
      />
      <InputText
        label="Valor"
        error={errors.value?.message}
        register={register('value')}
        mask={Mask.brl}
      />
      <InputText
        label="Rendimento"
        error={errors.yield?.message}
        register={register('yield')}
        mask={Mask.yield}
      />
      <CustomSelect
        label="Banco"
        name="bank"
        options={bankOptions}
        isLoading={isLoading}
        control={control}
        error={errors.bank?.message}
      />
    </DialogDispatch>
  );
};
