import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React from 'react';
import { toast } from 'sonner';

import { User } from '@/api/auth/types';
import { useDeleteUser, usersQueryKey } from '@/api/users';
import { DialogDispatch, DialogDispatchVariant } from '@/components/DialogDispatch';
import { TOAST_ERROR_MESSAGE } from '@/config';
import { useDisclosure } from '@/hooks';

type DeleteUserModalProps = {
  data: User;
};

export const DeleteUserModal = ({ data }: DeleteUserModalProps) => {
  const { mutate } = useDeleteUser();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const queryClient = useQueryClient();

  const onSubmit = () => {
    mutate(data.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [usersQueryKey.get] });
        toast.success('Usuário deletado com sucesso');
        onClose();
      },
      onError: () => {
        toast.error(TOAST_ERROR_MESSAGE);
      },
    });
  };

  const { data: session } = useSession();

  if (Number(session?.user?.id) === Number(data.id)) return <></>;

  return (
    <DialogDispatch
      variant={DialogDispatchVariant.DELETE}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      isLoading={false}
    />
  );
};
