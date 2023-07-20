import React from 'react';

import { Database } from '@/types_db';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
type SupabaseProviderProps = {
  children: React.ReactNode;
};

const supabaseClient = createClientComponentClient();

export default function SupabaseProvider({ children }: SupabaseProviderProps) {
  return <SessionContextProvider supabaseClient={supabaseClient}>SupabaseProvider</SessionContextProvider>;
}
