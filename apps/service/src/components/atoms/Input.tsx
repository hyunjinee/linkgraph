import React, { forwardRef } from 'react';
import { cn } from '~/utils/className';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, disabled, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex w-full rounded-md border border-transparent px-3 py-3 text-sm placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 bg-neutral-50 focus:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium',
        className,
      )}
      disabled={disabled}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
// bg-neutral-700
//
//
//
//
