import './globals.css';
import { Inter } from 'next/font/google';

import SessionProvider from '~/components/SessionProvider';
import Navbar from '~/components/Navbar';
import QueryClientProvider from './components/QueryClientProvider';

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
    <html lang="ko" className="h-full scroll-smooth antialiased">
      <body className={`${inter.className} flex h-full flex-col`}>
        <SessionProvider>
          <QueryClientProvider>
            <Navbar />
            {children}
          </QueryClientProvider>
        </SessionProvider>

        {/* <LoginModal /> */}
      </body>
    </html>
  );
};

export default RootLayout;
