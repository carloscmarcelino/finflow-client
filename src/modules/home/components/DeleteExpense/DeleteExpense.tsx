import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

import revalidateTagFn from '@/api/actions/revalidateTagFn';
import { useDeleteExpense } from '@/api/home/hooks';
import { Expense } from '@/api/home/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type DeleteExpenseProps = {
  data: Expense;
};

export const DeleteExpense = ({ data }: DeleteExpenseProps) => {
  const { mutateAsync, isPending } = useDeleteExpense();

  const onSubmit = () => {
    mutateAsync(data.id, {
      onSuccess: () => {
        revalidateTagFn('expense');
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FaRegTrashAlt />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apagar?</DialogTitle>
          <DialogDescription>Essa ação não poderá ser desfeita.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onSubmit} isLoading={isPending}>
            Apagar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
