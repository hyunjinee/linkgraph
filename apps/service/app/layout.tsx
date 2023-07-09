import './globals.css';

import type { Metadata } from 'next';
import { Suspense, type PropsWithChildren } from 'react';
import { getServerSession } from 'next-auth';

import Navbar from '~/components/Navbar';
import Core from '~/components/Core';
import { authOptions } from '~/api/auth/[...nextauth]/route';

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
    <html lang="ko" className="h-full antialiased scroll-smooth">
      <body className={`flex h-full flex-col`} suppressHydrationWarning={true}>
        <Core session={session}>
          <Navbar />
          <Suspense fallback="로딩">{children}</Suspense>
        </Core>
      </body>
    </html>
  );
};

export default RootLayout;
