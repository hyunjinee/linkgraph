import { Children, ForwardedRef, cloneElement, forwardRef, useId } from 'react';
import colors from '../../constants/colors';

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  children: React.ReactElement;
  bottomText?: string;
}

export default function Input({ children, label, bottomText, ...props }: InputProps) {
  const child = Children.only(children);
  const generatedId = useId();

  const id = child.props.id ?? generatedId;
  const isError = child.props.error ?? false;

  console.log(child.props.error, '?');

  return (
    <div css={{ width: '100%' }} {...props}>
      <label
        htmlFor={id}
        css={{
          display: 'inline-block',
          padding: '5px 0',
          fontSize: '15px',
          fontWeight: 500,
          lineHeight: 1.6,
          color: colors.grey700,
        }}
      >
        {label}
      </label>
      {cloneElement(child, {
        id,
        ...child.props,
      })}

      {bottomText != null ? (
        <p
          css={{
            color: isError ? colors.red600 : colors.grey600,
            marginTop: '4px',
            display: 'inline-block',
            fontWeight: 400,
            fontSize: '15px',
          }}
        >
          {bottomText}
        </p>
      ) : null}
    </div>
  );
}

interface TextFieldProps extends Omit<React.HTMLAttributes<HTMLInputElement>, 'size'> {
  error?: boolean;
}

Input.TextFeild = forwardRef(({ error, ...props }: TextFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <input
      css={{
        width: '100%',
        padding: '0 18px',
        fontSize: '15px',
        lineHeight: '48px',
        margin: 0,
        outline: 'none',
        border: 'none',
        borderRadius: '8px',
        backgroundColor: colors.white,
        transition: `background .2s ease,color .1s ease, box-shadow .2s ease`,
        boxShadow: `inset 0 0 0 1px ${error ? colors.red600 : colors.greyOpacity200}`,
        '&:focus': {
          boxShadow: `inset 0 0 0 2px ${error ? colors.red600 : colors.blue500}`,
        },
      }}
      ref={ref}
      {...props}
    />
  );
});
