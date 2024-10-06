import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaRegEdit } from 'react-icons/fa';
import { toast } from 'sonner';

import revalidateTagFn from '@/api/actions/revalidateTagFn';
import { useEditInvestment } from '@/api/investments/hooks/useEditInvestment';
import { Investment } from '@/api/investments/types';
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

import { createInvestmentSchema, CreateInvestmentType } from '../../validators';

type EditInvestmentModalProps = {
  data: Investment;
};

export const EditInvestmentModal = ({ data }: EditInvestmentModalProps) => {
  const { mutate, isPending } = useEditInvestment();

  const { open, onOpen, onClose } = useDisclosure();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateInvestmentType>({
    resolver: zodResolver(createInvestmentSchema),
    defaultValues: {
      bank: data.bank,
      type: data.type,
      value: toBRL(data.value),
      yield: String(data.yield),
    },
  });

  const onSubmit = (values: CreateInvestmentType) => {
    mutate(
      {
        id: data.id,
        body: { ...values, value: brlToNumber(values.value), yield: Number(values.yield) },
      },
      {
        onSuccess: () => {
          revalidateTagFn(Tags.INVESTMENTS);
          onClose();
          toast.success('investimento editado com sucesso');
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
