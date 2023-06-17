'use client';

import type { PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const client = new QueryClient();

const Core = ({ children }: PropsWithChildren) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={client}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Core;

// 'use client';

// import type { PropsWithChildren } from 'react';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { SessionProvider } from 'next-auth/react';

// const client = new QueryClient();

// const Core: React.FC<PropsWithChildren> = ({ children }) => {
//   return (
//     <SessionProvider>
//       <QueryClientProvider client={client}>
//         {children}
//         <ReactQueryDevtools initialIsOpen={false} />
//       </QueryClientProvider>
//     </SessionProvider>
//   );
// };

// export default Core;
