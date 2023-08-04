'use client';

import { Repeat } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const RandomUser = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.refresh()}
      className="absolute flex items-center justify-center w-10 h-10 bg-white rounded-md bottom-5 left-5"
    >
      <Repeat />
    </button>
  );
};

export default RandomUser;
