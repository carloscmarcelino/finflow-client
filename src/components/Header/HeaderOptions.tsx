'use client';

import Link from 'next/link';
import { Session } from 'next-auth';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';

import { signoutAction } from './signoutAction';

type HeaderOptionsProps = {
  session?: Session | null;
};

export const HeaderOptions = ({ session }: HeaderOptionsProps) => (
  <header className="w-full py-5 bg-white">
    <div className="flex items-center justify-between max-w-[1280px] mx-auto">
      <Link href="/">
        <p className="text-description">Home</p>
      </Link>
      <div className="flex gap-5">
        <p className="text-description">Entradas</p>
        <p className="text-description">Saidas</p>

        <Link href="/despesas">
          <p className="text-description">Despesas</p>
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
              onClick={async () => {
                await signoutAction();
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
