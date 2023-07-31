import { useEffect, useState } from 'react';

const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(value), delay || 500);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
