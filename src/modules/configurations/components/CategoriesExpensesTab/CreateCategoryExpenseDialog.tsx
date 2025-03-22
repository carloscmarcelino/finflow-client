'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { categoriesQueryKey, useCreateExpensesCategory } from '@/api';
import { DialogDispatch } from '@/components/DialogDispatch';
import { InputText } from '@/components/Form';
import { INVALID_FORMAT, TOAST_ERROR_MESSAGE } from '@/config';
import { useDisclosure } from '@/hooks';

const schema = z.object({
  name: z.string().trim().min(1, { message: INVALID_FORMAT }),
});

type SchemaType = z.infer<typeof schema>;

export const CreateCategoryExpenseDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SchemaType>({
    defaultValues: { name: '' },
    resolver: zodResolver(schema),
  });

  const { mutate, isPending: isLoadingCreateExpenses } = useCreateExpensesCategory();

  const queryClient = useQueryClient();

  const onSubmit = (values: SchemaType) => {
    mutate(values, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [categoriesQueryKey.expenses.get],
        });
        toast.success('Categoria criada com sucesso');
        reset();
        onClose();
      },
      onError: () => {
        toast.error(TOAST_ERROR_MESSAGE);
      },
    });
  };

  return (
    <DialogDispatch
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Despesas"
      isLoading={isLoadingCreateExpenses}
    >
      <InputText
        label="Adicionar categoria"
        error={errors.name?.message}
        register={register('name')}
      />
    </DialogDispatch>
  );
};
