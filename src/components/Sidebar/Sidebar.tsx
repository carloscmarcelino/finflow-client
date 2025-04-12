'use client';

import { useSession } from 'next-auth/react';
import React from 'react';

import { SidebarContent } from './SidebarContent';

export const Sidebar = () => {
  const session = useSession();

  if (!session.data?.user?.name) return <></>;

  return <SidebarContent session={session.data} />;
};
