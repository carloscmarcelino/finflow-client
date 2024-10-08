import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaRegEdit } from 'react-icons/fa';
import { toast } from 'sonner';

import { useGetBrokers, useGetTypesOfInvestments } from '@/api/__common__/hooks';
import revalidateTagFn from '@/api/actions/revalidateTagFn';
import { useEditInvestment } from '@/api/investments/hooks/useEditInvestment';
import { Investment } from '@/api/investments/types';
import { Tags } from '@/api/types';
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
    control,
  } = useForm<CreateInvestmentType>({
    resolver: zodResolver(createInvestmentSchema),
    defaultValues: {
      type: { label: data.type.name, value: data.type.id },
      value: toBRL(data.value),
      yield: String(data.yield),
      broker: { label: data.broker, value: data.broker },
      date: dayjs(data.date).toDate(),
    },
  });

  const { data: brokersData, isLoading } = useGetBrokers();

  const brokerOptions = brokersData?.data.map((broker) => ({
    label: broker.nome_social,
    value: broker.nome_social,
  }));

  const { data: typesData, isLoading: isLoadingTypes } = useGetTypesOfInvestments();

  const typeOptions = typesData?.data.map((type) => ({ label: type.name, value: type.id }));

  const onSubmit = (values: CreateInvestmentType) => {
    mutate(
      {
        id: data.id,
        body: {
          ...values,
          value: brlToNumber(values.value),
          yield: Number(values.yield),
          broker: values.broker.value,
          type: {
            id: values.type.value,
            name: values.type.label,
          },
          date: values.date.toISOString(),
        },
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

          <div className="flex flex-col max-w-[20rem] gap-4 my-10">
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
