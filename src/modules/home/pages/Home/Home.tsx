'use client';

import Link from 'next/link';

import { Expense } from '@/api/home/types';
import { Button } from '@/components/ui/button';

import { HomeTable } from '../../components';

type HomeProps = {
  data: Expense[];
};

export const Home = ({ data }: HomeProps) => (
  <>
    <Link href="/criar">
      <Button>Adicionar</Button>
    </Link>

    <HomeTable data={data} />
  </>
);
