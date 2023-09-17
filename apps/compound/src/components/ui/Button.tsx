import React from 'react';
import colors from '../../constants/colors';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'medium' | 'large';
}

const Button = ({ variant = 'primary', size = 'medium', ...props }: Props) => {
  return (
    <button
      css={{
        outline: 'none',
        border: '0 solid transparent',
        borderRadius: '7px',
        cursor: 'pointer',
        transition: 'background .2s ease, color .1s ease',
        fontWeight: 600,
        lineHeight: '26px',
        ...TYPE_VARIANTS[variant],
        ...SIZE_VARIANTS[size],
      }}
      {...props}
    ></button>
  );
};

export default Button;

const TYPE_VARIANTS = {
  primary: {
    color: colors.grey50,
    backgroundColor: colors.blue500,
    '&:hover': {
      backgroundColor: colors.blue600,
    },
  },
  secondary: {
    color: colors.grey700,
    backgroundColor: colors.grey100,
    '&:hover': {
      backgroundColor: colors.grey300,
    },
  },
};

const SIZE_VARIANTS = {
  medium: {
    fontSize: '15px',
    padding: '11px 16px',
  },
  large: {
    fontSize: '17px',
    padding: '11px 22px',
  },
};
