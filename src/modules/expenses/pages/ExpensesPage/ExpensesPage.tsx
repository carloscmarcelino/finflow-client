'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { Archive, Filter } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useGetExpenses, useGetTotalExpenses } from '@/api';
import { CardValue } from '@/components/Card';
import { InputText, RangeDatePicker } from '@/components/Form';
import { Table } from '@/components/Table';
import { Button } from '@/components/ui';
import { SearchQueryParams } from '@/types';
import { blobDownload, toBRL } from '@/utils';

import { CreateExpenseDialog } from '../../components';
import { expensesFilterSchema, ExpensesFilterType } from '../../validators';

import { expenseColumns } from './expenseColumns';

type ExpensesPageProps = {
  params: SearchQueryParams;
};

export const ExpensesPage = ({ params }: ExpensesPageProps) => {
  const {
    register,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm<ExpensesFilterType>({
    resolver: zodResolver(expensesFilterSchema),
    defaultValues: {
      period: { from: dayjs(params.startDate).toDate(), to: dayjs(params.endDate).toDate() },
      search: '',
    },
  });

  const [currentPage, setCurrentPage] = useState(params.page);

  const dateParams = {
    ...(watch('period')?.from && {
      startDate: watch('period')?.from?.toISOString(),
    }),
    ...(watch('period')?.to && { endDate: watch('period')?.to?.toISOString() }),
  };

  const queryParams = {
    ...(watch('period')?.from && {
      startDate: watch('period')?.from?.toISOString(),
    }),
    ...(watch('period')?.to && { endDate: watch('period')?.to?.toISOString() }),
    limit: params.limit,
    page: currentPage,
    ...(watch('search') !== '' && { search: watch('search') }),
  };

  const {
    data: expensesData,
    isLoading: isLoadingExpenses,
    isFetching: isFetchingExpenses,
  } = useGetExpenses(queryParams);

  const { data: totalExpensesData, isLoading: isLoadingTotalExpenses } =
    useGetTotalExpenses(queryParams);

  return (
    <main className="flex flex-col gap-10 max-w-[1280px] mx-auto py-10">
      <div className="flex flex-col rounded-xl bg-white shadow-2xl px-14 py-7 gap-10">
        <div className="flex justify-between">
          <div className="flex gap-10">
            <InputText
              label="Pesquisar"
              register={register('search')}
              error={errors.search?.message}
            />
            <RangeDatePicker
              label="Periodo"
              control={control}
              name="period"
              error={errors.period?.message}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => {
                reset();
              }}
            >
              <Filter className="text-white h-4 w-4" />
              Limpar filtros
            </Button>
            <Button
              onClick={() => {
                blobDownload({
                  endpoint: 'expenses/export',
                  params: {
                    ...dateParams,
                  },
                });
              }}
            >
              <Archive className="text-white h-4 w-4" />
              Gerar XLSX
            </Button>
            <CreateExpenseDialog />
          </div>
        </div>
        <CardValue
          isLoading={isLoadingTotalExpenses}
          value={toBRL(totalExpensesData?.total ?? 0)}
          title="Total gasto"
        />
      </div>
      <Table
        columns={expenseColumns}
        data={expensesData?.data ?? []}
        isLoading={isLoadingExpenses}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isFetching={isFetchingExpenses}
      />
    </main>
  );
};
