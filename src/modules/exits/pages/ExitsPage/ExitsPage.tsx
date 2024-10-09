'use client';

import Link from 'next/link';

import { Exit, TotalExits } from '@/api/exits';
import { Button } from '@/components/ui/button';
import { toBRL } from '@/utils/formatters/toBRL';

import { ExitTable } from '../../components';

type ExitsPageProps = {
  data: Exit[];
  totalData: TotalExits;
};

export const ExitsPage = ({ data, totalData }: ExitsPageProps) => (
  <main className="flex flex-col gap-10 max-w-[1280px] mx-auto py-10">
    <div className="flex justify-between">
      <Link href="/saidas/criar">
        <Button className="bg-blue">Adicionar</Button>
      </Link>
      <div className="flex flex-col gap-2 rounded-xl bg-white shadow-2xl px-14 py-7">
        <p className="text-description">Gastos desse mês:</p>
        <p className="text-description font-bold">{toBRL(totalData.total)}</p>
      </div>
    </div>
    <ExitTable data={data} />
  </main>
);
