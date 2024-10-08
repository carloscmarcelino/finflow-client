'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useGetBrokers } from '@/api/__common__/hooks';
import revalidateTagFn from '@/api/actions/revalidateTagFn';
import { useCreateInvestment } from '@/api/investments/hooks';
import { Tags } from '@/api/types';
import { CustomSelect } from '@/components/CustomSelect';
import { InputText } from '@/components/InputText';
import { Button } from '@/components/ui/button';
import { TOAST_ERROR_MESSAGE } from '@/config';
import { brlToNumber } from '@/utils/formatters/brlToNumber';
import { Mask } from '@/utils/functions/mask';

import { createInvestmentSchema, CreateInvestmentType } from '../../validators';

export const CreateInvestmentPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    watch,
  } = useForm<CreateInvestmentType>({
    resolver: zodResolver(createInvestmentSchema),
  });

  const { data: brokersData, isLoading } = useGetBrokers();

  const brokerOptions = brokersData?.data.map((broker) => ({
    label: broker.nome_social,
    value: broker.nome_social,
  }));

  const { mutate, isPending } = useCreateInvestment();

  const router = useRouter();

  const onSubmit = (values: CreateInvestmentType) => {
    mutate(
      {
        ...values,
        value: brlToNumber(values.value),
        yield: Number(values.yield),
        broker: values.broker.value,
      },
      {
        onSuccess: () => {
          revalidateTagFn(Tags.INVESTMENTS);
          router.push('/investimentos');
          toast.success('investimento criado com sucesso');
        },
        onError: () => {
          toast.error(TOAST_ERROR_MESSAGE);
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

        <CustomSelect
          label="Banco"
          name="broker"
          options={brokerOptions}
          isLoading={isLoading}
          control={control}
          error={errors.broker}
        />

        <Button type="submit" isLoading={isPending} className="bg-blue">
          Adicionar
        </Button>
      </div>
    </form>
  );
};
