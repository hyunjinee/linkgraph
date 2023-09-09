import { getServerSession } from 'next-auth';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense, type PropsWithChildren } from 'react';

import Core from '~/components/Core';
import { authOptions } from './api/auth/[...nextauth]/route';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LinkGraph Admin',
  description: 'Admin Dashboard for LinkGraph',
};

const RootLayout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession(authOptions);
  return (
    <html lang="ko" className="h-full">
      <body className={`${inter.className} h-full`} suppressHydrationWarning={true}>
        <Core>{children}</Core>
      </body>
    </html>
  );
};

export default RootLayout;
