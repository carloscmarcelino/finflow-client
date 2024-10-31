'use client';

import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useGetTotalInvestments } from '@/api/investments/hooks';
import { useGetInvestments } from '@/api/investments/hooks/useGetInvestments';
import { RangeDatePicker } from '@/components/DatePicker/RangeDatePicker';
import { Button } from '@/components/ui/button';
import { toBRL } from '@/utils/formatters/toBRL';

import { InvestmentsTable } from '../../components';

export const InvestmentsPage = () => {
  const { control } = useForm({
    defaultValues: {
      period: { from: dayjs().startOf('month').toDate(), to: dayjs().toDate() },
    },
  });

  const { data: investmentsData, isLoading: isLoadingInvestments } = useGetInvestments();

  const { data: totalData, isLoading: isLoadingTotalInvestments } = useGetTotalInvestments();

  return (
    <main className="flex flex-col gap-10 max-w-[1280px] mx-auto py-10">
      <div className="flex justify-between">
        <div className="flex flex-col gap-5">
          <Link href="/investimentos/criar">
            <Button className="bg-blue">Adicionar</Button>
          </Link>
          <Controller
            name="period"
            control={control}
            render={({ field }) => (
              <RangeDatePicker value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        <div className="flex rounded-xl bg-white shadow-2xl px-14 py-7 gap-10">
          <div className="flex flex-col gap-2">
            <p className="text-description">Investido:</p>
            <p className="text-description font-bold">
              {toBRL(totalData?.totalInvestedThisMonth ?? 0)}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-description">Total investido:</p>
            <p className="text-description font-bold">{toBRL(totalData?.total ?? 0)}</p>
          </div>
        </div>
      </div>
      <InvestmentsTable data={investmentsData?.data} />
    </main>
  );
};
