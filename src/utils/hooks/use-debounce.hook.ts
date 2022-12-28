import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay = 1500): T {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearInterval(timer);
    };
  }, [value, delay]);

  return debounceValue;
}
