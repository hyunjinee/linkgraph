import { type PropsWithChildren, createContext, useCallback, useState, useContext, useEffect } from 'react';
import Switch from './Switch';
import { useSafeContext, useUpdateEffect } from '@hyunjin/hooks';

const ToggleContext = createContext<{
  on: boolean;
  toggle: () => void;
} | null>(null);

ToggleContext.displayName = 'ToggleContext';

const useToggleContext = () => {
  return useSafeContext(ToggleContext);
};

const Toggle = ({
  children,
  onToggle,
}: PropsWithChildren<{
  onToggle: (on: boolean) => void;
}>) => {
  const [on, setOn] = useState(false);
  const toggle = useCallback(() => setOn((prev) => !prev), []);

  useUpdateEffect(() => {
    onToggle(on);
  }, [on]);

  return (
    <ToggleContext.Provider
      value={{
        on,
        toggle,
      }}
    >
      {children}
    </ToggleContext.Provider>
  );
};

const On = ({ children }: PropsWithChildren) => {
  const { on } = useToggleContext();

  return on ? children : null;
};
const Off = ({ children }: PropsWithChildren) => {
  const { on } = useToggleContext();

  return on ? null : children;
};
const Button = (props: any) => {
  const { on, toggle } = useToggleContext();

  return <Switch on={on} onClick={toggle} {...props} />;
};

Toggle.On = On;
Toggle.Off = Off;
Toggle.Button = Button;

export default Toggle;
