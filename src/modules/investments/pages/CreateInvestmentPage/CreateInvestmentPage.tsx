'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useGetBrokers, useGetTypesOfInvestments } from '@/api';
import { useCreateInvestment } from '@/api/investments/hooks';
import { CustomSelect } from '@/components/CustomSelect';
import { DatePicker } from '@/components/DatePicker';
import { InputText } from '@/components/InputText';
import { Button } from '@/components/ui/button';
import { TOAST_ERROR_MESSAGE } from '@/config';
import { brlToNumber, Mask } from '@/utils/mask';

import { createInvestmentSchema, CreateInvestmentType } from '../../validators';

export const CreateInvestmentPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<CreateInvestmentType>({
    resolver: zodResolver(createInvestmentSchema),
    defaultValues: {
      date: dayjs().toDate(),
    },
  });

  const { data: typesData, isLoading: isLoadingTypes } = useGetTypesOfInvestments();

  const typeOptions = typesData?.map((type) => ({ label: type.name, value: type.id }));

  const { data: brokersData, isLoading } = useGetBrokers();

  const brokerOptions = brokersData?.map((broker) => ({
    label: broker.nome_social,
    value: broker.nome_social,
  }));

  const { mutate, isPending } = useCreateInvestment();

  const router = useRouter();

  const onSubmit = (values: CreateInvestmentType) => {
    mutate(
      JSON.stringify({
        value: brlToNumber(values.value),
        yield: Number(values.yield),
        broker: values.broker.value,
        type: {
          id: values.type.value,
          name: values.type.label,
        },
        date: values.date.toISOString(),
      }),
      {
        onSuccess: () => {
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
        <Controller
          name="date"
          control={control}
          render={({ field }) => <DatePicker value={field.value} onChange={field.onChange} />}
        />
        <CustomSelect
          label="Tipo"
          name="type"
          options={typeOptions}
          isLoading={isLoadingTypes}
          control={control}
          error={errors.type}
        />
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
