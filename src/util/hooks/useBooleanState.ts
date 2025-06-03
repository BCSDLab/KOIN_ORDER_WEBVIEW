import { useCallback, useState } from 'react';

export default function useBooleanState(initialValue: boolean) {
  const [value, setValue] = useState(initialValue);

  const setTrue = useCallback(() => setValue(true), [setValue]);
  const setFalse = useCallback(() => setValue(false), [setValue]);
  const toggle = useCallback(() => setValue((prev) => !prev), [setValue]);

  return [value, setTrue, setFalse, toggle] as const;
}
