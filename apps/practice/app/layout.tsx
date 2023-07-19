import './globals.css';
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/Sidebar';

const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spotify',
  description: 'Listen to music.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen flex flex-col bg-background', font.className)} suppressHydrationWarning>
        {/* <div className="container py-2 h-fit md:py-18 grow">{children}</div> */}

        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}
