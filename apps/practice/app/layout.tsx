import './globals.css';
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/Sidebar';
import SupabaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/UserProvider';
import ModalProvider from '@/providers/ModalProvider';
import ToastProvider from '@/providers/ToasterProvider';
import getSongsByUserId from '@/actions/getSongsByUserId';
import { Suspense } from 'react';

const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spotify',
  description: 'Listen to music.',
};

export const revalidate = 0;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const userSongs = await getSongsByUserId();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(font.className)} suppressHydrationWarning>
        {/* <div className="container py-2 h-fit md:py-18 grow">{children}</div> */}
        <ToastProvider />

        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Suspense fallback="hello suspense">
              <Sidebar songs={userSongs}>{children}</Sidebar>
            </Suspense>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
