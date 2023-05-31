import './globals.css';

import { Inter } from 'next/font/google';
import Navbar from '~/app/components/Navbar';
import SessionProvider from '~/app/components/SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LinkGraph Admin',
  description: 'Admin Dashboard for LinkGraph',
};

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang="ko" className="h-full bg-gray-50">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
