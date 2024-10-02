import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaRegEdit } from 'react-icons/fa';

import revalidateTagFn from '@/api/actions/revalidateTagFn';
import { useEditExpense } from '@/api/home/hooks';
import { Expense } from '@/api/home/types';
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
import { useDisclosure } from '@/hooks';
import { brlToNumber } from '@/utils/formatters/brlToNumber';
import { toBRL } from '@/utils/formatters/toBRL';
import { Mask } from '@/utils/functions/mask';

import { createExpenseSchema, CreateExpenseType } from '../../validators';

type EditExpenseModalProps = {
  data: Expense;
};

export const EditExpenseModal = ({ data }: EditExpenseModalProps) => {
  const { mutate, isPending } = useEditExpense();

  const { open, onOpen, onClose } = useDisclosure();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateExpenseType>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      amount: toBRL(Number(data.amount)),
      description: data.description,
      paymentMethod: data.paymentMethod,
    },
  });

  const onSubmit = (values: CreateExpenseType) => {
    mutate(
      {
        id: data.id,
        body: {
          ...values,
          amount: brlToNumber(values.amount),
        },
      },
      {
        onSuccess: () => {
          revalidateTagFn(Tags.EXPENSE);
          onClose();
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
