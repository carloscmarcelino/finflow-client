'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { GetExitsParams } from '@/api';
import { useGetExits, useGetTotalExits } from '@/api/exits';
import { RangeDatePicker } from '@/components/DatePicker';
import { InputSearch } from '@/components/InputSearch';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toBRL } from '@/utils';

import { ExitTable } from '../../components';
import { ExitsFilterType, exitsFilterValidator } from '../../validators';

type ExitsPageProps = {
  params: GetExitsParams;
};

export const ExitsPage = ({ params }: ExitsPageProps) => {
  const {
    register,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm<ExitsFilterType>({
    resolver: zodResolver(exitsFilterValidator),
    defaultValues: {
      period: { from: dayjs(params.startDate).toDate(), to: dayjs(params.endDate).toDate() },
      search: '',
    },
  });

  const [currentPage, setCurrentPage] = useState(params.page);

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
    data: exitsData,
    isLoading: isLoadingExits,
    isFetching: isFetchingExits,
  } = useGetExits(queryParams);

  const { data: totalExitsData, isLoading: isLoadingTotalExits } = useGetTotalExits(queryParams);

  return (
    <main className="flex flex-col gap-10 max-w-[1280px] mx-auto py-10">
      <div className="flex justify-between">
        <Link href="/saidas/criar">
          <Button className="bg-blue">Adicionar</Button>
        </Link>
        <div className="flex flex-col gap-2 rounded-xl bg-white shadow-2xl px-14 py-7">
          {isLoadingTotalExits ? (
            <Skeleton className="w-28 h-6" />
          ) : (
            <p className="text-description">Gastos:</p>
          )}
          {isLoadingTotalExits ? (
            <Skeleton className="w-28 h-6" />
          ) : (
            <p className="text-description font-bold">{toBRL(totalExitsData?.total ?? 0)}</p>
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
      </div>
      <ExitTable
        data={exitsData}
        isLoading={isLoadingExits}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isFetching={isFetchingExits}
      />
    </main>
  );
};
