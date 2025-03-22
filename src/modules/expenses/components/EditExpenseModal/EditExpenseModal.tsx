import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  revalidateBalanceTag,
  useGetPaymentMethods,
  Expense,
  expensesQueryKey,
  useEditExpense,
} from '@/api';
import { DialogDispatch, DialogDispatchVariant } from '@/components/DialogDispatch';
import { CustomSelect, DatePicker, InputText } from '@/components/Form';
import { TOAST_ERROR_MESSAGE } from '@/config';
import { useDisclosure } from '@/hooks';
import { brlToNumber, Mask, toBRL } from '@/utils/mask';

import { createExpenseSchema, CreateExpenseType } from '../../validators';

type EditExpenseModalProps = {
  data: Expense;
};

export const EditExpenseModal = ({ data }: EditExpenseModalProps) => {
  const { mutate, isPending } = useEditExpense();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<CreateExpenseType>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      amount: toBRL(Number(data.amount)),
      description: data.description,
      paymentMethod: { label: data.paymentMethod.name, value: data.paymentMethod },
      date: dayjs(data.date).toDate(),
    },
  });

  const queryClient = useQueryClient();

  const onSubmit = (values: CreateExpenseType) => {
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
            queryKey: [expensesQueryKey.get],
          });
          await queryClient.invalidateQueries({
            queryKey: [expensesQueryKey.getTotal],
          });
          await revalidateBalanceTag();
          onClose();
          toast.success('Despesa editada com sucesso');
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
    <DialogDispatch
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isPending}
      variant={DialogDispatchVariant.EDIT}
    >
      <DatePicker label="Data" name="date" control={control} error={errors.date?.message} />
      <InputText
        label="Valor"
        error={errors.amount?.message}
        register={register('amount')}
        mask={Mask.brl}
      />
      <InputText
        label="Descrição"
        error={errors.description?.message}
        register={register('description')}
      />
      <CustomSelect
        label="Metodo de pagamento"
        name="paymentMethod"
        options={paymentMethodsOptions}
        isLoading={isLoadingPaymentMethods}
        control={control}
        error={errors.paymentMethod?.message}
      />
    </DialogDispatch>
  );
};
