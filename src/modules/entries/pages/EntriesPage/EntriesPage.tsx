'use client';

import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { GetEntriesParams, useGetEntries, useGetTotalEntries } from '@/api/entries';
import { RangeDatePicker } from '@/components/DatePicker';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toBRL } from '@/utils/formatters/toBRL';

import { EntriesTable } from '../../components';

type EntriesPageProps = {
  params: GetEntriesParams;
};

export const EntriesPage = ({ params }: EntriesPageProps) => {
  const { control, watch } = useForm({
    defaultValues: {
      period: { from: dayjs(params.startDate).toDate(), to: dayjs(params.endDate).toDate() },
    },
  });

  const { data: entriesData, isLoading: isLoadingEntries } = useGetEntries({
    ...(dayjs(watch('period').from).isValid() && {
      startDate: dayjs(watch('period').from).toISOString(),
    }),
    ...(dayjs(watch('period').to).isValid() && {
      endDate: dayjs(watch('period').to).toISOString(),
    }),
  });

  const { data: totalEntriesData, isLoading: isLoadingTotalEntries } = useGetTotalEntries();

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

      <div className="flex flex-col gap-2 rounded-xl bg-white shadow-2xl px-14 py-7 w-max">
        <p className="ml-5 text-description">Periodo</p>
        <Controller
          name="period"
          control={control}
          render={({ field }) => <RangeDatePicker value={field.value} onChange={field.onChange} />}
        />
      </div>

      <EntriesTable data={entriesData?.data} isLoading={isLoadingEntries} />
    </main>
  );
};
