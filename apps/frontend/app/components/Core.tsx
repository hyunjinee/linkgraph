'use client';

import type { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { Session } from 'next-auth';

const client = new QueryClient();

export const AuthContext = React.createContext<Session | null>(null);

const Core = ({ children, session }: PropsWithChildren<{ session: Session | null }>) => {
  return (
    <AuthContext.Provider value={session}>
      <SessionProvider>
        <QueryClientProvider client={client}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SessionProvider>
    </AuthContext.Provider>
  );
};

export default Core;
