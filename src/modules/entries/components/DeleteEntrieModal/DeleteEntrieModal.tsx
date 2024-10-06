import { FaRegTrashAlt } from 'react-icons/fa';

import revalidateTagFn from '@/api/actions/revalidateTagFn';
import { Entrie } from '@/api/entries';
import { useDeleteEntrie } from '@/api/entries/hooks/useDeleteEntrie';
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

type DeleteEntrieModalProps = {
  data: Entrie;
};

export const DeleteEntrieModal = ({ data }: DeleteEntrieModalProps) => {
  const { mutateAsync, isPending } = useDeleteEntrie();

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
