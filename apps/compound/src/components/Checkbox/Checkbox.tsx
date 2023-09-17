import { useSafeContext } from '@hyunjin/hooks';
import { PropsWithChildren, createContext } from 'react';

type CheckboxContext = { id: string; isChecked: boolean; onChange: () => void };
const CheckboxContext = createContext<CheckboxContext | null>(null);

export const useCheckboxContext = () => {
  return useSafeContext(CheckboxContext);
};

type CheckboxProps = {
  id: string;
  isChecked: boolean;
  onChange: () => void;
};

const Checkbox = ({ id, isChecked, onChange, children }: PropsWithChildren<CheckboxProps>) => {
  return (
    <CheckboxContext.Provider
      value={{
        id,
        isChecked,
        onChange,
      }}
    >
      {children}
    </CheckboxContext.Provider>
  );
};

const Input = ({ ...props }) => {
  const { id, isChecked, onChange } = useCheckboxContext();

  return <input id={id} checked={isChecked} type="checkbox" onChange={onChange} {...props} />;
};

const Label = ({ children, ...props }: PropsWithChildren) => {
  const { id } = useCheckboxContext();
  return (
    <label htmlFor={id} {...props}>
      {children}
    </label>
  );
};

Checkbox.Input = Input;
Checkbox.Label = Label;

export default Checkbox;
