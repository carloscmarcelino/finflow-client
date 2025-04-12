'use client';

import { signOut, useSession } from 'next-auth/react';
import React from 'react';

import { SidebarContent } from './SidebarContent';

export const Sidebar = () => {
  const session = useSession();

  console.log('session --> ', session);

  if (!session.data?.user?.name)
    return (
      <>
        <button
          onClick={() => {
            signOut();
          }}
        >
          sair
        </button>
      </>
    );

  return <SidebarContent session={session.data} />;
};
