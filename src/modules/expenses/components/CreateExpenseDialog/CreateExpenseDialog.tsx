'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  balanceQueryKey,
  expensesQueryKey,
  useCreateExpense,
  useGetExpensesCategories,
  useGetPaymentMethods,
} from '@/api';
import { DialogDispatch, DialogDispatchVariant } from '@/components/DialogDispatch';
import { CustomSelect, DatePicker, InputText } from '@/components/Form';
import { TOAST_ERROR_MESSAGE } from '@/config';
import { useDisclosure } from '@/hooks';
import { brlToNumber, Mask } from '@/utils';

import { createExpenseSchema, CreateExpenseType } from '../../validators';

export const CreateExpenseDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<CreateExpenseType>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      date: dayjs().toDate(),
    },
  });

  const { data: paymentMethodsData, isPending: isLoadingPaymentMethods } = useGetPaymentMethods();

  const { data: categoriesData, isPending: isLoadingCategories } = useGetExpensesCategories();

  const categoriesOptions = categoriesData?.data.map((item) => ({
    label: item.name,
    value: item,
  }));

  const paymentMethodsOptions = paymentMethodsData?.data.map((item) => ({
    label: item.name,
    value: item,
  }));

  const { mutate, isPending } = useCreateExpense();

  const queryClient = useQueryClient();

  const onSubmit = (values: CreateExpenseType) => {
    mutate(
      {
        amount: brlToNumber(values.amount),
        paymentMethodId: values.paymentMethod.value.id,
        description: values.description,
        date: values.date.toISOString(),
        categoryId: values.expenseCategory.value.id,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: [expensesQueryKey.get],
          });
          await queryClient.invalidateQueries({
            queryKey: [expensesQueryKey.getTotal],
          });
          await queryClient.invalidateQueries({
            queryKey: [balanceQueryKey.get],
          });
          toast.success('Despesa criada com sucesso');
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
      <InputText
        label="Valor"
        error={errors.amount?.message}
        register={register('amount')}
        mask={Mask.brl}
      />
      <InputText
        label="Descrição"
        error={errors.description?.message}
        register={register('description')}
      />
      <CustomSelect
        label="Categoria da despesa"
        name="expenseCategory"
        options={categoriesOptions}
        isLoading={isLoadingCategories}
        control={control}
        error={errors.expenseCategory?.message}
      />
      <CustomSelect
        label="Metodo de pagamento"
        name="paymentMethod"
        options={paymentMethodsOptions}
        isLoading={isLoadingPaymentMethods}
        control={control}
        error={errors.paymentMethod?.message}
      />
    </DialogDispatch>
  );
};
