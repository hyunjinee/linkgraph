'use client';

import type { PropsWithChildren } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider as QCP } from '@tanstack/react-query';

const client = new QueryClient();

const QueryClientProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <QCP client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QCP>
  );
};

export default QueryClientProvider;
