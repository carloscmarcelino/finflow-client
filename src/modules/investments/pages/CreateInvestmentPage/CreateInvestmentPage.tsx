'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

import revalidateTagFn from '@/api/actions/revalidateTagFn';
import { useCreateInvestment } from '@/api/investments/hooks';
import { Tags } from '@/api/types';
import { InputText } from '@/components/InputText';
import { Button } from '@/components/ui/button';
import { brlToNumber } from '@/utils/formatters/brlToNumber';
import { Mask } from '@/utils/functions/mask';

import { createInvestmentSchema, CreateInvestmentType } from '../../validators';

export const CreateInvestmentPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateInvestmentType>({
    resolver: zodResolver(createInvestmentSchema),
  });

  const { mutate, isPending } = useCreateInvestment();

  const router = useRouter();

  const onSubmit = (values: CreateInvestmentType) => {
    mutate(
      { ...values, value: brlToNumber(values.value), yield: Number(values.yield) },
      {
        onSuccess: () => {
          revalidateTagFn(Tags.INVESTMENT);
          router.push('/investimentos');
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
        <InputText label="Tipo" error={errors.type} register={register('type')} />

        <InputText
          label="Valor"
          error={errors.value}
          register={register('value')}
          mask={Mask.brl}
        />
        <InputText
          label="Rendimento"
          error={errors.yield}
          register={register('yield')}
          mask={Mask.yield}
        />

        <InputText label="Banco" error={errors.bank} register={register('bank')} />

        <Button type="submit" isLoading={isPending} className="bg-blue">
          Adicionar
        </Button>
      </div>
    </form>
  );
};
