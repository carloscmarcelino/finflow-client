'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';

import { getBalance } from '@/api/balance';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';

type HeaderOptionsProps = {
  session?: Session | null;
  balance: string;
};

export const HeaderOptions = ({ session, balance }: HeaderOptionsProps) => {
  const { data } = useQuery({
    queryKey: ['balance'],
    queryFn: () => getBalance(),
  });

  return (
    <header className="w-full py-5 bg-white">
      <div className="flex items-center justify-between max-w-[1280px] mx-auto">
        <Link href="/">
          <p className="text-description">Home</p>
        </Link>
        <div className="flex gap-5">
          <p className="text-description font-semibold text-blue">Saldo:{balance}</p>

          <Link href="/entradas">
            <p className="text-description">Entradas</p>
          </Link>
          <Link href="/saidas">
            <p className="text-description">Saidas</p>
          </Link>
          <Link href="/investimentos">
            <p className="text-description">Investimentos</p>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="text-description">
              {session?.user?.name}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4">
              <button
                onClick={() => {
                  signOut();
                }}
                className="text-description"
              >
                Sair
              </button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
