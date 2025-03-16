'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  revalidateBalanceTag,
  useGetPaymentMethods,
  expensesQueryKey,
  useCreateExpense,
  useGetExpensesCategories,
} from '@/api';
import { CustomSelect } from '@/components/CustomSelect';
import { DatePicker } from '@/components/DatePicker';
import { InputText } from '@/components/InputText';
import { Button } from '@/components/ui/button';
import { brlToNumber, Mask } from '@/utils/mask';

import { createExpenseSchema, CreateExpenseType } from '../../validators';

export const CreateExpensePage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
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

  const router = useRouter();

  const queryClient = useQueryClient();

  const onSubmit = (values: CreateExpenseType) => {
    mutate(
      JSON.stringify({
        amount: brlToNumber(values.amount),
        paymentMethodId: values.paymentMethod.value.id,
        description: values.description,
        date: values.date.toISOString(),
        categoryId: values.expenseCategory.value.id,
      }),
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: [expensesQueryKey.get],
          });
          await queryClient.invalidateQueries({
            queryKey: [expensesQueryKey.getTotal],
          });
          await revalidateBalanceTag();
          router.push('/despesas');
          toast.success('saida criada com sucesso');
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center h-screen"
    >
      <div className="flex flex-col max-w-[20rem] gap-4">
        <Controller
          name="date"
          control={control}
          render={({ field }) => <DatePicker value={field.value} onChange={field.onChange} />}
        />
        <InputText
          label="Valor"
          error={errors.amount}
          register={register('amount')}
          mask={Mask.brl}
        />
        <InputText
          label="Descrição"
          error={errors.description}
          register={register('description')}
        />
        <CustomSelect
          label="Categoria da despesa"
          name="expenseCategory"
          options={categoriesOptions}
          isLoading={isLoadingCategories}
          control={control}
          error={errors.expenseCategory}
        />
        <CustomSelect
          label="Metodo de pagamento"
          name="paymentMethod"
          options={paymentMethodsOptions}
          isLoading={isLoadingPaymentMethods}
          control={control}
          error={errors.paymentMethod}
        />
        <Button type="submit" isLoading={isPending} className="bg-blue">
          Adicionar
        </Button>
      </div>
    </form>
  );
};
