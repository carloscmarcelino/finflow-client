'use client';

import { Coins, HomeIcon, LogOut, Package, Settings, UserIcon, Users, Wallet } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';

import { cn } from '@/lib/cn';

import { Button } from '../ui/button';

export const Sidebar = () => {
  const session = useSession();

  const pathname = usePathname();

  if (!session.data?.user?.name) return <></>;

  const sidebarItems = [
    {
      icon: HomeIcon,
      label: 'Home',
      href: '/',
    },
    {
      icon: Wallet,
      label: 'Entradas',
      href: '/entradas',
    },
    {
      icon: Package,
      label: 'Despesas',
      href: '/despesas',
    },
    {
      icon: Coins,
      label: 'Investimentos',
      href: '/investimentos',
    },
    {
      icon: Users,
      label: 'Usuarios',
      href: '/usuarios',
    },
    {
      icon: Settings,
      label: 'Configurações',
      href: '/configuracoes',
    },
  ];

  return (
    <aside className="flex flex-col items-center justify-between min-h-screen bg-white w-72 py-9 px-10">
      <div className="flex flex-col items-center ">
        <p className="text-title mb-6">FinFlow</p>
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="flex items-center justify-center bg-gray4 w-20 h-20 rounded-full">
            <UserIcon />
          </div>
          <div className="flex flex-col items-center gap-[0.375rem]">
            <p className="text-text text-purple1 font-bold">{session.data?.user?.name}</p>
            <p className="text-subtitle text-gray3">role</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {sidebarItems.map((sidebar) => (
            <Link key={sidebar.label} href={sidebar.href}>
              <div
                className={cn('flex items-center gap-3 px-4 py-3 min-w-40 rounded-xl text-gray3', {
                  'bg-purple2 text-white': pathname === sidebar.href,
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
        variant="ghost"
        className="text-subtitle text-gray3 gap-2"
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
