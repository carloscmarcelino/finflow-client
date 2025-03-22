import { PlusIcon } from 'lucide-react';
import React, { BaseSyntheticEvent, ReactNode } from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  DialogDescription,
} from '@/components/ui';
import { cn } from '@/lib/cn';

export enum DialogDispatchVariant {
  CREATE = 'create',
  DELETE = 'delete',
  EDIT = 'edit',
}

type DialogDispatchProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: (event?: BaseSyntheticEvent) => Promise<void> | void;
  isLoading: boolean;
  trigger?: ReactNode;
  children?: ReactNode;
  variant: DialogDispatchVariant;
};

export const DialogDispatch = ({
  isOpen,
  onOpen,
  onClose,
  onSubmit,
  isLoading,
  children,
  variant,
}: DialogDispatchProps) => {
  const triggerButton = () => {
    switch (variant) {
      case DialogDispatchVariant.CREATE:
        return (
          <Button>
            <PlusIcon className="text-white h-4 w-4" />
            Adicionar
          </Button>
        );
      case DialogDispatchVariant.DELETE:
        return (
          <Button variant="unstyled" size="icon">
            <FaRegTrashAlt />
          </Button>
        );
      case DialogDispatchVariant.EDIT:
        return (
          <Button variant="unstyled" size="icon">
            <FaRegEdit />
          </Button>
        );
    }
  };

  const title = () => {
    switch (variant) {
      case DialogDispatchVariant.CREATE:
        return 'Criar';
      case DialogDispatchVariant.DELETE:
        return 'Deletar';
      case DialogDispatchVariant.EDIT:
        return 'Editar';
    }
  };

  const description = () => {
    if (variant === DialogDispatchVariant.DELETE) return 'Essa ação não poderá ser desfeita.';

    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (open ? onOpen() : onClose())}>
      <DialogTrigger>{triggerButton()}</DialogTrigger>
      <DialogContent>
        <form onSubmit={onSubmit} className={cn('flex flex-col gap-4')}>
          <DialogHeader>
            <DialogTitle>{title()}</DialogTitle>
            {description() && <DialogDescription>{description()}</DialogDescription>}
          </DialogHeader>
          {children && <div className="flex flex-col gap-4 my-4">{children}</div>}
          <DialogFooter>
            <Button type="submit" isLoading={isLoading}>
              {title()}
            </Button>
            <Button variant="rounded-red" onClick={onClose} type="button">
              Cancelar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
