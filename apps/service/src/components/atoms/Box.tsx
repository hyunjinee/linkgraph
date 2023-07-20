import React from 'react';
import { cn } from '~/lib/utils';

type BoxProps = {
  children: React.ReactNode;
  className?: string;
};

const Box = ({ children, className }: BoxProps) => {
  return <div className={cn('rounded-lg h-fit w-full ', className)}>{children}</div>;
};
Box.displayName = 'Box';

export default Box;
