import '../styles/globals.css';

import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { ReactNode } from 'react';

import { GlobalProvider } from '@/providers';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Controle Financeiro',
  description: 'Controle financeiro',
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="pt_BR" className={fontSans.variable}>
    <body>
      <GlobalProvider>{children}</GlobalProvider>
    </body>
  </html>
);

export default RootLayout;
