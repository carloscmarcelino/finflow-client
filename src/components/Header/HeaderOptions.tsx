'use client';

import Link from 'next/link';
import { Session } from 'next-auth';

import { signoutAction } from './signoutAction';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useSession } from 'next-auth/react';

type HeaderOptionsProps = {
  session?: Session | null;
};

export const HeaderOptions = ({ session }: HeaderOptionsProps) => {
  return (
    <header className="flex items-center justify-between w-full max-w-[1280px] mx-auto py-5">
      <Link href="/">
        <p className="text-description">Home</p>
      </Link>

      <div className="flex gap-5">
        {!session?.user && (
          <Link href="/login">
            <p className="text-description">Login</p>
          </Link>
        )}

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
    </header>
  );
};
