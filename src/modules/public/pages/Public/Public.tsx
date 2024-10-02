'use client';

import { Expense } from '@/api/public/types';

import { PublicTable } from '../../components/PublicTable';

type PublicProps = {
  data: Expense[];
};

export const Public = ({ data }: PublicProps) => (
  <>
    <PublicTable data={data} />
  </>
);
