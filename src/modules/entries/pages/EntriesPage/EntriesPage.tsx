'use client';

import Link from 'next/link';
import React from 'react';

import { Entrie, TotalEntries } from '@/api/entries';
import { Button } from '@/components/ui/button';
import { toBRL } from '@/utils/formatters/toBRL';

import { EntriesTable } from '../../components';

type EntriesPageProps = {
  data: Entrie[];
  totalEntries: TotalEntries;
};

export const EntriesPage = ({ data, totalEntries }: EntriesPageProps) => (
  <main className="flex flex-col gap-10 max-w-[1280px] mx-auto py-10">
    <div className="flex justify-between">
      <Link href="/entradas/criar">
        <Button className="bg-blue">Adicionar</Button>
      </Link>
      <div className="flex flex-col gap-2 rounded-xl bg-white shadow-2xl px-14 py-7">
        <p className="text-description">Total ganho esse mês:</p>
        <p className="text-description font-bold">{toBRL(totalEntries.total)}</p>
      </div>
    </div>
    <EntriesTable data={data} />
  </main>
);
