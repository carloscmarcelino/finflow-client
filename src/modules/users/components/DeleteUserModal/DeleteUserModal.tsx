import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'sonner';

import { User } from '@/api/auth/types';
import { DialogDispatch, DialogDispatchVariant } from '@/components/DialogDispatch';
import { TOAST_ERROR_MESSAGE } from '@/config';
import { useDisclosure } from '@/hooks';
import api from '@/lib/api';

import { usersQueryKey } from '../../pages';

type DeleteUserModalProps = {
  data: User;
};

export const DeleteUserModal = ({ data }: DeleteUserModalProps) => {
  const deleteUser = async (id: string) => {
    try {
      const response = await api.authorized().delete<void>(`user/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const useDeleteUser = () =>
    useMutation({
      mutationKey: [usersQueryKey.delete],
      mutationFn: deleteUser,
    });

  const { mutateAsync, isPending } = useDeleteUser();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const queryClient = useQueryClient();

  const onSubmit = () => {
    mutateAsync(data.id, {
      onSuccess: () => {
        // queryClient.invalidateQueries({ queryKey: [usersQueryKey.get] });
        // toast.success('Usuário deletado com sucesso');
        // onClose();
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
