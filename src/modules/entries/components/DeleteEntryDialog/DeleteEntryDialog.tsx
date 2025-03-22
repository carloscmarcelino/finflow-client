import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { entriesQueryKey, Entry, revalidateBalanceTag, useDeleteEntry } from '@/api';
import { DialogDispatch, DialogDispatchVariant } from '@/components/DialogDispatch';
import { TOAST_ERROR_MESSAGE } from '@/config';
import { useDisclosure } from '@/hooks/useDisclosure';

type DeleteEntryDialogProps = {
  data: Entry;
};

export const DeleteEntryDialog = ({ data }: DeleteEntryDialogProps) => {
  const { mutateAsync, isPending } = useDeleteEntry();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const queryClient = useQueryClient();

  const onSubmit = () => {
    mutateAsync(data.id, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [entriesQueryKey.get],
        });
        await queryClient.invalidateQueries({
          queryKey: [entriesQueryKey.getTotal],
        });
        await revalidateBalanceTag();
        toast.success('entrada deletada com sucesso');
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
      onSubmit={onSubmit}
      isLoading={isPending}
      variant={DialogDispatchVariant.DELETE}
    />
  );
};
