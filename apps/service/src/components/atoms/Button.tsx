import React, { forwardRef } from 'react';
import { cn } from '~/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, disabled, className, type = 'button', ...props }: ButtonProps, ref) => {
    return (
      <button
        type={type}
        className={cn(
          `
          w-full
          rounded-full
          bg-green-500
          border
          border-transparent
          px-3
          py-3
          disabled:cursor-not-allowd
          disabled:opacity-50
          text-black
          font-bold
          hover:opacity-75
          transition 
      `,
          className,
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';

export default Button;
