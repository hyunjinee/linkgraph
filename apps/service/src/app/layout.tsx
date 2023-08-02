import './globals.css';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import { getServerSession } from 'next-auth';

import { pretendard } from './fonts';
import { Navbar, Core } from '~/components';
import { authOptions } from './api/auth/[...nextauth]/route';
import { cn } from '~/lib/utils';

export const metadata: Metadata = {
  title: 'LinkGraph',
  description: '소개하고 싶은 링크를 연결해보세요!',
  icons: {
    icon: 'favicon.ico',
  },
};

const RootLayout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ko" className={cn('h-full antialiased scroll-smooth')}>
      <body className={cn('flex h-full flex-col', pretendard.variable)} suppressHydrationWarning>
        <Core session={session}>
          <Navbar />
          {children}
        </Core>
      </body>
    </html>
  );
};

export default RootLayout;
