'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { File as FileIcon } from 'lucide-react'; // Renomeando o import do ícone
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';
import { z } from 'zod';

import { balanceQueryKey, expensesQueryKey } from '@/api';
import { CustomSelect, InputWrapper } from '@/components/Form';
import { Table } from '@/components/Table';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from '@/components/ui';
import { INVALID_FORMAT, TOAST_ERROR_MESSAGE } from '@/config';
import { useDisclosure } from '@/hooks';
import api from '@/lib/api';
import { cn } from '@/lib/cn';
import { toBRL } from '@/utils';

const formSchema = z.object({
  file: z.instanceof(File),
  fileType: z.object(
    {
      label: z.string(),
      value: z.string(),
    },
    { message: INVALID_FORMAT },
  ),
});

type FormValues = z.infer<typeof formSchema>;

type ExpenseRow = {
  title: string;
  amount: string;
  date: string;
};

export const UploadExpensesDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({});

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileType: { label: 'CSV', value: 'csv' },
    },
  });

  const [expenses, setExpenses] = useState<ExpenseRow[]>([]);

  const excelDateToJSDate = (excelDate: number) => {
    const utc_days = Math.floor(excelDate - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
    return date_info;
  };

  const columnHelper = createColumnHelper<ExpenseRow>();

  const expenseColumns = [
    columnHelper.accessor((row) => row.date, {
      id: 'date',
      cell: (info) => <p>{dayjs(info.getValue()).format('DD/MM/YYYY')}</p>,
      header: () => <p>Data</p>,
    }),
    columnHelper.accessor((row) => row.amount, {
      id: 'amount',
      cell: (info) => <p>{toBRL(Number(info.getValue()))}</p>,
      header: () => <p>Valor</p>,
    }),
    columnHelper.accessor((row) => row.title, {
      id: 'title',
      cell: (info) => <p>{info.getValue()}</p>,
      header: () => <p>Título</p>,
    }),
    columnHelper.accessor((row) => row, {
      id: 'acoes',
      cell: ({ getValue }) => (
        <div className="flex gap-5" key={getValue().title + getValue().amount + getValue().date}>
          <Button variant="unstyled" size="icon">
            <FaRegEdit />
          </Button>
          <Button
            variant="unstyled"
            size="icon"
            onClick={() => {
              const filteredExpenses = expenses.filter(
                (expense) =>
                  expense.title !== getValue().title ||
                  expense.amount !== getValue().amount ||
                  expense.date !== getValue().date,
              );
              setExpenses(filteredExpenses);
            }}
          >
            <FaRegTrashAlt />
          </Button>
        </div>
      ),
      header: () => <p>Ações</p>,
    }),
  ];

  const fileValue = watch('file');

  useEffect(() => {
    const handleFileRead = async (file: File) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json<ExpenseRow>(worksheet);

        const formattedData = jsonData.map((row) => ({
          ...row,
          date: excelDateToJSDate(Number(row.date)).toISOString(),
        }));

        setExpenses(formattedData);
      };

      reader.readAsBinaryString(file);
    };

    if (fileValue) {
      handleFileRead(fileValue);
    }
  }, [fileValue]);

  const uploadExpense = async (expenses: ExpenseRow[]) => {
    const response = await api.authorized().post('expenses/upload', {
      body: JSON.stringify({ expenses }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  };

  const useUploadExpense = () =>
    useMutation({
      mutationKey: ['upload-expense'],
      mutationFn: uploadExpense,
    });

  const { mutate, isPending } = useUploadExpense();

  const queryClient = useQueryClient();

  const onSubmit = async () => {
    mutate(expenses, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [expensesQueryKey.get],
        });
        await queryClient.invalidateQueries({
          queryKey: [expensesQueryKey.getTotal],
        });
        await queryClient.invalidateQueries({
          queryKey: [balanceQueryKey.get],
        });
        toast.success('Despesa criada com sucesso');
        reset();
        onClose();
        setExpenses([]);
      },
      onError: () => {
        toast.error(TOAST_ERROR_MESSAGE);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (open ? onOpen() : onClose())}>
      <DialogTrigger>
        <Button>
          <FileIcon className="text-white h-4 w-4" />
          Importar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[50rem]">
        <form onSubmit={handleSubmit(onSubmit)} className={cn('flex flex-col gap-8')}>
          <DialogHeader className="gap-4">
            <DialogTitle>Upload de despesas</DialogTitle>
            <DialogDescription>
              Envie um arquivo {watch('fileType').label} com as despesas para o sistema.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 my-4">
            <CustomSelect
              label="Tipo de arquivo"
              name="fileType"
              options={[
                {
                  label: 'CSV',
                  value: 'csv',
                },
              ]}
              control={control}
              error={errors.fileType?.message}
              isLoading={false}
            />
            <Controller
              name="file"
              control={control}
              render={({ field: { value, onChange, ...props } }) => (
                <InputWrapper label="Arquivo">
                  <Input
                    {...props}
                    type="file"
                    placeholder="Selecione o arquivo"
                    accept={watch('fileType').value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files?.[0];
                      if (file) onChange(file);
                    }}
                  />
                </InputWrapper>
              )}
            />
            {!!expenses.length && (
              <Table
                columns={expenseColumns}
                data={expenses}
                tableContainerClassNames="h-[30rem]"
              />
            )}
          </div>
          {!!expenses.length && (
            <DialogFooter>
              <Button variant="rounded-red" onClick={onClose} type="button" disabled={isPending}>
                Cancelar
              </Button>
              <Button type="submit" isLoading={isPending}>
                Enviar
              </Button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};
