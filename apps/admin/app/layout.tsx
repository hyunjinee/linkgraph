import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { PropsWithChildren } from 'react';

import Core from '~/app/components/Core';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LinkGraph Admin',
  description: 'Admin Dashboard for LinkGraph',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ko" className="h-full">
      <body className={`${inter.className} h-full`} suppressHydrationWarning={true}>
        <Core>{children}</Core>
      </body>
    </html>
  );
};

export default RootLayout;
