'use client';

import Link from 'next/link';
import React from 'react';

import { Investment } from '@/api/investments/types';
import { Button } from '@/components/ui/button';

import { InvestmentsTable } from '../../components';

type InvestmentsPageProps = {
  data: Investment[];
};

export const InvestmentsPage = ({ data }: InvestmentsPageProps) => (
  <main className="flex flex-col gap-10 max-w-[1280px] mx-auto py-10">
    <Link href="/investimentos/criar">
      <Button className="bg-blue">Adicionar</Button>
    </Link>
    <InvestmentsTable data={data} />
  </main>
);
