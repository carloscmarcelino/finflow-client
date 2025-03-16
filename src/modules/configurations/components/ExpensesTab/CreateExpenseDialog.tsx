import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { categoriesQueryKey, useCreateExpensesCategory } from '@/api';
import { InputText } from '@/components/InputText';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { INVALID_FORMAT, TOAST_ERROR_MESSAGE } from '@/config';
import { useDisclosure } from '@/hooks';

const schema = z.object({
  name: z.string().trim().min(1, { message: INVALID_FORMAT }),
});

type SchemaType = z.infer<typeof schema>;

export const CreateExpenseDialog = () => {
  const { open: isOpen, onOpen, onClose } = useDisclosure();

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
    <Dialog open={isOpen} onOpenChange={(open) => (open ? onOpen() : onClose())}>
      <DialogTrigger>
        <Button>Adicionar</Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Despesas</DialogTitle>
          </DialogHeader>
          <InputText label="Adicionar categoria" error={errors.name} register={register('name')} />
          <DialogFooter>
            <Button type="submit" isLoading={isLoadingCreateExpenses}>
              Criar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
