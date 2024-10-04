'use client';

import Link from 'next/link';
import { Session } from 'next-auth';

import { signoutAction } from './signoutAction';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';

type HeaderOptionsProps = {
  session?: Session | null;
};

export const HeaderOptions = ({ session }: HeaderOptionsProps) => {
  return (
    <header className="w-full py-5 bg-white">
      <div className="flex items-center justify-between max-w-[1280px] mx-auto">
        <Link href="/">
          <p className="text-description">Home</p>
        </Link>
        <div className="flex gap-5">
          <Link href="/despesas">
            <p className="text-description">Despesas</p>
          </Link>
          <Link href="/investimentos">
            <p className="text-description">Investimentos</p>
          </Link>

          {session?.user?.name ? (
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
          ) : (
            <Link href="/login">
              <p className="text-description">Login</p>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
