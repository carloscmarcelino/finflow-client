import React from 'react';
import { toast } from 'sonner';

import { useDeleteInvestment, Investment } from '@/api';
import { DialogDispatch, DialogDispatchVariant } from '@/components/DialogDispatch';
import { TOAST_ERROR_MESSAGE } from '@/config';
import { useDisclosure } from '@/hooks';

type DeleteInvestmentModalProps = {
  data: Investment;
};

export const DeleteInvestmentModal = ({ data }: DeleteInvestmentModalProps) => {
  const { mutateAsync, isPending } = useDeleteInvestment();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = () => {
    mutateAsync(data.id, {
      onSuccess: () => {
        toast.success('investimento deletado com sucesso');
      },
      onError: () => {
        toast.error(TOAST_ERROR_MESSAGE);
      },
    });
  };

  return (
    <DialogDispatch
      variant={DialogDispatchVariant.DELETE}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      isLoading={isPending}
    />
  );
};
