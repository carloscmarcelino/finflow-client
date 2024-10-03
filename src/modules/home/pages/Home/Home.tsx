'use client';

import Link from 'next/link';

import { Expense } from '@/api/home/types';
import { Button } from '@/components/ui/button';

import { HomeTable } from '../../components';

type HomeProps = {
  data: Expense[];
};

export const Home = ({ data }: HomeProps) => (
  <main className="flex flex-col gap-10 max-w-[1280px] mx-auto py-10">
    <Link href="/despesas/criar">
      <Button className="bg-blue">Adicionar</Button>
    </Link>

    <HomeTable data={data} />
  </main>
);
