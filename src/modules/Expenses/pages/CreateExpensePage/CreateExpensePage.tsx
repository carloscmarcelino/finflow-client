'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

import revalidateTagFn from '@/api/actions/revalidateTagFn';
import { useCreateExpense } from '@/api/expenses';
import { Tags } from '@/api/types';
import { InputText } from '@/components/InputText';
import { Button } from '@/components/ui/button';
import { brlToNumber } from '@/utils/formatters/brlToNumber';
import { Mask } from '@/utils/functions/mask';

import { createExpenseSchema, CreateExpenseType } from '../../validators';

export const CreateExpensePage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateExpenseType>({
    resolver: zodResolver(createExpenseSchema),
  });

  const { mutate, isPending } = useCreateExpense();

  const router = useRouter();

  const onSubmit = (values: CreateExpenseType) => {
    mutate(
      { ...values, amount: brlToNumber(values.amount) },
      {
        onSuccess: () => {
          revalidateTagFn(Tags.EXPENSE);
          router.push('/despesas');
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

        <InputText
          label="Metodo de pagamento"
          error={errors.paymentMethod}
          register={register('paymentMethod')}
        />

        <Button type="submit" isLoading={isPending} className="bg-blue">
          Adicionar
        </Button>
      </div>
    </form>
  );
};
