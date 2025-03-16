import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

import { Sidebar } from '@/components/Sidebar';
import { Toaster } from '@/components/ui/sonner';

import { TanstackProvider } from '../TanstackProvider';
import { ThemeProvider } from '../ThemeProvider';

type GlobalProviderProps = Readonly<{
  children: ReactNode;
}>;

export const GlobalProvider = ({ children }: GlobalProviderProps) => (
  <SessionProvider>
    <TanstackProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <div className="flex">
          <Sidebar />
          <div className="w-full px-6 py-8">{children}</div>
        </div>
        <Toaster />
      </ThemeProvider>
    </TanstackProvider>
  </SessionProvider>
);
