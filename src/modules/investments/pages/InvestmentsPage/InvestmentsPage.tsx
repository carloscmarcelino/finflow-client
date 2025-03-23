'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { Archive, Filter } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useGetTotalInvestments, useGetInvestments } from '@/api';
import { CardValue } from '@/components/Card';
import { InputText, RangeDatePicker } from '@/components/Form';
import { Table } from '@/components/Table';
import { Button } from '@/components/ui';
import { DateRangeParams, SearchQueryParams } from '@/types';
import { blobDownload, toBRL } from '@/utils';

import {
  CreateInvestmentDialog,
  InvestmentPerformanceChart,
  SimulateInvestmentDialog,
} from '../../components';
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

  const dateParams: DateRangeParams = {
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
          <div className="flex gap-2">
            <Button
              onClick={() => {
                toast.success('Filtros limpos com sucesso!');
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
            <div className="flex flex-col gap-2">
              <CreateInvestmentDialog />
              <SimulateInvestmentDialog />
            </div>
          </div>
        </div>
        <CardValue
          isLoading={isLoadingTotalInvestments}
          value={toBRL(totalData?.total ?? 0)}
          title="Total investido"
        />
      </div>
      <Table
        columns={investmentsColumns}
        data={investmentsData?.data ?? []}
        isLoading={isLoadingInvestments}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isFetching={isFetchingInvestments}
      />
      <InvestmentPerformanceChart investmentsData={investmentsData?.data} />
      {/* <InvestmentPerformancePie investmentsData={investmentsData?.data} /> */}
    </main>
  );
};
