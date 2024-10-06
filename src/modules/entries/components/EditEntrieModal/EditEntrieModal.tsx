import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaRegEdit } from 'react-icons/fa';
import { toast } from 'sonner';

import revalidateTagFn from '@/api/actions/revalidateTagFn';
import { Entrie, useEditEntrie } from '@/api/entries';
import { Tags } from '@/api/types';
import { InputText } from '@/components/InputText';
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
import { useDisclosure } from '@/hooks';
import { brlToNumber } from '@/utils/formatters/brlToNumber';
import { toBRL } from '@/utils/formatters/toBRL';
import { Mask } from '@/utils/functions/mask';

import { createEntrieSchema, CreateEntrieSchemaType } from '../../validators';

type EditEntrieModalProps = {
  data: Entrie;
};

export const EditEntrieModal = ({ data }: EditEntrieModalProps) => {
  const { mutate, isPending } = useEditEntrie();

  const { open, onOpen, onClose } = useDisclosure();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateEntrieSchemaType>({
    resolver: zodResolver(createEntrieSchema),
    defaultValues: {
      description: data.description,
      value: toBRL(data.value),
    },
  });

  const onSubmit = (values: CreateEntrieSchemaType) => {
    mutate(
      {
        id: data.id,
        body: { ...values, value: brlToNumber(values.value) },
      },
      {
        onSuccess: () => {
          revalidateTagFn(Tags.EXITS);
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
    <Dialog open={open} onOpenChange={open ? onClose : onOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FaRegEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Editar</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col max-w-[20rem] gap-4">
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
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancelar</Button>
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
