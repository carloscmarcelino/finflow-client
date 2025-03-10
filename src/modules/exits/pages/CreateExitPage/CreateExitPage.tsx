'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { revalidateBalanceTag, useGetPaymentMethods } from '@/api';
import { exitsQueryKey, useCreateExit } from '@/api/exits';
import { CustomSelect } from '@/components/CustomSelect';
import { DatePicker } from '@/components/DatePicker';
import { InputText } from '@/components/InputText';
import { Button } from '@/components/ui/button';
import { brlToNumber, Mask } from '@/utils/mask';

import { createExitSchema, CreateExitSchemaType } from '../../validators';

export const CreateExitPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<CreateExitSchemaType>({
    resolver: zodResolver(createExitSchema),
    defaultValues: {
      date: dayjs().toDate(),
    },
  });

  const { data: paymentMethodsData, isPending: isLoadingPaymentMethods } = useGetPaymentMethods();

  const paymentMethodsOptions = paymentMethodsData?.data.map((item) => ({
    label: item.name,
    value: item,
  }));

  const { mutate, isPending } = useCreateExit();

  const router = useRouter();

  const queryClient = useQueryClient();

  const onSubmit = (values: CreateExitSchemaType) => {
    mutate(
      JSON.stringify({
        amount: brlToNumber(values.amount),
        paymentMethodId: values.paymentMethod.value.id,
        description: values.description,
        date: values.date.toISOString(),
      }),
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: [exitsQueryKey.get],
          });
          await queryClient.invalidateQueries({
            queryKey: [exitsQueryKey.getTotal],
          });
          await revalidateBalanceTag();
          router.push('/saidas');
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
