'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { Archive, Filter } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useGetBalance, useGetTotalInvestments, useGetInvestments } from '@/api';
import { InputText, RangeDatePicker } from '@/components/Form';
import { Table } from '@/components/Table';
import { Button, Skeleton } from '@/components/ui';
import { SearchQueryParams } from '@/types';
import { blobDownload, toBRL } from '@/utils';

import { CreateInvestmentDialog } from '../../components';
import {
  investmentsFilterSchema,
  InvestmentsFilterType,
} from '../../validators/investmentsFilterSchema';

import { investmentsColumns } from './investmentsColumns';

type InvestmentsPageProps = {
  params: SearchQueryParams;
};

export const InvestmentsPage = ({ params }: InvestmentsPageProps) => {
  const {
    control,
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm<InvestmentsFilterType>({
    defaultValues: {
      period: { from: dayjs().startOf('month').toDate(), to: dayjs().toDate() },
    },
    resolver: zodResolver(investmentsFilterSchema),
  });

  const [currentPage, setCurrentPage] = useState(params.page);

  const dateParams = {
    ...(watch('period')?.from && {
      startDate: watch('period')?.from?.toISOString(),
    }),
    ...(watch('period')?.to && { endDate: watch('period')?.to?.toISOString() }),
  };

  const {
    data: investmentsData,
    isLoading: isLoadingInvestments,
    isFetching: isFetchingInvestments,
  } = useGetInvestments();

  const { data: totalData, isLoading: isLoadingTotalInvestments } = useGetTotalInvestments();

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
                  endpoint: 'investments/export',
                  params: {
                    ...dateParams,
                  },
                });
              }}
            >
              <Archive className="text-white h-4 w-4" />
              Gerar XLSX
            </Button>
            <CreateInvestmentDialog />
          </div>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col gap-2">
            {isLoadingTotalInvestments ? (
              <Skeleton className="w-28 h-6" />
            ) : (
              <p className="text-description">Total investido:</p>
            )}
            {isLoadingTotalInvestments ? (
              <Skeleton className="w-28 h-6" />
            ) : (
              <p className="text-title font-bold">{toBRL(totalData?.total ?? 0)}</p>
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
        columns={investmentsColumns}
        data={investmentsData ?? []}
        isLoading={isLoadingInvestments}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isFetching={isFetchingInvestments}
      />
    </main>
  );
};
