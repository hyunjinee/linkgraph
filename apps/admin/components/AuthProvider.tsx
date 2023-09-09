'use client';

import type { Session } from 'next-auth';
import type { PropsWithChildren } from 'react';

import React from 'react';

const publicPages = ['/login'];

export const AuthContext = React.createContext<Session | null>(null);

const AuthProvider = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default AuthProvider;
