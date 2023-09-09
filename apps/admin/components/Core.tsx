'use client';

import type { PropsWithChildren } from 'react';
import type { Session } from 'next-auth';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AuthProvider from './AuthProvider';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: true,
      // staleTime: 1000 * 60 * 5,
    },
  },
});

const Core = ({ children }: PropsWithChildren) => {
  return (
    <SessionProvider>
      <AuthProvider>
        <QueryClientProvider client={client}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </AuthProvider>
    </SessionProvider>
  );
};

export default Core;
