import React from 'react';

import { Database } from '@/types_db';

type SupabaseProviderProps = {
  children: React.ReactNode;
};

const supabaseClient = 1

export default function SupabaseProvider({ children }: SupabaseProviderProps) {

  return <div>SupabaseProvider</div>;
}
