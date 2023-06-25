import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { PropsWithChildren } from 'react';
import Navbar from '~/components/Navbar';
import Core from '~/components/Core';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LinkGraph',
  description: '링크를 연결하다.',
  icons: {
    icon: 'favicon.ico',
  },
};

const RootLayout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession(authOptions);

  console.log(session);

  return (
    <html lang="ko" className="h-full scroll-smooth antialiased">
      <body className={`${inter.className} flex h-full flex-col`} suppressHydrationWarning={true}>
        <Core session={session}>
          <Navbar />
          {children}
        </Core>
      </body>
    </html>
  );
};

export default RootLayout;
