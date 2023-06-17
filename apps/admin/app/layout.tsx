import './globals.css';

import { Inter } from 'next/font/google';
import type { PropsWithChildren } from 'react';

import Core from '~/app/components/Core';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LinkGraph Admin',
  description: 'Admin Dashboard for LinkGraph',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ko" className="h-full">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Core>{children}</Core>
      </body>
    </html>
  );
};

export default RootLayout;
