import './globals.css';
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/Sidebar';
import SupabaseProvider from '@/providers/SupabaseProvider';

const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spotify',
  description: 'Listen to music.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(font.className)} suppressHydrationWarning>
        {/* <div className="container py-2 h-fit md:py-18 grow">{children}</div> */}
        <SupabaseProvider>
          <Sidebar>{children}</Sidebar>
        </SupabaseProvider>
      </body>
    </html>
  );
}
