import './globals.css';
import type { Metadata, NextPageContext } from 'next';
import { headers } from 'next/headers';

import { Inter } from 'next/font/google';
import { type PropsWithChildren } from 'react';

import Core from '~/components/Core';
import Sidebar from '~/components/Sidebar/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LinkGraph Admin',
  description: 'Admin Dashboard for LinkGraph',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  const headerList = headers();
  const isLoginPage = headerList.get('x-url')?.includes('/login');

  return (
    <html lang="ko" className="h-full">
      <body className={`${inter.className} h-full`} suppressHydrationWarning={true}>
        <Core>
          <div className="flex w-full h-full">
            {isLoginPage ? null : <Sidebar />}
            {children}
          </div>
        </Core>
      </body>
    </html>
  );
};

export default RootLayout;
