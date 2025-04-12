import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'sonner';

import { Expense, expensesQueryKey, useDeleteExpense } from '@/api';
import { DialogDispatch, DialogDispatchVariant } from '@/components/DialogDispatch';
import { TOAST_ERROR_MESSAGE } from '@/config';
import { useDisclosure } from '@/hooks';

type DeleteExpenseModalProps = {
  data: Expense;
};

export const DeleteExpenseModal = ({ data }: DeleteExpenseModalProps) => {
  const { mutateAsync, isPending } = useDeleteExpense();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const queryClient = useQueryClient();

  const onSubmit = () => {
    mutateAsync(data.id, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [expensesQueryKey.get],
        });
        await queryClient.invalidateQueries({
          queryKey: [expensesQueryKey.getTotal],
        });
        toast.success('Despesa deletada com sucesso');
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
      isLoading={isPending}
      variant={DialogDispatchVariant.DELETE}
    />
  );
};
