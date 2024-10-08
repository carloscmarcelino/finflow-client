'use client';

import Link from 'next/link';
import React from 'react';

import { Investment, TotalInvestments } from '@/api/investments/types';
import { Button } from '@/components/ui/button';
import { toBRL } from '@/utils/formatters/toBRL';

import { InvestmentsTable } from '../../components';

type InvestmentsPageProps = {
  data: Investment[];
  totalData: TotalInvestments;
};

export const InvestmentsPage = ({ data, totalData }: InvestmentsPageProps) => (
  <main className="flex flex-col gap-10 max-w-[1280px] mx-auto py-10">
    <div className="flex justify-between">
      <Link href="/investimentos/criar">
        <Button className="bg-blue">Adicionar</Button>
      </Link>

      <div className="flex flex-col gap-2 rounded-xl bg-white shadow-2xl px-14 py-7">
        <p className="text-description">Total investido:</p>
        <p className="text-description font-bold">{toBRL(totalData.total)}</p>
      </div>
    </div>
    <InvestmentsTable data={data} />
  </main>
);
