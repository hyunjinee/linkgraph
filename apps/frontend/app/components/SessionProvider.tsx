'use client';
import { SessionProvider as Provider } from 'next-auth/react';

interface SessionProviderProps {
  children: React.ReactNode;
}

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  return <Provider>{children}</Provider>;
};

export default SessionProvider;
