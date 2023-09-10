'use client';

import type { PropsWithChildren } from 'react';
import type { Session } from 'next-auth';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AuthProvider from './AuthProvider';
import koKR from 'antd/locale/ko_KR';
import { ConfigProvider } from 'antd';

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
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#63489a',
          colorLink: '#63489a',
          colorLinkHover: '#7f68a6',
        },
      }}
      locale={koKR}
    >
      <SessionProvider>
        <AuthProvider>
          <QueryClientProvider client={client}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </QueryClientProvider>
        </AuthProvider>
      </SessionProvider>
    </ConfigProvider>
  );
};

export default Core;
