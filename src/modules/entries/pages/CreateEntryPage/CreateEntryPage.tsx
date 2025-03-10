'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { entriesQueryKey, revalidateBalanceTag, useCreateEntry } from '@/api';
import { DatePicker } from '@/components/DatePicker';
import { InputText } from '@/components/InputText';
import { Button } from '@/components/ui/button';
import { TOAST_ERROR_MESSAGE } from '@/config';
import { brlToNumber, Mask } from '@/utils/mask';

import { createEntrySchema, CreateEntrySchemaType } from '../../validators';

export const CreateEntryPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<CreateEntrySchemaType>({
    resolver: zodResolver(createEntrySchema),
    defaultValues: {
      date: dayjs().toDate(),
    },
  });

  const { mutate, isPending } = useCreateEntry();

  const router = useRouter();

  const queryClient = useQueryClient();

  const onSubmit = (values: CreateEntrySchemaType) => {
    mutate(
      JSON.stringify({
        ...values,
        value: brlToNumber(values.value),
        date: values.date.toISOString(),
      }),
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: [entriesQueryKey.get],
          });
          await queryClient.invalidateQueries({
            queryKey: [entriesQueryKey.getTotal],
          });
          await revalidateBalanceTag();
          router.push('/entradas');
          toast.success('entrada criada com sucesso');
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
        <InputText
          label="Valor"
          error={errors.value}
          register={register('value')}
          mask={Mask.brl}
        />
        <InputText
          label="Descrição"
          error={errors.description}
          register={register('description')}
        />
        <Button type="submit" isLoading={isPending} className="bg-blue">
          Adicionar
        </Button>
      </div>
    </form>
  );
};
