'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useCreateUser } from '@/api';
import { usersQueryKey } from '@/api/users';
import { DialogDispatch, DialogDispatchVariant } from '@/components/DialogDispatch';
import { InputText } from '@/components/Form';
import { TOAST_ERROR_MESSAGE } from '@/config';
import { useDisclosure } from '@/hooks';
import { loginSchema, LoginType } from '@/modules/auth';

export const CreateUserDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: 'teste', password: 'teste' },
  });

  const { mutate, isPending } = useCreateUser();

  const queryClient = useQueryClient();

  const onSubmit = (data: LoginType) => {
    mutate(data, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [usersQueryKey.get],
        });
        toast.success('conta criada com sucesso');
        reset();
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
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isPending}
      variant={DialogDispatchVariant.CREATE}
    >
      <InputText
        label="Username"
        error={errors.username?.message}
        register={register('username')}
      />
      <InputText
        label="Password"
        error={errors.password?.message}
        register={register('password')}
      />
    </DialogDispatch>
  );
};
