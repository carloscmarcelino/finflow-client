import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useEditInvestment, Investment, useGetInvestmentsType, useGetBanks } from '@/api';
import { DialogDispatch, DialogDispatchVariant } from '@/components/DialogDispatch';
import { CustomSelect, DatePicker, InputText } from '@/components/Form';
import { TOAST_ERROR_MESSAGE } from '@/config';
import { useDisclosure } from '@/hooks';
import { brlToNumber, Mask, toBRL } from '@/utils/mask';

import { createInvestmentSchema, CreateInvestmentType } from '../../validators';

type EditInvestmentModalProps = {
  data: Investment;
};

export const EditInvestmentModal = ({ data }: EditInvestmentModalProps) => {
  const { mutate, isPending } = useEditInvestment();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<CreateInvestmentType>({
    resolver: zodResolver(createInvestmentSchema),
    defaultValues: {
      type: { label: data.type.name, value: data.type.id },
      value: toBRL(Number(data.value)),
      yield: String(data.yield),
      bank: { label: data.bank.name, value: data.bank.id },
      date: dayjs(data.date).toDate(),
    },
  });

  const { data: banksData, isLoading } = useGetBanks();

  const bankOptions = banksData?.data?.map((bank) => ({
    label: bank.name,
    value: bank.id,
  }));

  const { data: typesData, isLoading: isLoadingTypes } = useGetInvestmentsType();

  const typeOptions = typesData?.data?.map((type) => ({ label: type.name, value: type.id }));

  const onSubmit = (values: CreateInvestmentType) => {
    mutate(
      {
        id: data.id,
        body: {
          ...values,
          value: brlToNumber(values.value),
          yield: Number(values.yield),
          bank: {
            id: values.bank.value,
            name: values.bank.label,
          },
          type: {
            id: values.type.value,
            name: values.type.label,
          },
          date: values.date.toISOString(),
        },
      },
      {
        onSuccess: () => {
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
    <DialogDispatch
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isPending}
      variant={DialogDispatchVariant.EDIT}
    >
      <DatePicker label="Data" name="date" control={control} error={errors.date?.message} />
      <CustomSelect
        label="Tipo"
        name="type"
        options={typeOptions}
        isLoading={isLoadingTypes}
        control={control}
        error={errors.type?.message}
      />
      <InputText
        label="Valor"
        error={errors.value?.message}
        register={register('value')}
        mask={Mask.brl}
      />
      <InputText
        label="Rendimento"
        error={errors.yield?.message}
        register={register('yield')}
        mask={Mask.yield}
      />
      <CustomSelect
        label="Banco"
        name="bank"
        options={bankOptions}
        isLoading={isLoading}
        control={control}
        error={errors.bank?.message}
      />
    </DialogDispatch>
  );
};
