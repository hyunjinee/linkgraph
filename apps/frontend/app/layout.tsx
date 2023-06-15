import './globals.css';
import { Inter } from 'next/font/google';

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

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="ko" className="h-full antialiased scroll-smooth">
      <body className={`${inter.className} flex h-full flex-col`}>
        <Core>
          <Navbar />
          {children}
        </Core>
      </body>
    </html>
  );
};

export default RootLayout;
