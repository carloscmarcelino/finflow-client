import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { bankQueryKey, useCreateBank } from '@/api';
import { DialogDispatch, DialogDispatchVariant } from '@/components/DialogDispatch';
import { InputText } from '@/components/Form';
import { INVALID_FORMAT, TOAST_ERROR_MESSAGE } from '@/config';
import { useDisclosure } from '@/hooks';

const schema = z.object({
  name: z.string().trim().min(1, INVALID_FORMAT),
});

export type CreateBankType = z.infer<typeof schema>;

export const CreateBankDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateBankType>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(schema),
  });

  const { mutateAsync: createBank, isPending } = useCreateBank();

  const queryClient = useQueryClient();

  const onSubmit = (data: CreateBankType) => {
    createBank(
      {
        name: data.name,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: [bankQueryKey.get],
          });
          toast.success('Banco criado com sucesso');
          reset();
          onClose();
        },
        onError: () => {
          toast.error(TOAST_ERROR_MESSAGE);
        },
      },
    );
  };

  return (
    <DialogDispatch
      variant={DialogDispatchVariant.CREATE}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isPending}
    >
      <InputText label="Nome" register={register('name')} error={errors.name?.message} />
    </DialogDispatch>
  );
};
