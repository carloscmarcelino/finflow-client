'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import Link from 'next/link';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { GetEntriesParams, useGetEntries, useGetTotalEntries } from '@/api/entries';
import { RangeDatePicker } from '@/components/DatePicker';
import { InputSearch } from '@/components/InputSearch';
import { Table } from '@/components/Table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { blobDownload } from '@/utils';
import { toBRL } from '@/utils/mask';

import { EntiresFilterType, entriesFilterValidator } from '../../validators';

import { entriesColumns } from './columns';

type EntriesPageProps = {
  params: GetEntriesParams;
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

  return (
    <main className="flex flex-col gap-10 max-w-[1280px] mx-auto py-10">
      <div className="flex justify-between">
        <Link href="/entradas/criar">
          <Button className="bg-blue">Adicionar</Button>
        </Link>
        <div className="flex flex-col gap-2 rounded-xl bg-white shadow-2xl px-14 py-7">
          {isLoadingTotalEntries ? (
            <Skeleton className="w-28 h-6" />
          ) : (
            <p className="text-description">Total ganho:</p>
          )}
          {isLoadingTotalEntries ? (
            <Skeleton className="w-28 h-6" />
          ) : (
            <p className="text-description font-bold">{toBRL(totalEntriesData?.total ?? 0)}</p>
          )}
        </div>
      </div>
      <div className="flex rounded-xl bg-white shadow-2xl px-14 py-7 gap-10">
        <div className="flex flex-col gap-2 w-max">
          <p className="ml-5 text-sm font-medium text-gray-700">Pesquisar</p>
          <InputSearch register={register('search')} error={errors.search} />
        </div>
        <div className="flex flex-col gap-2 w-max">
          <p className="ml-5 text-sm font-medium text-gray-700">Periodo</p>
          <Controller
            name="period"
            control={control}
            render={({ field }) => (
              <RangeDatePicker value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
        <div className="flex items-end flex-end">
          <Button
            variant="outline"
            className="h-[42px] shadow-sm"
            onClick={() => {
              reset();
            }}
          >
            Limpar filtros
          </Button>
        </div>
        <div className="flex items-end flex-end">
          <Button
            variant="outline"
            className="h-[42px] shadow-sm"
            onClick={() => {
              blobDownload({
                endpoint: 'entries/export',
                params: {
                  ...dateParams,
                },
              });
            }}
          >
            Gerar XLSX
          </Button>
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
