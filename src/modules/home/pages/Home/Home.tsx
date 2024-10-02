'use client';

import { Expense } from '@/api/home/types';

import { HomeTable } from '../../components';

type HomeProps = {
  data: Expense[];
};

export const Home = ({ data }: HomeProps) => (
  <>
    <HomeTable data={data} />
  </>
);
