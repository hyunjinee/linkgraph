'use client';

import { SessionProvider as Provider } from 'next-auth/react';

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>;
};

export default SessionProvider;
