'use client';

import Link from 'next/link';

import { Expense } from '@/api/expenses';
import { Button } from '@/components/ui/button';

import { ExpenseTable } from '../../components';

type ExpensesPageProps = {
  data: Expense[];
};

export const ExpensesPage = ({ data }: ExpensesPageProps) => (
  <main className="flex flex-col gap-10 max-w-[1280px] mx-auto py-10">
    <Link href="/despesas/criar">
      <Button className="bg-blue">Adicionar</Button>
    </Link>
    <ExpenseTable data={data} />
  </main>
);
