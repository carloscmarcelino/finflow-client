'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { Archive, Filter } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useGetEntries, useGetTotalEntries, useGetBalance } from '@/api';
import { InputText, RangeDatePicker } from '@/components/Form';
import { Table } from '@/components/Table';
import { Button, Skeleton } from '@/components/ui';
import { SearchQueryParams } from '@/types';
import { blobDownload, toBRL } from '@/utils';

import { CreateEntryDialog } from '../../components';
import { EntiresFilterType, entriesFilterValidator } from '../../validators';

import { entriesColumns } from './columns';

type EntriesPageProps = {
  params: SearchQueryParams;
};

export const EntriesPage = ({ params }: EntriesPageProps) => {
  const {
    control,
    watch,
    register,
    formState: { errors },
    reset,
  } = useForm<EntiresFilterType>({
    resolver: zodResolver(entriesFilterValidator),
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
    ...dateParams,
    limit: params.limit,
    page: currentPage,
    ...(watch('search') !== '' && { search: watch('search') }),
  };

  const {
    data: entriesData,
    isLoading: isLoadingEntries,
    isFetching: isFetchingEntries,
  } = useGetEntries(queryParams);

  const { data: totalEntriesData, isLoading: isLoadingTotalEntries } =
    useGetTotalEntries(queryParams);

  // const params = {
  //   startDate: dayjs().startOf('month').toISOString(),
  //   endDate: dayjs().toISOString(),
  // };
  const { data: balanceData, isLoading: isLoadingBalance } = useGetBalance();

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
                  endpoint: 'entries/export',
                  params: {
                    ...dateParams,
                  },
                });
              }}
            >
              <Archive className="text-white h-4 w-4" />
              Gerar XLSX
            </Button>
            <CreateEntryDialog />
          </div>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col gap-2">
            {isLoadingTotalEntries ? (
              <Skeleton className="w-28 h-6" />
            ) : (
              <p className="text-description">Total ganho:</p>
            )}
            {isLoadingTotalEntries ? (
              <Skeleton className="w-28 h-6" />
            ) : (
              <p className="text-title font-bold">{toBRL(totalEntriesData?.total ?? 0)}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {isLoadingBalance ? (
              <Skeleton className="w-28 h-6" />
            ) : (
              <p className="text-description">Saldo:</p>
            )}
            {isLoadingBalance ? (
              <Skeleton className="w-28 h-6" />
            ) : (
              <p className="text-title font-bold">{toBRL(balanceData?.balance ?? 0)}</p>
            )}
          </div>
        </div>
      </div>
      <Table
        columns={entriesColumns}
        data={entriesData?.data ?? []}
        isLoading={isLoadingEntries}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isFetching={isFetchingEntries}
      />
    </main>
  );
};
