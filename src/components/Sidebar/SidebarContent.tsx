import { LogOut, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import React from 'react';

import { cn } from '@/lib/cn';

import { Button } from '../ui';

import { sidebarItems } from './sidebarItems';

type SidebarContentProps = {
  session: Session;
};

export const SidebarContent = ({ session }: SidebarContentProps) => {
  // const params = {
  //   startDate: dayjs().startOf('month').toISOString(),
  //   endDate: dayjs().toISOString(),
  // };
  // const { data: balanceData, isLoading: isLoadingBalance } = useGetBalance();

  const pathname = usePathname();

  return (
    <aside className="flex flex-col items-center justify-between min-h-screen bg-white w-72 py-9 px-10 h-full">
      <div className="flex flex-col items-center ">
        <p className="text-title mb-6">FinFlow</p>

        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="flex items-center justify-center bg-gray w-20 h-20 rounded-full">
            <UserIcon className="text-white" />
          </div>
          <div className="flex flex-col items-center gap-[0.375rem]">
            <p className="text-description text-purple font-bold">{session.user?.name}</p>
            <p className="text-subtitle text-gray">role</p>
          </div>
          {/* <CardValue
            className="my-5 items-center gap-0"
            title="Saldo"
            value={toBRL(balanceData?.balance ?? 0)}
            isLoading={isLoadingBalance}
          /> */}
        </div>
        <div className="flex flex-col gap-3">
          {sidebarItems.map((sidebar) => (
            <Link key={sidebar.label} href={sidebar.href}>
              <div
                className={cn('flex items-center gap-3 px-4 py-3 min-w-40 rounded-xl text-gray', {
                  'bg-purple text-white': pathname === sidebar.href,
                })}
              >
                <sidebar.icon className="w-5 h-5" />
                <p className="text-subtitle">{sidebar.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Button
        variant="unstyled"
        onClick={() => {
          signOut();
        }}
      >
        <LogOut className="h-5 w-5" />
        Sair
      </Button>
    </aside>
  );
};
