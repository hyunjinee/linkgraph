'use client';

import type { Session } from 'next-auth';
import type { PropsWithChildren } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Spinner from './Spinner';

const publicPages = ['/login'];
const isPublicPage = (pathname: string) => publicPages.includes(pathname);

export const AuthContext = React.createContext<Session | null>(null);

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};

const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  useEffect(() => {
    if (loading) {
      return;
    }

    if (session) {
    }
  }, [loading, session]);

  if (loading) {
    return <Spinner />;
  }

  return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
