'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import revalidateTagFn from '@/api/actions/revalidateTagFn';
import { useCreateEntrie } from '@/api/entries';
import { Tags } from '@/api/types';
import { DatePicker } from '@/components/DatePicker';
import { InputText } from '@/components/InputText';
import { Button } from '@/components/ui/button';
import { TOAST_ERROR_MESSAGE } from '@/config';
import { brlToNumber } from '@/utils/formatters/brlToNumber';
import { Mask } from '@/utils/functions/mask';

import { createEntrieSchema, CreateEntrieSchemaType } from '../../validators/createEntrieSchema';

export const CreateEntriePage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<CreateEntrieSchemaType>({
    resolver: zodResolver(createEntrieSchema),
    defaultValues: {
      date: dayjs().toDate(),
    },
  });

  const { mutate, isPending } = useCreateEntrie();

  const router = useRouter();

  const onSubmit = (values: CreateEntrieSchemaType) => {
    mutate(
      { ...values, value: brlToNumber(values.value), date: values.date.toISOString() },
      {
        onSuccess: () => {
          revalidateTagFn(Tags.ENTRIES);
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
