'use client';

import Link from 'next/link';
import React from 'react';

import { Entries } from '@/api/entries';
import { Button } from '@/components/ui/button';

import { EntriesTable } from '../../components';

type EntriesPageProps = {
  data: Entries[];
};

export const EntriesPage = ({ data }: EntriesPageProps) => (
  <main className="flex flex-col gap-10 max-w-[1280px] mx-auto py-10">
    <Link href="/entradas/criar">
      <Button className="bg-blue">Adicionar</Button>
    </Link>
    <EntriesTable data={data} />
  </main>
);
