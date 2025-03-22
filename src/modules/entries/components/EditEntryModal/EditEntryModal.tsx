import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaRegEdit } from 'react-icons/fa';
import { toast } from 'sonner';

import { entriesQueryKey, Entry, revalidateBalanceTag, useEditEntry } from '@/api';
import { DatePicker, InputText } from '@/components/Form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TOAST_ERROR_MESSAGE } from '@/config';
import { useDisclosure } from '@/hooks/useDisclosure';
import { brlToNumber, Mask, toBRL } from '@/utils/mask';

import { createEntrySchema, CreateEntrySchemaType } from '../../validators';

type EditEntryModalProps = {
  data: Entry;
};

export const EditEntryModal = ({ data }: EditEntryModalProps) => {
  const { mutate, isPending } = useEditEntry();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<CreateEntrySchemaType>({
    resolver: zodResolver(createEntrySchema),
    defaultValues: {
      description: data.description,
      value: toBRL(data.value),
      date: dayjs(data.date).toDate(),
    },
  });

  const queryClient = useQueryClient();

  const onSubmit = (values: CreateEntrySchemaType) => {
    mutate(
      {
        id: data.id,
        body: JSON.stringify({
          ...values,
          value: brlToNumber(values.value),
          date: values.date.toISOString(),
        }),
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: [entriesQueryKey.get],
          });
          await queryClient.invalidateQueries({
            queryKey: [entriesQueryKey.getTotal],
          });
          await revalidateBalanceTag();
          onClose();
          toast.success('entrada editada com sucesso');
        },
        onError: () => {
          toast.error(TOAST_ERROR_MESSAGE);
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={isOpen ? onClose : onOpen}>
      <DialogTrigger asChild>
        <Button variant="unstyled">
          <FaRegEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Editar</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col max-w-[20rem] gap-4 my-10">
            <DatePicker label="Data" name="date" control={control} error={errors.date?.message} />
            <InputText
              label="Valor"
              error={errors.value?.message}
              register={register('value')}
              mask={Mask.brl}
            />
            <InputText
              label="Descrição"
              error={errors.description?.message}
              register={register('description')}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="rounded-red">Cancelar</Button>
            </DialogClose>
            <Button type="submit" isLoading={isPending} className="w-32">
              Editar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
