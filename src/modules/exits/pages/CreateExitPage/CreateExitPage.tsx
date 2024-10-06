'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

import revalidateTagFn from '@/api/actions/revalidateTagFn';
import { useCreateExit } from '@/api/exits';
import { Tags } from '@/api/types';
import { InputText } from '@/components/InputText';
import { Button } from '@/components/ui/button';
import { brlToNumber } from '@/utils/formatters/brlToNumber';
import { Mask } from '@/utils/functions/mask';

import { createExitSchema, CreateExitSchemaType } from '../../validators';

export const CreateExitPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateExitSchemaType>({
    resolver: zodResolver(createExitSchema),
  });

  const { mutate, isPending } = useCreateExit();

  const router = useRouter();

  const onSubmit = (values: CreateExitSchemaType) => {
    mutate(
      { ...values, amount: brlToNumber(values.amount) },
      {
        onSuccess: () => {
          revalidateTagFn(Tags.EXITS);
          router.push('/saidas');
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
