import { PlusIcon } from 'lucide-react';
import React, { BaseSyntheticEvent, ReactNode } from 'react';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
} from '@/components/ui';

type DialogDispatchProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: (event?: BaseSyntheticEvent) => Promise<void>;
  title: string;
  isLoading: boolean;
  trigger?: ReactNode;
  children: ReactNode;
};

export const DialogDispatch = ({
  isOpen,
  onOpen,
  onClose,
  title,
  onSubmit,
  isLoading,
  trigger = (
    <Button>
      <PlusIcon className="text-white h-4 w-4" />
      Adicionar
    </Button>
  ),
  children,
}: DialogDispatchProps) => (
  <Dialog open={isOpen} onOpenChange={(open) => (open ? onOpen() : onClose())}>
    <DialogTrigger>{trigger}</DialogTrigger>
    <DialogContent>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 my-4">{children}</div>
        <DialogFooter>
          <Button variant="rounded-red" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Criar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
);
