'use client';

import Box from '@/components/Box';
import { BounceLoader } from 'react-spinners';

const Loading = () => {
  return (
    <Box className="flex items-center justify-center h-full">
      <BounceLoader color="#22c55e" size={40} />
    </Box>
  );
};

export default Loading;
