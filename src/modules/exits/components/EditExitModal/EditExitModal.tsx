import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaRegEdit } from 'react-icons/fa';
import { toast } from 'sonner';

import { useGetPaymentMethods } from '@/api';
import { Exit, useEditExit } from '@/api/exits';
import { CustomSelect } from '@/components/CustomSelect';
import { DatePicker } from '@/components/DatePicker';
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
import { brlToNumber, Mask, toBRL } from '@/utils/mask';

import { createExitSchema, CreateExitSchemaType } from '../../validators';

type EditExitModalProps = {
  data: Exit;
};

export const EditExitModal = ({ data }: EditExitModalProps) => {
  const { mutate, isPending } = useEditExit();

  const { open, onOpen, onClose } = useDisclosure();

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<CreateExitSchemaType>({
    resolver: zodResolver(createExitSchema),
    defaultValues: {
      amount: toBRL(Number(data.amount)),
      description: data.description,
      paymentMethod: { label: data.paymentMethod.name, value: data.paymentMethod },
      date: dayjs(data.date).toDate(),
    },
  });

  const queryClient = useQueryClient();

  const onSubmit = (values: CreateExitSchemaType) => {
    mutate(
      {
        id: data.id,
        body: JSON.stringify({
          amount: brlToNumber(values.amount),
          paymentMethodId: values.paymentMethod.value.id,
          description: values.description,
          date: values.date.toISOString(),
        }),
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ['get-exits'],
          });
          await queryClient.invalidateQueries({
            queryKey: ['get-total-exits'],
          });
          onClose();
          toast.success('saida editada com sucesso');
        },
        onError: () => {
          toast.error(TOAST_ERROR_MESSAGE);
        },
      },
    );
  };

  const { data: paymentMethodsData, isPending: isLoadingPaymentMethods } = useGetPaymentMethods();

  const paymentMethodsOptions = paymentMethodsData?.map((item) => ({
    label: item.name,
    value: item,
  }));

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

          <div className="flex flex-col max-w-[20rem] gap-4 my-10">
            <Controller
              name="date"
              control={control}
              render={({ field }) => <DatePicker value={field.value} onChange={field.onChange} />}
            />

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

            <CustomSelect
              label="Metodo de pagamento"
              name="paymentMethod"
              options={paymentMethodsOptions}
              isLoading={isLoadingPaymentMethods}
              control={control}
              error={errors.paymentMethod}
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
