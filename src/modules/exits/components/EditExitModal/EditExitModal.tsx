import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaRegEdit } from 'react-icons/fa';
import { toast } from 'sonner';

import { useGetPaymentMethods } from '@/api/__common__/hooks';
import revalidateTagFn from '@/api/actions/revalidateTagFn';
import { Exit, useEditExit } from '@/api/exits';
import { Tags } from '@/api/types';
import { CustomSelect } from '@/components/CustomSelect';
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
    },
  });

  const onSubmit = (values: CreateExitSchemaType) => {
    mutate(
      {
        id: data.id,
        body: {
          amount: brlToNumber(values.amount),
          paymentMethodId: values.paymentMethod.value.id,
          description: values.description,
        },
      },
      {
        onSuccess: () => {
          revalidateTagFn(Tags.EXITS);
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

  const paymentMethodsOptions = paymentMethodsData?.data?.map((item) => ({
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
              error={errors}
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
