import React, { PropsWithChildren } from 'react';

const CounterContext = React.createContext<{
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

const useCounterContext = () => {
  const context = React.useContext(CounterContext);

  if (!context) {
    throw new Error('Counter compound components cannot be rendered outside the Counter component');
  }

  return context;
};

const Counter = ({ children }: PropsWithChildren) => {
  const [count, setCount] = React.useState(0);

  return (
    <CounterContext.Provider
      value={{
        count,
        setCount,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
};

const Up = ({ amount }: { amount: number }) => {
  const { setCount } = useCounterContext();

  return <button onClick={() => setCount((prev) => prev + amount)}>Up</button>;
};
const Down = ({ amount }: { amount: number }) => {
  const { setCount } = useCounterContext();

  return <button onClick={() => setCount((prev) => prev - amount)}>Down</button>;
};
const Monitor = () => {
  const { count } = useCounterContext();

  return <div>{count}</div>;
};

Counter.Up = Up;
Counter.Down = Down;
Counter.Monitor = Monitor;

export default Counter;
