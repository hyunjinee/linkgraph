import '~/app/styles/globals.css';
import { Inter } from 'next/font/google';
import Core from './components/Core';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Link Graph Admin',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${inter.className} flex h-full flex-col`} suppressHydrationWarning={true}>
        <Core>{children}</Core>
      </body>
    </html>
  );
}