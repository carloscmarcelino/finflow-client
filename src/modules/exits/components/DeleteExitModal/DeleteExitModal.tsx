import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

import revalidateTagFn from '@/api/actions/revalidateTagFn';
import { Exit, useDeleteExit } from '@/api/exits';
import { Tags } from '@/api/types';
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
import { useDisclosure } from '@/hooks';

type DeleteExitModalProps = {
  data: Exit;
};

export const DeleteExitModal = ({ data }: DeleteExitModalProps) => {
  const { mutateAsync, isPending } = useDeleteExit();

  const { open, onOpen, onClose } = useDisclosure();

  const onSubmit = () => {
    mutateAsync(data.id, {
      onSuccess: () => {
        revalidateTagFn(Tags.EXITS);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={open ? onClose : onOpen}>
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
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button onClick={onSubmit} isLoading={isPending} className="w-32">
            Apagar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
