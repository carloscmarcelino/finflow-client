import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { investmentTypeQueryKey, useCreateInvestmentType } from '@/api';
import { DialogDispatch, DialogDispatchVariant } from '@/components/DialogDispatch';
import { InputText } from '@/components/Form';
import { INVALID_FORMAT, TOAST_ERROR_MESSAGE } from '@/config';
import { useDisclosure } from '@/hooks';

const schema = z.object({
  type: z.string().trim().min(1, INVALID_FORMAT),
});

export type CreatePaymentMethodType = z.infer<typeof schema>;

export const CreateInvestmentTypeDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreatePaymentMethodType>({
    defaultValues: {
      type: '',
    },
    resolver: zodResolver(schema),
  });

  const { mutateAsync: createInvestmentType, isPending } = useCreateInvestmentType();

  const queryClient = useQueryClient();

  const onSubmit = (data: CreatePaymentMethodType) => {
    createInvestmentType(
      {
        name: data.type,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: [investmentTypeQueryKey.get],
          });
          toast.success('Tipo de investimento criado com sucesso');
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
      <InputText label="Tipo" register={register('type')} error={errors.type?.message} />
    </DialogDispatch>
  );
};
