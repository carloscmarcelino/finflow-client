import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { toast } from 'sonner';

import { revalidateBalanceTag, Expense, expensesQueryKey, useDeleteExpense } from '@/api';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
        await revalidateBalanceTag();
        toast.success('saida deletada com sucesso');
      },
      onError: () => {
        toast.error(TOAST_ERROR_MESSAGE);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={isOpen ? onClose : onOpen}>
      <DialogTrigger asChild>
        <Button variant="unstyled">
          <FaRegTrashAlt />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apagar?</DialogTitle>
          <DialogDescription>Essa ação não poderá ser desfeita.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="rounded-red">Cancelar</Button>
          </DialogClose>
          <Button onClick={onSubmit} isLoading={isPending} className="w-32">
            Apagar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
