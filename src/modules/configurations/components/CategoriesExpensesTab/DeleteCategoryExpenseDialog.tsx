import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'sonner';

import { DialogDispatch, DialogDispatchVariant } from '@/components/DialogDispatch';
import { TOAST_ERROR_MESSAGE } from '@/config';
import { useDisclosure } from '@/hooks';
import api from '@/lib/api';

type DeleteCategoryExpenseDialogProps = {
  id: string;
};

export const DeleteCategoryExpenseDialog = ({ id }: DeleteCategoryExpenseDialogProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteCategoryExpense = async (id: string) => {
    await api.authorized().delete(`configurations/expenses-category/${id}`);
  };

  const { mutate, isPending: isDeletingCategoryExpense } = useMutation({
    mutationKey: ['delete-category-expense'],
    mutationFn: deleteCategoryExpense,
  });

  const onSubmit = () => {
    mutate(id, {
      onSuccess: () => {
        toast.success('Categoria de despesa deletada com sucesso');
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
      onSubmit={onSubmit}
      isLoading={isDeletingCategoryExpense}
      variant={DialogDispatchVariant.DELETE}
    />
  );
};
