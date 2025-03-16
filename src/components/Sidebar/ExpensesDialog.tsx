'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Pencil, Trash2 } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { categoriesQueryKey, useCreateExpensesCategory, useGetExpensesCategories } from '@/api';
import { INVALID_FORMAT, TOAST_ERROR_MESSAGE } from '@/config';
import { useDisclosure } from '@/hooks';

import { InputText } from '../InputText';
import { SkeletonLoader } from '../SkeletonLoader';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

const schema = z.object({
  name: z.string().trim().min(1, { message: INVALID_FORMAT }),
});

type SchemaType = z.infer<typeof schema>;

export const ExpensesDialog = () => {
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
      },
      onError: () => {
        toast.error(TOAST_ERROR_MESSAGE);
      },
    });
  };

  const { data: categories, isLoading: isLoadingExpenses } = useGetExpensesCategories();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (open ? onOpen() : onClose())}>
      <DialogTrigger>
        <p className="text-description">Despesas</p>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Despesas</DialogTitle>
          </DialogHeader>
          <InputText label="Adicionar categoria" error={errors.name} register={register('name')} />
          <div className="flex flex-col gap-2 max-h-60 overflow-auto">
            {isLoadingExpenses ? (
              <SkeletonLoader />
            ) : (
              categories?.data.map((category) => (
                <div key={category.id} className="flex justify-between">
                  <p className="text-base text-black">{category.name}</p>
                  <div className="flex gap-4 mx-4">
                    <Pencil className="w-4 h-4" />
                    <Trash2 className="w-4 h-4" />
                  </div>
                </div>
              ))
            )}
          </div>
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
