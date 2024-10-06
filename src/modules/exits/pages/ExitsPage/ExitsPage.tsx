'use client';

import Link from 'next/link';

import { Exit } from '@/api/exits';
import { Button } from '@/components/ui/button';

import { ExitTable } from '../../components';

type ExitsPageProps = {
  data: Exit[];
};

export const ExitsPage = ({ data }: ExitsPageProps) => (
  <main className="flex flex-col gap-10 max-w-[1280px] mx-auto py-10">
    <Link href="/saidas/criar">
      <Button className="bg-blue">Adicionar</Button>
    </Link>
    <ExitTable data={data} />
  </main>
);
