import './globals.css';
import { Inter } from 'next/font/google';

import type { PropsWithChildren } from 'react';
import Navbar from '~/components/Navbar';
import Core from '~/components/Core';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LinkGraph',
  description: '링크를 연결하다.',
  icons: {
    icon: 'favicon.ico',
  },
};

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="ko" className="h-full scroll-smooth antialiased">
      <body className={`${inter.className} flex h-full flex-col`} suppressHydrationWarning={true}>
        <Core>
          <Navbar />
          {children}
        </Core>
      </body>
    </html>
  );
};

export default RootLayout;
