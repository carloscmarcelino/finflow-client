'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import revalidateTagFn from '@/api/actions/revalidateTagFn';
import { useCreateExpense } from '@/api/home/hooks';
import { InputText } from '@/components/InputText';
import { Button } from '@/components/ui/button';

const createExpenseSchema = z.object({
  amount: z.string(),
  description: z.string(),
  paymentMethod: z.string(),
});

type CreateExpenseType = z.infer<typeof createExpenseSchema>;

const Page = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateExpenseType>({
    defaultValues: { amount: '1000', description: 'teste', paymentMethod: 'credit card' },
    resolver: zodResolver(createExpenseSchema),
  });

  const { mutateAsync, isPending } = useCreateExpense();

  const router = useRouter();

  const onSubmit = (values: CreateExpenseType) => {
    mutateAsync(
      { ...values, amount: Number(values.amount) },
      {
        onSuccess: async () => {
          await revalidateTagFn('expense');
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
      <div className="flex flex-col max-w-[20rem]">
        <InputText label="Valor" id="amount" error={errors.amount} {...register('amount')} />

        <InputText
          label="Descrição"
          id="description"
          error={errors.description}
          {...register('description')}
        />

        <InputText
          label="Metodo de pagamento"
          id="paymentMethod"
          error={errors.paymentMethod}
          {...register('paymentMethod')}
        />

        <Button type="submit" isLoading={isPending}>
          Adicionar
        </Button>
      </div>
    </form>
  );
};

export default Page;
